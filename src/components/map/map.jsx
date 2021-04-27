import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactMapGL, { Marker, Layer, Source, Popup } from 'react-map-gl';
import CITIES from './dummydata.json';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: -85.603735,
    latitude: 40.603735,
    zoom: 5
  });

  const [marker, setMarker] = useState(null);

  return (
    <>
      <ReactMapGL
        scrollZoom
        dragPan
        mapStyle="mapbox://styles/sarahvandenberghe/ckewzjk7d006419plwblt3vyz"
        mapboxApiAccessToken="pk.eyJ1Ijoic2FyYWh2YW5kZW5iZXJnaGUiLCJhIjoiY2tld3djcHl5MDhsZzJ6bDgxN2x6ZTBzaCJ9.hZxIB8Z-nu7GkxhwboP6XQ"
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {CITIES.map((city, i) => (
          <Marker key={i} latitude={city.latitude} longitude={city.longitude}>
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#d00',
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
              onMouseOver={() => setMarker(city)}
            >
              <path d={ICON} />
            </svg>
          </Marker>
        ))}
        {marker ? (
          <Popup
            tipSize={5}
            offsetTop={-25}
            longitude={marker.longitude}
            latitude={marker.latitude}
            closeOnClick={false}
            onClose={() => setMarker(null)}
          >
            <p>hi</p>
          </Popup>
        ) : (
          ''
        )}
      </ReactMapGL>

      <style jsx>
        {`
          .test {
            background-color: red !important;
          }
        `}
      </style>
    </>
  );
};

Map.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Map;
