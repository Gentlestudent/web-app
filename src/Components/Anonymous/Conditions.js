import React, { Component } from 'react';
import { firestore } from '../../Utils/Firebase';


class Conditions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        var self = this;
        firestore.onceGetConditions().then(snapshot => {
            console.log("content:");
            console.log(snapshot.data().content);
            self.setState({ text: snapshot.data().content });
        }).catch(function (error) {
            console.error("Error getting document: ", error);
        });
    }
    render() {
        // const {text} = this.state;
        return (
            <React.Fragment>
                <div className="content content-with-padding">
                    <div className="privacycontent" dangerouslySetInnerHTML={{ __html: this.state.text }} />
                </div>
            </React.Fragment>
        )
    }
}

export default Conditions;