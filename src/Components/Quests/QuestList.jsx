import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const Loading = () => <div> <Spinner /> </div>

const QuestList = ( { allQuests } ) =>
    <>
        { !allQuests && <Loading /> }
        { !!allQuests && 
            <div>
                <div className="questlist-container">
                    {allQuests.length !== 0 ?
                    <ul>
                        {allQuests.map(item =>
                            <Link to={`/quests/${item.id}`} key={item.id}>
                                <li className="news-item">
                                    <article className="post">
                                        <img className="quest-logo" src="https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Quests%2Fquest_circle.png?alt=media" alt=""/>
                                        <div className="news-content">
                                            <h1> { item.title } </h1>
                                            <h4> {item.emailAddress} - { item.created.toLocaleString() } </h4>
                                            <p> { item.description } </p>
                                        </div>
                                    </article>
                                </li>
                            </Link>
                        )}
                    </ul>
                    :
                    <React.Fragment>
                        <p>Er zijn geen actieve quests :'(</p>
                    </React.Fragment>
                        }
                </div>
            </div>     
        }
    </>

export default QuestList;
