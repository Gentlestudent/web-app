import React, { Component } from 'react';

import Opportunities from './Opportunities';
import Download from './Download';

import eyecather from '../../../assets/eyecatcher.jpg';
import newImage from '../../../assets/wat-is-er-nieuw.png';

const newStyle = {
	width: '100%',
	height: '100%',
	minHeight: '300px',
	backgroundImage: `url(${newImage})`,
	backgroundSize: 'cover',
	backgroundColor: 'black'
};

class FrontPage extends Component {
	constructor() {
		super();
		this.state = {
			iFrameHeight: '0px',
		}
		this.videoRef = React.createRef();
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount = () => {
		// this.props.check();
		window.scrollTo(0, 0);
		// window.addEventListener('load', () => {
		// console.log("loaded");
		setTimeout(() => {
			var img = document.getElementById("startpage");
			if (img != null) {
				img = img.getElementsByTagName('img')[0];
				// console.log(img);
				img.style['filter'] = 'blur(0px)';
				img.style['-webkit-filter'] = 'blur(0px)';
			}
		}, 1000);
		// });

		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
	}
	componentWillUnmount = () => {
		window.removeEventListener("resize", this.updateDimensions);
	}
	updateDimensions() {
		// const el = ReactDOM.findDOMNode(this).querySelector('.dynamic-iframe');
		if (this.videoRef !== undefined) {
			let el = this.videoRef.current;
			this.setState({
				"iFrameHeight": 405 / 720 * el.offsetWidth
			});
		}
		// console.log(el.offsetWidth);
	}
	render() {
		return (
			<div>
				<div id="startpage">
					<div className="eyecather-wrapper">
						<img src={eyecather} id="eyecather" alt="eyecather" />
					</div>
					<div className="container">
						<div className="content">
							<h1>Aan de slag met Gentlestudent</h1>
							<h2>“Verken je stad, help je buren.”</h2>
							{/* <form action="">
								<div className="search-wrapper frontpage">
									<i className="fas fa-search"></i>
									<input type="text" placeholder="Probeer “Gent Korenmarkt”"/>
									<button type="submit">Zoeken</button>
								</div>
							</form> */}
							<div className="text">
								<p>In de stad valt veel te leren, ontdek als <b>student</b> waar je je allemaal kunt verrijken. Vul je leven en geest en laat anderen meegenieten van je Gentle-talent.</p>
								<p>Laat van je missie horen en betrek als <b>organisatie of buurt</b> studenten bij jullie projecten en geef ze de kans om ervaringen op te doen in een authentieke setting.</p>
							</div>
							<div className="introductory-video">
								<iframe
									title="Intro video"
									className="dynamic-iframe"
									ref={this.videoRef}
									src="https://arteveldehogeschool.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc47c1a8-68b9-413b-812a-aa1400a18754&v=1"
									style={{ objectFit: 'cover', maxWidth: 720, width: '100%', maxHeight: 405, height: this.state.iFrameHeight, overflow: 'visible' }}
									width="100%"
									height={this.state.iFrameHeight}
									frameBorder="0"
									allowFullScreen allow="autoplay">
								</iframe>
							</div>
						</div>
						<a className="scroll-down-arrow" href="#anchor"><span></span></a>
					</div>
				</div>
				<div id="anchor"></div>
				<Opportunities />
				<div id="new" style={newStyle}>
					<div className="container">
						<div>
							<h2>Zie wat Gentlestudent heeft te bieden en wat je mag verwachten in de toekomst</h2>
							<a href="/news">Wat is er nieuw?</a>
						</div>
					</div>
				</div>
				<Download />
			</div>
		);
	}
}

export default FrontPage;