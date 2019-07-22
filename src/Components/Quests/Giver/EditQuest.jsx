import React from 'react'
import { auth, firestore } from '../../../Utils/Firebase'
import * as routes from '../../../routes/routes'
import OSM from '../../SignedIn/Issuer/OSM'

class EditQuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questItem: null,
            canSave: false,
            loading: true,
            newTitle: "",
            newDescription: "",
            newPhoneNumber: -1,
            newLatitude: 0,
            newLongitude: 0,
            newEmailAddress: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.discard = this.discard.bind(this);
        this.locationChange = this.locationChange.bind(this);
    }

    componentDidMount() {
        let UUID = auth.getUserId();
        let questID = this.props.match.params.id;

        firestore.onceGetQuest(questID)
            .then(doc => {
                let quest = doc.data();
                quest.id = doc.id;

                if (quest.questGiverId !== UUID) {
                    console.warn("Access denied");
                    window.open(routes.Quests, "_self");
                    return;
                }

                let newTitle = quest.title;
                let newDescription = quest.description;
                let newPhoneNumber = quest.phoneNumber;
                let newLatitude = quest.latitude;
                let newLongitude = quest.longitude;
                let newEmailAddress = quest.emailAddress;

                this.setState({
                    questItem: quest,
                    canSave: true,
                    loading: false,
                    newTitle,
                    newDescription,
                    newPhoneNumber,
                    newLatitude,
                    newLongitude,
                    newEmailAddress
                })
            })
            .catch(
                err => console.error({ err })
            );
    }

    discard(event) {
        event.preventDefault();
        window.open("../quests", "_self");
    }

    async save(event) {
        event.preventDefault();

        const { id } = this.state.questItem;
        const { newDescription, newTitle, newLatitude, newLongitude, newPhoneNumber, newEmailAddress } = this.state;

        await firestore.updateQuest(id, newDescription, newLatitude, newLongitude, newPhoneNumber, newTitle, newEmailAddress);
            
                console.log("Updated");
                window.open(routes.Quests, "_self");
           
           
    }

    locationChange(latlng) {
        this.setState({ newLatitude: latlng.lat, newLongitude: latlng.lng })
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        let value = target.value;
        const name = target.name;

        if (value === "") {
            return;
        }

        switch (name) {
            case "newLatitude":
            case "newLongitude":
                value = parseInt(value, 10);
                break;
            default:
                break;
        }

        this.setState({ [name]: value })
    }

    render() {

        const { questItem } = this.state;

        let title, description, phoneNumber, emailAddress, latitude, longitude, newLat, newLng, location, center;
        const pinImage = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media"
        if (questItem !== null) {
            title = questItem.title;
            description = questItem.description;
            phoneNumber = questItem.phoneNumber;
            emailAddress = questItem.emailAddress;
            latitude = questItem.latitude;
            longitude = questItem.longitude;
            newLat = this.state.newLatitude;
            newLng = this.state.newLongitude;
            location = {
                lat: newLat,
                lng: newLng
            };
            center =  [newLat, newLng];
        }

        return (
            <React.Fragment>
                <form onSubmit={this.save} onAbort={this.discard}>

                    <label>
                        Titel
                        <input placeholder={title} type="text" name="newTitle" id="newTitle" onChange={this.handleChange} />
                    </label>
                    <label>
                        Beschrijving
                        <textarea maxLength="140" placeholder={description} name="newDescription" id="newDescription" onChange={this.handleChange} />
                        <small>Max 140 karakters</small>
                    </label>
                    <label>
                        Email adres
                        <input placeholder={emailAddress} type="email" name="newEmail" id="newEmail" onChange={this.handleChange} />
                    </label>
                    <label>
                        Telefoonnummer
                        <input placeholder={phoneNumber} type="tel" name="newPhoneNumber" id="newPhoneNumber" onChange={this.handleChange} />
                    </label>
                    <OSM center={center} location={location} changeLocation={this.locationChange} pinImage={pinImage} isQuest={true} />
                    <label>
                        Coordinaten
                        <input placeholder={latitude}  value={this.state.newLatitude} type="text" name="newLatitude" id="newLatitude" onChange={this.handleChange} />
                        <input placeholder={longitude} value={this.state.newLongitude} type="text" name="newLongitude" id="newLongitude" onChange={this.handleChange} />
                    </label>


                    <button type="submit">Opslaan</button>
                    <button type="button" onClick={this.discard} >Annuleren</button>
                </form>
            </React.Fragment>
        );
    }
}

export default EditQuest;