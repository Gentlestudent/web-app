import React, { Component } from 'react'
import L from 'leaflet'

class OSM extends Component {
    constructor(props) {
        super(props);

        this.state = {
            marker: null,
            map: null
        };
    }

    componentDidMount() {
        let map = L.map("map-2", {
            center: [51.0511164, 3.7114566],
            zoom: 13,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                })
            ]
        });

        if (this.props.location !== null && this.props.location !== undefined) {
            this.initializeMarker(map);
        }

        map.on('click', ev => {
            if (this.state.marker === null || this.state.marker === undefined) {
                let pinIcon = L.icon({
                    iconUrl: this.props.pinImage,
                    iconSize: [60, 90],
                    iconAnchor: [30, 45],
                    popupAnchor: [0, -25]
                });
                let marker = L.marker(ev.latlng, {
                    draggable: true,
                    title: "Locatie van de leerkans"
                });
                if (this.props.pinImage !== "" && this.props.pinImage !== undefined && this.props.pinImage !== null) {
                    marker.setIcon(pinIcon);
                }
                marker.on('dragend', event => {
                    this.props.changeLocation(event.target._latlng);
                });
                marker.addTo(map);
                this.setState({ marker: marker });
            }
            else {
                this.state.marker.setLatLng(ev.latlng);
                this.props.changeLocation(ev.latlng);
            }
        })

        this.setState({ map: map });
    }

    initializeMarker(map) {

        let pinIcon = L.icon({
            iconUrl: this.props.pinImage,
            iconSize: [60, 90],
            iconAnchor: [30, 45],
            popupAnchor: [0, -25]
        });

        let marker = L.marker(this.props.location, {
            draggable: true,
            title: "Locatie van de leerkans"
        }).addTo(map);
        if (this.props.pinImage !== "" && this.props.pinImage !== undefined && this.props.pinImage !== null) {
            marker.setIcon(pinIcon);
        }
        marker.on('dragend', event => {
            this.props.changeLocation(event.target._latlng);
        });
        this.setState({ marker: marker });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location !== this.props.location) {
            this.state.map.flyTo(this.props.location);
            if (this.state.marker === null || this.state.marker === undefined) {
                this.initializeMarker(this.state.map);
            }
            else{
                this.state.marker.setLatLng(this.props.location);
            }
        }
        if (prevProps.pinImage !== this.props.pinImage) {
            if (this.state.marker !== null && this.state.marker !== undefined) {
                console.log("Changing to", this.props.pinImage);
                let icon = this.state.marker.getIcon();
                icon.options.iconUrl = this.props.pinImage;
                icon.options.iconSize = [60, 90];
                icon.options.iconAnchor = [30, 45];
                icon.options.popupAnchor = [0, -25];
                this.state.marker.setIcon(icon);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="map-2" />
            </React.Fragment>
        )
    }
}

export default OSM;