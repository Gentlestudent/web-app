import React, { Component } from 'react';
import { firestore } from '../../Utils/Firebase';
import Spinner from '../../Shared/Spinner';
import styled from 'styled-components';
import QuestMap from './QuestMap'

const Loading = () => <div> <Spinner /> </div>

const Title = styled.h1`
    font-size : 40px;
    background-color : #2980b9;
    color : white;
    width : 95%;
`

const Table = styled.table`
    margin : 20px;
`

const Td = styled.td`
    border : ${props => props.withBorder ? '1px solid black' : '0'};
    width : 65%;
    text-align : ${props => props.alignCenter ? 'center' : 'left'}; 
`

const Description = styled.p`
    font-size : 20px;
    font-family : Corbel
`

class QuestDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questItem: null,
            loading: true,
            mapProperties: {
                marker: null,
                zoom: null,
                center: []
            }
        }
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

    componentDidMount() {
        window.scrollTo(0, 0);
        const { id } = this.props.match.params;

        firestore.onceGetQuest(id)
            .then((doc) => {
                let questItem = doc.data();
                questItem.pinImage = 'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_pin.png?alt=media';
                
                let mapProperties = this.setupMapProperties(questItem);
                this.setState(() => ({ questItem, loading: false, mapProperties }));
            })
            .catch(err => {
                this.setState(() => ({ questItem: null, loading: true }));
                console.log("Error getting quest : ", err);
            })
    }

    render() {
        const { loading, questItem, mapProperties } = this.state;
        const { zoom, center, marker } = mapProperties;
        const markers = [marker];

        return (
            <>
                {loading && <Loading />}
                {!loading &&
                    <Table>
                        <tbody>
                            <tr>
                                <Td>
                                    <Title> {questItem.title} </Title>
                                    <h4>
                                        {questItem.emailAddress} - {' '}
                                        {questItem.phoneNumber} - {' '}
                                        {questItem.created.toDate().toLocaleString()}
                                    </h4>
                                </Td>

                                <QuestMap center={center} zoom={zoom} markers={markers} disableClick={true} disablePopup={true} />
                            </tr>

                            <tr>
                                <Td> <hr /> <Description> {questItem.description} </Description> </Td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </>
        )
    }
}

export default QuestDetail;