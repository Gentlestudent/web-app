import React, { Component } from 'react'
import OSM from '../../SignedIn/Issuer/OSM'


class CreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            desc: "",
            email: "",
            lat: 51.0511164,
            lng: 3.7114566,
            phone: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLatLng = this.changeLatLng.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        let value = target.value;
        const name = target.name;

        switch (name) {
            case "lng":
            case "lat":
                value = parseFloat(value);
                break;
            default:
                break;
        }

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let data = {
            description: this.state.desc,
            latitude: this.state.lat,
            longitude: this.state.lng,
            title: this.state.title,
            phoneNumber: this.state.phone,
            questStatus: 0,
            emailAddress: this.state.email
        }

        this.props.createFunction(data);
    }

    /**
     * Change the states latitude and longitude based on a leaflet LatLng object
     * @param {L.LatLng} latlng 
     */
    changeLatLng(latlng) {
        this.setState({ lat: latlng.lat, lng: latlng.lng });
    }

    render() {
        const { title, email, phone, desc, lat, lng } = this.state;
        const pinImage = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media"
        const location = { lat, lng }
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="quest-form">
                    <div className="quest-form__left">
                    <div className="quest-form__group">
                    <label for="title" className="quest-form__label">
                        Titel
                        </label>
                        <input className="quest-form__input"  value={title} type="text" name="title" id="title" onChange={this.handleChange} required />
                    </div>
                    <div className="quest-form__group">
                    <label for="desc" className="quest-form__label">
                        Beschrijving
                        </label>
                        <textarea className="quest-form__input" maxLength="140" value={desc} name="desc" id="desc" onChange={this.handleChange} required />
                        <small>Max 140 karakters</small>
                    </div>
                    <div className="quest-form__group">
                    <label for="email" className="quest-form__label">
                        Email adres
                    </label>
                    <input className="quest-form__input" value={email} type="email" name="email" id="email" onChange={this.handleChange} required />
                    </div>
                    <div className="quest-form__group">
                    <label for="phone" className="quest-form__label">
                        Telefoonnummer
                    </label>
                    <input className="quest-form__input" value={phone} type="tel" name="phone" id="phone" onChange={this.handleChange} required />
                    </div>
                    </div>
                    <div className="quest-form__right">
                    <OSM changeLocation={this.changeLatLng} center={[lat, lng]} pinImage={pinImage} location={location} isQuest={true} />
                    <div className="quest-form__group">
                    <label className="quest-form__label">
                        Coordinaten
                    </label>
                    <div className="coordinates">
                    <input className="quest-form__input input-coordinates" value={lat} type="text" name="lat" id="lat" onChange={this.handleChange} />
                    <input className="quest-form__input input-coordinates" value={lng} type="text" name="lng" id="lng" onChange={this.handleChange} />
                    </div>
                    </div>
                    </div>
                    
                    <input className="submit button-prim" type="submit" value="Maak Quest" />
                </form>
            </React.Fragment>
        );
    }
}

export default CreateForm; 