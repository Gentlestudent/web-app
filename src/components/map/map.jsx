import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup, WebMercatorViewport } from 'react-map-gl';
import { getBase64AsDataUrl } from '../../utils';

const Map = ({ opportunities }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: 3.7322,
    latitude: 51.0498,
    zoom: 13
  });

  useEffect(() => {
    function filterNumbers(array) {
      return array.filter(number => typeof number === 'number');
    }

    const minLat = Math.min(51.0498, ...filterNumbers(opportunities.map(({ addressLatitude }) => addressLatitude)))
    const minLng = Math.min(3.7322, ...filterNumbers(opportunities.map(({ addressLongitude }) => addressLongitude)))
    const maxLat = Math.max(51.0498, ...filterNumbers(opportunities.map(({ addressLatitude }) => addressLatitude)))
    const maxLng = Math.max(3.7322, ...filterNumbers(opportunities.map(({ addressLongitude }) => addressLongitude)))

    const viewport = new WebMercatorViewport({ width: 800, height: 600 })
      .fitBounds([[minLng, minLat], [maxLng, maxLat]], {
        padding: 20,
        offset: [0, -100]
      });
    setViewport({
      width: '100%',
      height: '100%',
      longitude: viewport.longitude,
      latitude: viewport.latitude,
      zoom: viewport.zoom
    })
  }, [opportunities])

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
        {opportunities.map(opportunity => {
          if (typeof opportunity.addressLatitude !== 'number' && typeof opportunity.addressLongitude !== 'number') return null;
          return (
            <Marker key={opportunity.id} latitude={opportunity.addressLatitude} longitude={opportunity.addressLongitude}>
              <div className="pin">
                <img
                  src={getBase64AsDataUrl(opportunity.pinImage)}
                  alt="Opportunity pin marker"
                  onMouseOver={() => setMarker(opportunity)}
                  onMouseLeave={() => setMarker(null)}
                />
              </div>
            </Marker>
          )
        })}
        {marker && (
          <Popup
            tipSize={5}
            offsetTop={-25}
            longitude={marker.addressLongitude}
            latitude={marker.addressLatitude}
            closeOnClick={false}
            onClose={() => setMarker(null)}
          >
            <div className="popup-content">
              <h4>{marker.title}</h4>
              <p>{marker.shortDescription}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>

      <style jsx>
        {`
          .popup-content {
            max-width: 30rem;
          }

          .popup-content h4 {
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            margin-bottom: 8px;
          }

          .popup-content p {
            font-size: 12px;
            margin: 0;
          }

          .pin {
            width: 50px;
            height: 50px;
            transform: translate(-50%, -100%);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .pin img {
            max-width: 100%;
            max-height: 100%;
          }
        `}
      </style>
    </>
  );
};

Map.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  opportunities: PropTypes.array
};

export default Map;
