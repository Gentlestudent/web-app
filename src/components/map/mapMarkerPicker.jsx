import { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useFormikContext } from 'formik';
import { getPublicKy } from '../../utils/getKy';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Map = ({ onChange }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: 3.7322,
    latitude: 51.0498,
    zoom: 13
  });

  const [marker, setMarker] = useState({
    longitude: 3.7322,
    latitude: 51.0498
  });

  const [transitionDuration, setTransitionDuration] = useState(100);

  function handleClick(event) {
    const [longitude, latitude] = event.lngLat;
    setViewport({
      ...viewport,
      longitude,
      latitude
    });
    setMarker({
      longitude,
      latitude
    });
  }

  useEffect(() => {
    onChange(marker);
  }, [marker, onChange]);

  const { values } = useFormikContext();
  const geoLookupTimeout = useRef(null);
  const addressRef = useRef({
    street: '',
    number: '',
    city: '',
    postal: ''
  });

  const fieldNames = ['street', 'number', 'city', 'postal'];
  const addressChanged = fieldNames.reduce((accumulator, fieldName) => {
    return accumulator || values[fieldName] !== addressRef.current[fieldName];
  }, false);
  if (addressChanged) {
    addressRef.current = {
      street: values.street,
      number: values.number,
      city: values.city,
      postal: values.postal
    }
    getNewGeo();
  }

  function getNewGeo() {
    const searchParams = new window.URLSearchParams({
      proximity: '3.7322,51.0498',
      bbox: '3.72,51,3.75,51.2',
      access_token: 'pk.eyJ1Ijoic2FyYWh2YW5kZW5iZXJnaGUiLCJhIjoiY2tld3djcHl5MDhsZzJ6bDgxN2x6ZTBzaCJ9.hZxIB8Z-nu7GkxhwboP6XQ',
      limit: 5
    })
    const address = fieldNames.reduce((address, fieldName) => {
      return addressRef.current[fieldName] ? `${address} ${addressRef.current[fieldName]}` : address;
    }, '');
    if (!address) return;

    clearTimeout(geoLookupTimeout.current);
    geoLookupTimeout.current = setTimeout(async () => {
      const ky = await getPublicKy();
      try {
        const response = await ky(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?${searchParams.toString()}`).json();
        if (response?.features?.length) {
          const [longitude, latitude] = response.features[0].geometry?.coordinates || [];
          if (longitude && latitude) {
            setViewport({
              ...viewport,
              longitude,
              latitude
            });
            setMarker({
              longitude,
              latitude
            });
          }
        }
      } catch (error) {
        // TODO handle error
        console.log(error);
      }
    }, 300);
  }

  return (
    <ReactMapGL
      scrollZoom
      dragPan
      mapStyle="mapbox://styles/sarahvandenberghe/ckewzjk7d006419plwblt3vyz"
      mapboxApiAccessToken="pk.eyJ1Ijoic2FyYWh2YW5kZW5iZXJnaGUiLCJhIjoiY2tld3djcHl5MDhsZzJ6bDgxN2x6ZTBzaCJ9.hZxIB8Z-nu7GkxhwboP6XQ"
      {...viewport}
      transitionDuration={transitionDuration}
      onViewportChange={setViewport}
      onNativeClick={handleClick}
      onMouseDown={() => setTransitionDuration(0)}
      onMouseUp={() => setTransitionDuration(100)}
    >
      <Marker latitude={marker.latitude} longitude={marker.longitude}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
