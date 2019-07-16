import React, { Component } from 'react'

import QuestMap from './QuestMap'



class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <h1>Quests</h1>
                <QuestMap />
            </React.Fragment>
        );
    }
}

export default Quests;