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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Titel
                        <input value={title} type="text" name="title" id="title" onChange={this.handleChange} required />
                    </label>
                    <label>
                        Beschrijving
                        <textarea value={desc} name="desc" id="desc" onChange={this.handleChange} required />
                    </label>
                    <label>
                        Email adres
                        <input value={email} type="email" name="email" id="email" onChange={this.handleChange} required />
                    </label>
                    <label>
                        Telefoonnummer
                        <input value={phone} type="tel" name="phone" id="phone" onChange={this.handleChange} required />
                    </label>
                    <OSM changeLocation={this.changeLatLng} center={[lat, lng]} pinImage={pinImage} location={location} isQuest={true} />
                    <label>
                        Coordinaten
                        <input value={lat} type="text" name="lat" id="lat" onChange={this.handleChange} />
                        <input value={lng} type="text" name="lng" id="lng" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="FINISH" />
                </form>
            </React.Fragment>
        );
    }
}

export default CreateForm; 