import React, {Component} from 'react';
import { firestore } from '../../Utils/Firebase';
import Spinner from '../../Shared/Spinner';
import styled from 'styled-components';

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
    border : ${props => props.withBorder ? '1px solid black' : '0' };
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
            questItem : null,
            loading : true
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
        const {id} = this.props.match.params;

        firestore.onceGetQuest(id)
                 .then( (doc) => {
                     this.setState( () => ({questItem : doc.data(), loading : false}));
                 })
                 .catch(err => {
                     this.setState( () => ({questItem : null, loading : true}));
                     console.log("Error getting quest : ", err);
                 })
    }

    render(){
        const {loading, questItem} = this.state;
        return(
            <>
                {loading && <Loading />}
                {!loading &&
                        <Table>
                            <tbody>
                                <tr>
                                    <Td> 
                                        <Title> {questItem.title} </Title> 
                                        <h4> 
                                            { questItem.emailAddress } - { ' '}
                                            { questItem.phoneNumber } - { ' '}
                                            { questItem.created.toDate().toLocaleString()} 
                                         </h4> 
                                    </Td>
                                    
                                    <Td rowSpan="3" alignCenter withBorder> INSERT OSM </Td>
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