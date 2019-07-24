import React from 'react'
import CreateForm from './CreateForm'
import { firestore, auth } from '../../../Utils/Firebase'
import { Timestamp } from '../../../Utils/Firebase/firebase'

/**
 * Component which shows the create-quest page
 */
const CreateQuest = () => {

    /**
     * Create a quest in firebase
     * @param {Object} questData 
     */
    function createQuest(questData) {
        // console.log("Posting to firebase eventually", questData);
        questData.questGiver = auth.getUserName();
        questData.questGiverId = auth.getUserId();
        questData.created = Timestamp.fromDate(new Date());
        firestore.createQuest(questData);
    }

    return (
        <React.Fragment>
            <h1>Creeër Quest</h1>
            <CreateForm createFunction={createQuest} UUID={auth.getUserId()} />
        </React.Fragment>
    );
}

export default CreateQuest;