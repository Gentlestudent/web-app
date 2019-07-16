import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import FormCreateOpportunity from './FormCreateOpportunity';

import { firestore } from '../../../Utils/Firebase';

// import { Category, Difficulty} from '../../Components/Opportunities/Constants';

const CreateOpportunityPage = ({ history, match }) =>
  <div>
    <CreateOpportunity history={history} match={match} />
  </div>

class CreateOpportunity extends Component {
  constructor(props) {
    super(props);
    // this.submit = this.submit.bind(this);
    this.state = {
      badges: null,
      initValues: null
    };
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    firestore.onceGetBadges().then(snapshot => {
      let res = {};
      snapshot.forEach(doc => {
        res[doc.id] = doc.data();
      });
      this.setState(() => ({ badges: res }))
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    let self = this;
    if (this.props.match.params.id !== undefined) {
      firestore.onceGetOpportunity(this.props.match.params.id).then(snapshot => {
        let start_date = snapshot.data().beginDate;
        // var category= self.getEnumValue(Category, snapshot.data().category);
        let category = snapshot.data().category;
        // var difficulty= self.getEnumValue(Difficulty, snapshot.data().difficulty);
        let difficulty = snapshot.data().difficulty;
        let end_date = snapshot.data().endDate;
        let description = snapshot.data().longDescription;
        let oppImageUrl = snapshot.data().oppImageUrl;
        let synopsis = snapshot.data().shortDescription;
        let title = snapshot.data().title;
        let moreInfo = snapshot.data().moreInfo;
        let website = snapshot.data().website;
        firestore.onceGetAddress(snapshot.data().addressId).then(snapshot => {
          self.setState({
            initValues: {
              start_date: start_date,
              category: category,
              city: snapshot.data().city,
              country: snapshot.data().country,
              difficulty: difficulty,
              end_date: end_date,
              description: description,
              house_number: snapshot.data().housenumber,
              latitude: snapshot.data().latitude,
              longitude: snapshot.data().longitude,
              oppImageUrl: oppImageUrl,
              postal_code: snapshot.data().postalcode,
              street: snapshot.data().street,
              synopsis: synopsis,
              title: title,
              moreInfo: moreInfo,
              website: website
            }
          });
        }).catch(function (error) {
          console.error("Error getting document: ", error);
        });
        console.log(self.state.initValues);
      }).catch(function (error) {
        console.error("Error getting document: ", error);
      });
    }
    else {
      this.stateopportunity = {};
    }
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
  // submit() {
  //   /* 
  //   * Get the badge from state
  //   * Findindex in the state and get the name
  //   * Split the name in 2 and automatically assign level and type to the database without inputs
  //   */
  //    const index = this.props.badge.list.findIndex(b => {
  //     return b.slug === this.props.form.createOpportunityForm.values.badge
  //   });
  //   const nameBadge = this.props.badge.list[index].name.split(' #');
  //   this.props.createOpportunity(
  //     {
  //       ...this.props.form.createOpportunityForm.values,
  //       type: nameBadge[0].replace(' ', '-').toLowerCase(),
  //       level: nameBadge[1]
  //     }
  //   );
  //   console.log(this.props.form.createOpportunityForm.values.image);
  //   console.log(this.props.form.createOpportunityForm.values);
  // }
  showResults = (values) =>
    new Promise(resolve => {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    })
  render() {
    const { badges, initValues } = this.state;
    const { history } = this.props;

    return (
      <div>
        {/* <div className="container"> */}
        <div className="content content-create-opp">
          <Link to="/created-opportunities" className="back">&lt; Terug</Link>
          <h1>Maak Opportunity</h1>
          <div className="content-flex create_opportunity">
            <div className="content-left">
              <div className="form" id="create_opportunity">
                {/* <FormCreateOpportunity onSubmit={this.submit} badges={badges}/> */}
                {/* <FormCreateOpportunity badges={badges} history={history} opportunity={opportunity}/> */}
                {/* {!initValues && <FormCreateOpportunity badges={badges} history={history}/>} */}
                {/* {!!initValues && <FormCreateOpportunity badges={badges} history={history} initialValues={initValues}/>} */}
                <FormCreateOpportunity badges={badges} history={history} initialValues={initValues} initValues={initValues} />
              </div>
            </div>
            <div className="content-right example_opportunity">
              <h3>Voorbeeld leerkans:</h3>
              <div className="example_opportunity_wrapper">
                <img alt="example" src="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Formopportunity%2FvoorbeeldLeerkans.png?alt=media" />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default withRouter(CreateOpportunityPage);
