import React from 'react';

import QuestContext from './QuestContext';
import { firestore, auth } from '../Utils/Firebase';

const withQuest = (Component) =>
    class WithQuest extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                myQuest : null,
                called : false
            }
        }

        componentDidUpdate(){
            if (this.state.called === true) return;
            let idUser = auth.getUserId().trim();
            if (idUser !== ""){
                this.setState({called : true})
                firestore.onceGetAuthUserQuest(idUser)
                .then(snapchot => {
                    snapchot.forEach(doc => {
                        if (doc.data()){
                            this.setState( () => ({myQuest : [doc.data(), doc.id]}))
                        }
                    })
                })
                .catch(err => {
                    this.setState( () => ({myQuest : null}))
                    console.log("Error getting quest :", err);
                })
            }
        }

        render(){
            const {myQuest} = this.state;
            return(
                <QuestContext.Provider value={myQuest}> 
                    <Component />
                </QuestContext.Provider>
            )
        }
    }

export default withQuest;