import React, { Component } from 'react'
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -35]
});

L.Marker.prototype.options.icon = DefaultIcon;

class QuestMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            markers: []
        }
    }

    componentDidMount() {
        // Create map
        let map = L.map("map", {
            center: [51.0511164, 3.7114566],
            zoom: 13,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                })
            ]
        });


        // Create markers
        let markers = this.props.markers;
        markers.forEach(el => {

            let icon = L.icon( {
                iconUrl: el.iconUrl,
                iconSize: [30, 40],
                iconAnchor: [15, 40],
                popupAnchor: [15, -20] 
            }
            );

            let marker = L.marker(el.latlng, {
                title: el.title,
                icon
            });

            marker.on('click', ev => {
                console.log("Clicked marker", ev.target.options.title);
            })
        });

        this.setState({ map: map });
        map.invalidateSize();
    }

    render() {
        return (
            <React.Fragment>
                <div id="map" />
            </React.Fragment>
        );
    }
}

export default QuestMap;