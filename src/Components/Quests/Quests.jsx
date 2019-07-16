import React, { Component } from 'react'

import QuestMap from './QuestMap'
import SearchFilters from '../../Shared/SearchFilters'



class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <SearchFilters title="Quests"/>
                <QuestMap />
            </React.Fragment>
        );
    }
}

export default Quests;