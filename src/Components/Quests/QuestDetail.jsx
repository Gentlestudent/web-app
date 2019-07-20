import React, { Component } from 'react';
import { firestore, auth } from '../../Utils/Firebase';
import Spinner from '../../Shared/Spinner';
import styled from 'styled-components';
import QuestMap from './QuestMap'

const Loading = () => <div> <Spinner /> </div>

const Title = styled.h1`
    font-size : 40px;
    background-color : #2980b9;
    color : white;
    width : 95%;
    @media all and (max-width:1000px){
        width : 100%;
    }
`

const Table = styled.table`
    margin : 20px;
    @media all and (max-width:1000px){
        width : 95%;
    }
`

const Tr = styled.tr`
    @media all and (max-width:1000px){
        display : block;
        margin-bottom : 30px;
    }
`

const Td = styled.td`
    border : ${props => props.withBorder ? '1px solid black' : '0'};
    width : 50%;
    text-align : ${props => props.alignCenter ? 'center' : 'left'};
    vertical-align : top;
    
    @media all and (max-width:1000px){
        display : block;
        width:95%;
    }
`

const Description = styled.p`
    font-size : 20px;
`

const Button = styled.button`
    background : ${props => props.primary ? '#2ecc71' : '#e74c3c'};
    color : white;
    font-size: 20px;
    margin-top : 5%;
    margin-right: 2%;
    padding: 0.25em 1em;
    border: 2px solid #bdc3c7;
    border-radius: 3px;  

    @media all and (max-width:1000px){
        margin-bottom : 5%;
        margin-top : 0;
    }
`

class QuestDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questItem: null,
            loading: true,
            isAuthUserQuest: false,
            mapProperties: {
                marker: null,
                zoom: null,
                center: []
            }
        }

        this.handleClose = this.handleClose.bind(this);
    }

    setupMapProperties(quest) {
        let center = [quest.latitude, quest.longitude];
        let pin = quest.pinImage;
        let latlng = { lat: center[0], lng: center[1] };
        const zoom = 16;
        let marker = {
            latlng,
            pin,
            quest
        }
        return {
            marker,
            zoom,
            center
        }
    }

    async handleClose(event) {
        event.preventDefault();
        let {questItem} = this.state;
        if (!!this.state.questItem) {
            await firestore.closeQuest(questItem.id);
            window.open("../quests", "_self");
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { id } = this.props.match.params;
        const authUserId = auth.getUserId();

        firestore.onceGetQuest(id)
            .then((doc) => {
                let questItem = doc.data();
                questItem.id = doc.id;
                questItem.pinImage = 'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media';

                let mapProperties = this.setupMapProperties(questItem);
                let sameIdQuest = (questItem.questGiverId.trim() === authUserId.trim() && questItem.questStatus !== 2);
                this.setState(() => ({ questItem, loading: false, mapProperties, isAuthUserQuest: sameIdQuest }));
            })
            .catch(err => {
                this.setState(() => ({ questItem: null, loading: true }));
                console.log("Error getting quest : ", err);
            })
    }

    render() {
        const { loading, questItem, mapProperties, isAuthUserQuest } = this.state;
        const { zoom, center, marker } = mapProperties;
        const markers = [marker];

        return (
            <>
                {loading && <Loading />}
                {!loading &&
                    <Table>
                        <tbody>
                            <Tr>
                                <Td>
                                    <Title> {questItem.title} </Title>
                                    <h4>
                                        {questItem.emailAddress} - {' '}
                                        {questItem.phoneNumber} - {' '}
                                        {questItem.created.toDate().toLocaleString()}
                                    </h4>
                                    <hr />
                                    <Description> {questItem.description} </Description>

                                    {
                                        !!isAuthUserQuest &&
                                        <div>
                                            <Button primary> Edit </Button>
                                            <Button onClick={this.handleClose}> Close </Button>
                                        </div>
                                    }

                                </Td>

                                <Td>
                                    <QuestMap center={center} zoom={zoom} markers={markers} disableClick={true} disablePopup={true} />
                                </Td>
                            </Tr>
                        </tbody>
                    </Table>
                }
            </>
        )
    }
}

export default QuestDetail;