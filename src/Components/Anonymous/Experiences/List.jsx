import React, { Component } from 'react';

import Spinner from '../../../Shared/Spinner';

class List extends Component {
	render() {
		const { experiences } = this.props;

		return (
			<React.Fragment>
				{ !! experiences  && <ExperiencesList experiences={ experiences } /> }
				{ ! experiences && <EmptyList/> }
			</React.Fragment>
		)
	}
}

const ExperiencesList = ({ experiences }) =>
	<div>
		<div className="l-container">
			<ul>
			{Object.keys(experiences).map(key =>
                // <p>{key}</p>
                <a href={`ervaringen/${key}`}>
                    <li className="news-item">
                    <article className="post">
                        <div className="crop-news-img">
                            <img className="news-img" src={experiences[key].imageUrl ? `${experiences[key].imageUrl}` : null} alt="Article thumbnail" />
                        </div>
                        <h1>{experiences[key].title}</h1>
                        {!!experiences[key].published && <small><time dateTime={experiences[key].published}>{experiences[key].published}</time></small>}
                        {!!experiences[key].author && <small>{experiences[key].author}</small>}
                        <p>{experiences[key].shortText}</p> 
                    </article>
                    </li>
                </a>
            )}
            </ul>
		</div>
	</div>

const EmptyList = () =>
	<div>
		<Spinner />
	</div>

export default List;