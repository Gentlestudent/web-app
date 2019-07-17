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
        this.updateMarkers(map);

        this.setState({ map: map });
        map.invalidateSize();
    }

    clearMarkers(map) {
        for(let i = 0; i<this.state.markers.length; i++) {
            map.removeLayer(this.state.markers[i]);
        }
        this.setState({markers: []});
    }

    updateMarkers(map) {
        let markers = this.props.markers;
        if (markers === undefined || markers === null || markers.length <= 0)
            return;

        this.clearMarkers(map);

        let updatedMarkers = [];
        markers.forEach(el => {
            let quest = el.quest;

            // Create icon for the pin
            let icon = L.icon({
                iconUrl: el.pin,
                iconSize: [30, 40],
                iconAnchor: [15, 40],
                popupAnchor: [0, -40]
            }
            );

            // Create marker with correct properties
            let marker = L.marker(el.latlng, {
                title: "Klik voor meer informatie",
                icon
            });

            // Create and bind popup
            marker.bindPopup("<p><strong>" + quest.title + "</strong><br>" + quest.description + "</p>");

            // Add events to marker
            marker.on('click', ev => {
                console.log("Clicked marker", ev.target.options.title);
            });
            marker.on('mouseover', function (e) {
                e.target.openPopup();
            });
            marker.on("mouseout", function (e) {
                e.target.closePopup();
            });

            // Attach marker to map
            marker.addTo(map);
            updatedMarkers.push(marker);
        });

        this.setState({markers: updatedMarkers});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.markers !== this.props.markers) {
            this.updateMarkers(this.state.map);
        }

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