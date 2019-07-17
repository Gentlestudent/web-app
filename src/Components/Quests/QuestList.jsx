import React from 'react';
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
                            <a href={`/quests/${item.id}`} key={item.id}>
                                <li className="news-item">
                                    <article className="post">
                                        <div className="news-content">
                                            <h1> { item.title } </h1>
                                            <h3> { item.created.toLocaleString("nl") } </h3>
                                            <p> { item.description } </p>
                                        </div>
                                    </article>
                                </li>
                            </a>
                        )}
                    </ul>
                </div>
            </div>     
        }
    </>

export default QuestList;
