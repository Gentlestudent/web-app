import React, { Component } from 'react'
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


/**
 * Default icon for the markers.
 * Without this code, default markers wouldn't be visible
 */
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -35]
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * Displays the map on the quest page
 */
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

        let { center, zoom } = this.props;

        let map = L.map("map", {
            center: !!center ? center : [51.0511164, 3.7114566],
            zoom: !!zoom ? zoom : 13,
            layers: [
                L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
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

    /**
     * Remove the markers of the map. The markers are stored in the state.
     * @param {L.Map} map map containing the markers. 
     */
    clearMarkers(map) {
        for (let i = 0; i < this.state.markers.length; i++) {
            map.removeLayer(this.state.markers[i]);
        }
        this.setState({ markers: [] });
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

            const { disableClick, disablePopup } = this.props;

            // Create marker with correct properties
            let marker = L.marker(el.latlng, {
                title: disableClick ? "Locatie van de quest" : "Klik voor meer informatie",
                icon
            });

            // Create and bind popup
            marker.bindPopup("<p><strong>" + quest.title + "</strong><br>" + quest.description + "</p>");

            // Add events to marker
            if (!disableClick) {
                marker.on('click', ev => {
                    console.log("Clicked marker", ev.target.options.title);
                    window.open("/quests/" + quest.id, "_self");
                });
            }

            if (!disablePopup) {
                marker.on('mouseover', function (e) {
                    e.target.openPopup();
                });
                marker.on("mouseout", function (e) {
                    e.target.closePopup();
                });
            }

            // Attach marker to map
            marker.addTo(map);
            updatedMarkers.push(marker);
        });

        this.setState({ markers: updatedMarkers });
    }

    componentDidUpdate(prevProps, prevState) {
        // Update the markers whenever they change
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