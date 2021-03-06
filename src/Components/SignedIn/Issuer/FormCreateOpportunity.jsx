import React, { Component } from 'react';

import OSM from './OSM'

import { Field, reduxForm } from 'redux-form';

import { auth, firestore } from '../../../Utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/storage';

import { Category, Difficulty } from '../Opportunities/Constants';

import * as routes from '../../../routes/routes';

import { renderInput, renderAutomaticInput, renderTextarea, renderSelect, validate } from '../../../Shared/Utils';
import Axios from 'axios';
// import { FirebaseStorage } from '@firebase/storage-types';

/* Default position */
// var defaultPosition = {
//   lat: 51.0511164,
//   lng: 3.7114566
// };

class FormCreateOpportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialised: false,
      lat: 51.0511164,
      lng: 3.7114566,
      badgeId: "",
      category: 0,
      difficulty: 0,
      address: '',
      street: "",
      house_number: 0,
      city: "",
      postal_code: 0,
      country: "Belgium",
      start_date: "",
      end_date: "",
      description: "",
      synopsis: "",
      title: "",
      moreInfo: "",
      website: "",
      contact: "",
      image: "",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Opportunityimages%2FNederlandse%20Les.jpg?alt=media&token=82cecaa7-4d6e-473d-b06a-a5eea35d8d4b",
      imageExtension: "",
      isAdmin: false,
      issuerId: "",
      issuers: null,
      pinImageUrl: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeLat = this.changeLat.bind(this);
    this.changeLng = this.changeLng.bind(this);
    this.postNewAddress = this.postNewAddress.bind(this);
    this.postNewOpportunity = this.postNewOpportunity.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.choosePin = this.choosePin.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    let userId = auth.getUserId();
    this.setState({ issuerId: userId });
    if (userId !== "") {
      // console.log("is user "+userId+" an admin?");
      firestore.onceGetAdmin(userId).then(doc => {
        if (doc.data()) {
          // console.log("user is admin");
          this.setState(() => ({ isAdmin: true }));
          firestore.onceGetValidatedIssuers().then(snapshot => {
            let res = {};
            snapshot.forEach(issuer => {
              res[issuer.id] = issuer.data();
            });
            this.setState(() => ({ issuers: res }));
          }).catch(err => {
            console.log('Error fetching issuers', err);
          });
        }
      })
        .catch(err => {
          console.log('User is not an admin', err);
        });
    }
  }
  componentDidUpdate() {
    if (!this.state.initialised && this.props.initValues && Object.keys(this.props.initValues).length > 0) {
      this.setState({
        initialised: true,
        start_date: this.props.initValues.start_date,
        category: this.props.initValues.category,
        city: this.props.initValues.city,
        country: this.props.initValues.country,
        difficulty: this.props.initValues.difficulty,
        end_date: this.props.initValues.end_date,
        description: this.props.initValues.description,
        house_number: this.props.initValues.house_number,
        lat: this.props.initValues.latitude,
        lng: this.props.initValues.longitude,
        oppImageUrl: this.props.initValues.oppImageUrl,
        postal_code: this.props.initValues.postal_code,
        street: this.props.initValues.street,
        synopsis: this.props.initValues.synopsis,
        title: this.props.initValues.title,
        moreInfo: this.props.initValues.moreInfo,
        website: this.props.initValues.website,
        contact: this.props.initValues.contact
      });

    }
    // this.setState({title: "skjsd"});
    // var self = this;
    // if(this.props.match!=undefined){
    //   try{
    //     const id = this.props.match.params.id;
    //     console.log("fetching opportunity data");
    //     firestore.onceGetOpportunity(id).then(snapshot => {
    //       console.log(JSON.stringify(snapshot.data()));
    //       if(snapshot.data()==undefined){
    //           throw "Could not fetch data";
    //       }
    //       self.setState(() => ({ 
    //         addressId: snapshot.data().addressId,
    //         beginDate: snapshot.data().beginDate,
    //         category: self.getEnumValue(Category, snapshot.data().category),
    //         difficulty: self.getEnumValue(Difficulty, snapshot.data().difficulty),
    //         endDate: snapshot.data().endDate,
    //         longDescription: snapshot.data().longDescription,
    //         oppImageUrl: snapshot.data().oppImageUrl,
    //         shortDescription: snapshot.data().shortDescription,
    //         title: snapshot.data().shortDescription,
    //       }));
    //     }).catch(function(error) {
    //       console.error("Error getting document: ", error);
    //     });
    //   }
    //   catch(e){
    //     console.log("error fetching opportunity", e)
    //   }
    // }

  }

  getEnumValue(enumTable, i) {
    var keys = Object.keys(enumTable).sort(function (a, b) {
      return enumTable[a] - enumTable[b];
    }); //sorting is required since the order of keys is not guaranteed.

    var getEnum = function (ordinal) {
      return keys[ordinal];
    }

    return getEnum(i);
  }

  choosePin() {
    let baseUrl = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2F";
    let url = baseUrl;
    switch (parseInt(this.state.category, 10)) {
      case 0: url += "pin_digitale-geletterdheid"; break;
      case 1: url += "pin_duurzaamheid"; break;
      case 2: url += "pin_ondernemingszin"; break;
      case 3: url += "pin_onderzoekende-houding"; break;
      case 4: url += "pin_wereldburgerschap"; break;
      default: break;
    }
    switch (parseInt(this.state.difficulty, 10)) {
      case 0: url += "_1.png?alt=media"; break;
      case 1: url += "_2.png?alt=media"; break;
      case 2: url += "_3.png?alt=media"; break;
      default: break;
    }
    this.setState({ pinImageUrl: url });
  }

  async handleChange(event) {
    // console.log(event.target.value);
    await this.setState({ [event.target.id]: event.target.value });

    if (event.target.id === "category" || event.target.id === "difficulty") {
      this.choosePin();
    }
    // this.event.target.props.change(value, )
    // console.log(event.target.id);
    // console.log(event.target.value);
    if (event.target.id === "street"
      || "house_number"
      || "city"
      || "postal_code"
      || "country") {
      this.changeAddress();
    }
  }

  handleImage(event) {
    this.setState({ image: event.target.files[0] });
    this.setState({ imageExtension: event.target.value.split('.').pop() });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.choosePin();
    if (this.state.image !== "") {
      let fileName = this.state.title + "." + this.state.imageExtension;
      let baseUrl = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Opportunityimages%2F";
      this.setState({ imageUrl: baseUrl + encodeURIComponent(fileName) + "?alt=media" });
      this.uploadImage(fileName);
    }
    this.postNewAddress(this.postNewOpportunity);
  }

  uploadImage(fileName) {
    console.log(fileName);
    let path = "Opportunityimages/" + fileName;
    let ref = firebase.storage().ref().child(path);
    ref.put(this.state.image).then(function (snapshot) {
      console.log('Uploaded file!');
    }).catch(function (error) {
      console.error("Error uploading file: ", error);
    });
  }

  postNewAddress(postNewOpportunity) {
    let address = {};
    address["bus"] = "";
    address["city"] = this.state.city;
    address["country"] = this.state.country;
    address["housenumber"] = parseInt(this.state.house_number, 10);
    address["latitude"] = this.state.lat;
    address["longitude"] = this.state.lng;
    address["postalcode"] = parseInt(this.state.postal_code, 10);
    address["street"] = this.state.street;

    let self = this;

    firestore.createAddress(address).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      postNewOpportunity(docRef.id, self);
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }

  postNewOpportunity(addressId, self) {
    console.log(this.state.start_date);
    let opportunity = {};
    opportunity["addressId"] = addressId;
    opportunity["badgeId"] = this.state.badgeId;
    opportunity["beaconId"] = "";
    opportunity["beginDate"] = this.checkDate(this.state.start_date);
    opportunity["authority"] = 0;
    opportunity["category"] = parseInt(this.state.category, 10);
    opportunity["difficulty"] = parseInt(this.state.difficulty, 10);
    opportunity["endDate"] = this.checkDate(this.state.end_date);
    opportunity["international"] = false;
    opportunity["issuerId"] = this.state.issuerId;
    opportunity["longDescription"] = this.state.description;
    opportunity["oppImageUrl"] = this.state.imageUrl;
    opportunity["pinImageUrl"] = this.state.pinImageUrl;
    opportunity["shortDescription"] = this.state.synopsis;
    opportunity["title"] = this.state.title;
    opportunity["moreInfo"] = this.state.moreInfo;
    opportunity["website"] = this.state.website;
    opportunity["contact"] = this.state.contact;
    opportunity["participations"] = 0;

    firestore.createOpportunity(opportunity)
      .then(function (docRef) {
        self.redirect(docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        console.error(JSON.stringify(opportunity));
      });
  }

  checkDate(s) {
    if (/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(s)) {
      return s;
    }
    let day = s.split("-")[0];
    let month = s.split("-")[1];
    let year = s.split("-")[2];
    return year + "-" + month + "-" + day;
  }

  redirect(id) {
    this.props.history.push(routes.CreatedOpportunities);
    // this.props.history.push(routes.Opportunities+"/"+id);
  }

  changeLat(newLat) {
    this.setState({
      lat: newLat
    })
  }

  changeLng(newLng) {
    this.setState({
      lng: newLng
    })
  }

  changeLocation(latlng) {
    this.setState({
      lat: latlng.lat,
      lng: latlng.lng
    });
  }

  changeAddress() {

    const { street, house_number, city, postCode, country } = this.state;

    if (street !== "" && house_number !== "" && city !== "" && postCode !== "" && country !== "") {
      let data = street + "+" + house_number + "+" + city + "+" + country
      Axios.get("https://nominatim.openstreetmap.org/search?format=json&q=" + data).then(res => {
        if (res.data.length === 0)
          return;
        else {
          let latlng = {
            lat: res.data[0].lat,
            lng: res.data[0].lon
          };
          this.changeLocation(latlng);
        }
      });
    }

    // Geocode.fromAddress(this.state.street + " " + this.state.houseNr + ", " + this.state.city + " " + this.state.postCode + ", " + this.state.country).then(
    //   response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     this.setState({ lat: lat });
    //     this.setState({ lng: lng });
    //     defaultPosition = { lat, lng };
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }

  render() {
    const {
      submitting,
      pristine,
    } = this.props;

    let pinUrl = this.state.pinImageUrl;

    let loc = {
      lat: this.state.lat,
      lng: this.state.lng
    };

    return (
      <form onSubmit={this.handleSubmit}>
        {/* <h2>(Loop all the fields before submitting -- will be fixed soon!)</h2> */}
        {/* {this.state.title} */}
        {!!this.state.isAdmin && this.state.issuers && <div className="form-group">
          <Field
            id="issuerId"
            name="issuerId"
            label="Kies een issuer: "
            data={{
              list: Object.keys(this.state.issuers).map(key => {
                return {
                  value: key,
                  display: this.state.issuers[key].name
                };
              })
            }}
            component={renderSelect}
            onChange={this.handleChange}
          />
        </div>}
        <div className="form-group">
          <Field
            label="Titel"
            type="text"
            name="title"
            id="title"
            info="Schrijf hier een motiverende en uitdagende titel voor jouw leerkans"
            component={renderInput}
            defaultValue="Titel"
            placeholder="Titel"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            id="category"
            name="category"
            label="Domein"
            info="Duid aan binnen welk domein je leerkans valt. <a href='https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FDomeinen.pdf?alt=media' target='_blank'>Hier</a> vind je een uitgebreide omschrijving van de verschillende categorieën."
            data={{
              list: Object.keys(Category).map(key => {
                return {
                  value: Category[`${key}`],
                  display: key
                };
              })
            }}
            component={renderSelect}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Beschrijving"
            id="description"
            info="Vul hier de algemene beschrijving in over de leerkans die je als organisatie wil aanbieden. Geef in deze omschrijving ook wat achtergrondinformatie over je instelling mee om zo de leerkans te kunnen kaderen binnen de algemene werking van je organisatie."
            name="description"
            component={renderTextarea}
            placeholder="Volledige beschrijving van de leerkans"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Verwachtingen"
            type="text"
            name="synopsis"
            id="synopsis"
            info="In dit veld vul je in wat je verwacht dat de student voor jouw organisatie kan betekenen. Wat moet de student kennen, kunnen of doen om de leerkans tot een goed einde te brengen? Stem deze verwachtingen en criteria zeker goed af met het niveau (zie verder)."
            component={renderTextarea}
            placeholder="Korte beschrijving van wat er verwacht wordt"
            value={this.state.synopsis}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            id="difficulty"
            info="Duid aan binnen welke moeilijkheidsgraad de leerkans valt. <a href='https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2Fpdf%2FNiveaus.pdf?alt=media' target='_blank'>Hier</a> vind je een uitgebreide omschrijving van de verschillende moeilijkheidsgraden."
            name="difficulty"
            label="Niveau"
            data={{
              list: Object.keys(Difficulty).map(key => {
                return {
                  value: Difficulty[`${key}`],
                  display: key
                };
              })
            }}
            component={renderSelect}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Meer info"
            type="text"
            name="moreInfo"
            id="moreInfo"
            info="Indien je binnen je organisatie een weblink naar meer informatie hebt over dit initiatief dan kan je die link hier toevoegen"
            component={renderInput}
            defaultValue="Meer info"
            placeholder="Meer info"
            value={this.state.moreInfo}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Contact"
            type="text"
            name="contact"
            id="contact"
            component={renderInput}
            defaultValue="E-mailadres contactpersoon"
            placeholder="E-mailadres contactpersoon"
            value={this.state.contact}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Website"
            type="text"
            name="website"
            id="website"
            component={renderInput}
            defaultValue="Website"
            placeholder="Website"
            value={this.state.website}
            onChange={this.handleChange}
          />
        </div>
        {/* <div className="form-group">
          <React.Fragment>
            { !! badges && <BadgesList badges={ badges } /> }
            { ! badges && <EmptyList/> }
          </React.Fragment>
        </div> */}
        <div className="form-group">
          <Field
            label="Start datum"
            id="start_date"
            name="start_date"
            type="date"
            defaultValue="01/03/2018"
            component={renderInput}
            placeholder="DD/MM/JJJJ"
            value={this.state.start_date}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <Field
            label="Eind datum"
            id="end_date"
            name="end_date"
            defaultValue="01/06/2018"
            type="date"
            component={renderInput}
            placeholder="DD/MM/JJJJ"
            value={this.state.end_date}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <Field
            label="Straatnaam"
            id="street"
            name="street"
            defaultValue="Rooigemlaan"
            component={renderInput}
            placeholder="Straatnaam"
            value={this.state.street}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Huisnummer"
            id="house_number"
            name="house_number"
            type="number"
            defaultValue="123"
            component={renderInput}
            placeholder="Huisnummer"
            value={this.state.house_number}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Post code"
            id="postal_code"
            name="postal_code"
            defaultValue="9000"
            type="number"
            component={renderInput}
            placeholder="Post code"
            value={this.state.postal_code}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Stad"
            id="city"
            name="city"
            defaultValue="Gent"
            component={renderInput}
            placeholder="Stad"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Field
            label="Land"
            id="country"
            name="country"
            defaultValue="Belgie"
            component={renderInput}
            placeholder="Land"
            value={this.state.country}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="LocationPicker">
            Pas locatie aan (Optioneel)
          </label>
          <div>
            <OSM changeLocation={this.changeLocation} location={loc} pinImage={pinUrl} />
            {/* <BeaconLocationPicker changeLat={this.changeLat} changeLng={this.changeLng} /> */}
          </div>
          <small>Verplaats de marker indien de locatie van het adres op de kaart niet volledig overeenkomt met het adres</small>
        </div>
        <div className="form-group">
          <Field
            label="Latitude (automatisch)"
            id="latitude"
            name="latitude"
            defaultValue={this.state.lat}
            value={this.state.lat}
            component={renderAutomaticInput}
          />
        </div>
        <div className="form-group">
          <Field
            label="Longitude (automatisch)"
            id="longitude"
            name="longitude"
            defaultValue={this.state.lng}
            value={this.state.lng}
            component={renderAutomaticInput}
          />
        </div>
        {/* <div className="form-group">
          <Field
            name="image"
            component={RenderDropzoneInput}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="Image">
            Afbeelding uploaden
          </label>
          <input
            type="file"
            label="Afbeelding uploaden"
            className="input"
            id="image"
            onChange={this.handleImage}
          />
          <small>Gelieve een rechtenvrije afbeelding te kiezen met een hoge resolutie.</small>
        </div>
        <div className="form-group">
          <button type="submit" className="opp-save" disabled={submitting || pristine}>
            Maak leerkans
          </button>
        </div>
      </form>
    );
  }
}

FormCreateOpportunity = reduxForm({
  form: 'createOpportunityForm',
  validate,
  // fields: ['title', 'synopsis'],
  enableReinitialize: true
  // initialValues: {
  //   title: "test"
  // }
})(FormCreateOpportunity);

export default FormCreateOpportunity;