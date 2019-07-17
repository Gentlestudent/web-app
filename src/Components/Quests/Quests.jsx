import React, { Component } from 'react'

import QuestMap from './QuestMap'
import SearchFilters from '../../Shared/SearchFilters'

import { firestore } from '../../Utils/Firebase'



class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allQuests: [],
            filteredQuests: [],
            markers: [],
        };

        this.filterQuests = this.filterQuests.bind(this);
    }

    componentDidMount() {
        // FETCH ALL VALID QUESTS
        firestore.onceGetActiveQuests().then(snapshot => {
            let quests = [];
            console.log({snapshot});
            snapshot.forEach(doc => {
                let quest = doc.data();
                quest.id = doc.id;
                quest.pinImage = 'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media';
                quests.push(quest);
            });

            // SETUP MARKER OBJECTS
            let markers = this.setupMarkers(quests);

            // SET STATE (only once)
            this.setState({ allQuests: quests, filterQuests: quests, markers});

        }).catch(error => {
            console.error({ error }, error);
        });
    }

    setupMarkers(quests) {
        let markers = [];
        quests.forEach(quest => {
            let latlng = { lat: quest.latitude, lng: quest.longitude };
            let pin = quest.pinImage;
            let marker = {
                latlng,
                pin
            }
            markers.push(marker);
        });
        return markers;
    }

    componentDidUpdate(prevProps, prevState) {
        // Update markers
        if (prevState.allQuests !== this.state.allQuests) {
            this.state.allQuests.forEach(quest => {
                let latlng = { lat: quest.lat, lng: quest.lng };
                let pin = quest.pinImage;
                let marker = {
                    latlng,
                    pin
                }
                this.setState({ markers: [marker, ...this.state.markers] });
            });
        }
    }

    /**
     * 
     * @param {Event} event 
     */
    filterQuests(event) {
        event.preventDefault();
        let filterInput = event.target.value;

        // Reset filter options if nothing is written in target
        if (filterInput.toString().length === 0) {
            let markers = this.setupMarkers(this.state.allQuests);
            this.setState({ filterQuests: this.state.allQuests, markers });
            return;
        }

        let initialArray = this.state.allQuests;
        let filtered = initialArray.filter(function (quest) {
            let title = quest.title;
            return title.toLowerCase().search(filterInput) !== -1;
        });

        // UPDATE MARKERS
        
        this.setState({ filteredQuests: filtered })
    }

    render() {
        const { markers, filteredQuests } = this.state;
        return (
            <React.Fragment>
                <div className="content">
                    <SearchFilters title="Quests" filterFunction={this.filterQuests} />
                    <QuestMap />
                </div>
            </React.Fragment>
        );
    }
}

export default Quests;