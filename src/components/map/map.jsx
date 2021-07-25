import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup, WebMercatorViewport } from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Map = ({ opportunities }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: 3.7322,
    latitude: 51.0498,
    zoom: 13
  });

  useEffect(() => {
    const minLat = Math.min(51.0498, ...opportunities.map(({ addressLatitude }) => addressLatitude))
    const minLng = Math.min(3.7322, ...opportunities.map(({ addressLongitude }) => addressLongitude))
    const maxLat = Math.max(51.0498, ...opportunities.map(({ addressLatitude }) => addressLatitude))
    const maxLng = Math.max(3.7322, ...opportunities.map(({ addressLongitude }) => addressLongitude))

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
          return (
            <Marker key={opportunity.id} latitude={opportunity.addressLatitude} longitude={opportunity.addressLongitude}>
              <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                  cursor: 'pointer',
                  fill: '#d00',
                  stroke: 'none',
                  transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onMouseOver={() => setMarker(opportunity)}
                onMouseLeave={() => setMarker(null)}
              >
                <path d={ICON} />
              </svg>
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
