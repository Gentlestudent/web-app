import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const Loading = () => <div> <Spinner /> </div>

const QuestList = ( { allQuests } ) =>
    <>
        { !allQuests && <Loading /> }
        { !!allQuests && 
            <div>
                <div className="l-container">
                    <ul>
                        {allQuests.map(item =>
                            <Link to={`/quests/${item.id}`} key={item.id}>
                                <li className="news-item">
                                    <article className="post">
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
                </div>
            </div>     
        }
    </>

export default QuestList;
