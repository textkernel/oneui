import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLoadScript, GoogleMap, Marker, Circle } from '@react-google-maps/api';
import { LoadingSpinner } from '../../index';

const circleOptions = radius => ({
    strokeColor: 'transparent',
    strokeOpacity: 1,
    strokeWeight: 0,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius,
    zIndex: 1
});

const Map = props => {
    const { apiKey, center, zoom, markers, loadErrorMessage, mapContainerStyle, ...rest } = props;
    const positions = markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
    const mapRef = React.createRef();
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey });

    const fitBounds = () => {
        if (!mapRef.current || !mapRef.current.state.map) return;
        const { map } = mapRef.current.state;

        // eslint-disable-next-line no-undef
        const { LatLngBounds, Circle: CircleClass } = google.maps;

        if (markers.length) {
            const bounds = new LatLngBounds();
            markers.forEach((marker, i) => {
                if (marker.radius) {
                    const circle = new CircleClass({ center: positions[i], radius: marker.radius });
                    bounds.union(circle.getBounds());
                } else {
                    bounds.extend(positions[i]);
                }
                map.fitBounds(bounds);
            });
        } else {
            map.setCenter(center);
            map.setZoom(zoom);
        }
    };

    useEffect(() => fitBounds());

    if (loadError) {
        return <div>{loadErrorMessage}</div>;
    }

    return isLoaded ? (
        <GoogleMap
            ref={mapRef}
            onLoad={fitBounds}
            center={center}
            zoom={zoom}
            mapContainerStyle={mapContainerStyle}
            options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false
            }}
            {...rest}
        >
            {!!markers.length &&
                markers.map((marker, i) => {
                    const { radius } = marker;
                    const position = positions[i];
                    const positionStr = `${position.lat}-${position.lng}`;
                    return (
                        <React.Fragment>
                            <Marker key={`${positionStr}-marker`} position={position} />
                            {!!radius && (
                                <Circle
                                    key={`${positionStr}-circle`}
                                    center={position}
                                    options={circleOptions(radius)}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
        </GoogleMap>
    ) : (
        <LoadingSpinner centerIn="parent" />
    );
};

Map.displayName = 'Map';

Map.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /** Message to be shown if error occured during loading Google API */
    loadErrorMessage: PropTypes.string.isRequired,
    /** The default center of the map to be used if no markers are present */
    center: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
            lng: PropTypes.number.isRequired,
            lat: PropTypes.number.isRequired
        })
    ]),
    /** The default zoom of the map to be used if no markers are present */
    zoom: PropTypes.number,
    /** The markers to be shown on the map. When present, map will zoom automatically to display them */
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            lng: PropTypes.number.isRequired,
            lat: PropTypes.number.isRequired,
            radius: PropTypes.number
        })
    ),
    /** The style of the map container. It has to have explicit width and height (requirement from Google).
     *  Altenatively you can set explicit size on the parent container, then, by default, the map will scale to match that
     */
    mapContainerStyle: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired
    })
};

Map.defaultProps = {
    center: {
        lat: 52.3922288,
        lng: 4.9338793
    },
    zoom: 7,
    markers: [],
    mapContainerStyle: {
        height: '100%',
        width: '100%'
    }
};

export default Map;
