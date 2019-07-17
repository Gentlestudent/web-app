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

class OSM extends Component {
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
        let markers = this.updateMarkers(map);

        this.setState({ map, markers });
        map.invalidateSize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.opportunities !== this.props.opportunities) {
            let markers = this.updateMarkers(this.state.map);
            this.setState({markers: markers});
        }
    }

    updateMarkers(map) {
        this.clearMarkers(map);

        let opps = this.props.opportunities;
        console.log(opps.length);
        let addresses = this.props.addresses;
        let markers = [];
        Object.keys(opps).map(key => {


            let pinIcon = L.icon({
                iconUrl: opps[key].pinImageUrl,
                iconSize: [50, 80],
                iconAnchor: [25, 40],
                popupAnchor: [0, -20]
            });


            let addrID = opps[key].addressId;
            let address = addresses[addrID];
            let latlng = { lat: address.latitude, lng: address.longitude };
            let newMarker = L.marker(latlng, {
                title: "Klik voor meer info",
                icon: pinIcon
            });
            newMarker.properties = {};
            newMarker.properties.opportunity = opps[key];
            newMarker.bindPopup("<p><strong>" + opps[key].title + "</strong><br>" + opps[key].shortDescription.substr(0, 140) + "...</p>", {
                offset: L.point(0, 0)
            });
            newMarker.on('mouseover', function (e) {
                e.target.openPopup();
            });
            newMarker.on("mouseout", function (e) {
                newMarker.closePopup();
            });
            newMarker.on("click", function (e) {
                // console.log(e.target.properties.opportunity);
                window.open("/opportunities/" + e.target.properties.opportunity.id, "_self");
            });
            markers.push(newMarker);
            newMarker.addTo(map);
            return true;
        });

        return markers;
    }

    clearMarkers(map) {
        let {markers} = this.state;
        if(markers === undefined || markers === null)
            return;
        for (let i = 0; i < markers.length; i++) {
            map.removeLayer(markers[i]);
        }
        this.setState({ markers: [] });
    }

    render() {
        return (
            <React.Fragment>
                <div id="map" />
            </React.Fragment>
        );
    }
}

export default OSM;