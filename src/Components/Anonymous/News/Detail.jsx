import React, { Component } from 'react';
import Spinner from '../../../Shared/Spinner';
import { firestore } from '../../../Utils/Firebase';

class Detail extends Component {
  constructor(props){
    super(props);

    this.state={
      newsItems: null,
      id: this.props.match.params.id
    };
  }

  componentDidMount(){
    if(this.props.newsItems===undefined){
      firestore.onceGetNewsItem(this.state.id)
      .then(doc => {
        if(doc.exists()){
          this.setState(() => ({ newsItem: doc.data() }));
          // console.log(this.state.newsItems);
        }
      })
      .catch(err => {
        console.log('Could not fetch newsItem data: ', err);
      });
    }
    else{
      console.log("News items", this.props);
      this.setState(() => ({ newsItem: this.props.newsItems[this.state.id] }));
    }
  }

  render() {
    const {newsItem} = this.state;

    return (
      <React.Fragment>
        { !! newsItem &&
            <NewsDetail newsItem={ newsItem } />
        }
				{ ! newsItem && <EmptyList/> }
			</React.Fragment>
      
    )
  }
}

const NewsDetail = ({ newsItem }) =>
  <div className="opportunity-detail">
    <div className="overlay"></div>
    <div className="titlehead-wrapper" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}>
      <div className="titlehead">
        <div className="opportunity-container">
          {/* <h1>{newsItem.title}</h1> */}
        </div>
      </div>
    </div>
    <div id="page" className="opportunity-container">
      <div className="content news-item-content">
        <h3>{newsItem.title}</h3>
        <small>{newsItem.author}</small><br />
        <small>{newsItem.published}</small>
        <p>{newsItem.longText}</p>
        <br />
      </div>
    </div>
    <br />
    <br />
  </div>

const EmptyList = () =>
	<div>
		<Spinner />
	</div>


export default Detail;
