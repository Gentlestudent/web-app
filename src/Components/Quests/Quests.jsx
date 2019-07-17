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
            snapshot.forEach(doc => {
                let quest = doc.data();
                quest.id = doc.id;
                quest.created = quest.created.toDate();
                quest.pinImage = 'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media';
                quests.push(quest);
            });

            // SETUP MARKER OBJECTS
            let markers = this.setupMarkers(quests);
            // console.log({markers});

            // SET STATE (only once)
            this.setState({ allQuests: quests, filteredQuests: quests, markers});

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
                pin,
                quest
            }
            markers.push(marker);
        });
        return markers;
    }

    componentDidUpdate(prevProps, prevState) {
        // Update markers
        if (prevState.allQuests !== this.state.allQuests) {
            let markers = this.setupMarkers(this.state.allQuests);
            this.setState({markers});
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
        let markers = this.setupMarkers(filtered);
        
        this.setState({ filteredQuests: filtered, markers })
    }

    render() {
        const { markers, filteredQuests } = this.state;
        return (
            <React.Fragment>
                <div className="content">
                    <SearchFilters title="Quests" filterFunction={this.filterQuests} />
                    <QuestMap markers={markers}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Quests;