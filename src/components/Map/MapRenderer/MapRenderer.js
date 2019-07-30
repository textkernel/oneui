import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

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
    zIndex: 1,
});

const MapRenderer = React.forwardRef((props, ref) => {
    const { center, zoom, markers, mapContainerStyle, ...rest } = props;
    const mapRef = ref || React.createRef();

    const fitBounds = React.useCallback(() => {
        if (!mapRef.current || !mapRef.current.state.map) return;
        const { map } = mapRef.current.state;

        const { LatLngBounds, Circle: CircleClass } = window.google.maps;

        if (markers.length) {
            const bounds = new LatLngBounds();
            markers.forEach(marker => {
                if (marker.radius) {
                    const circle = new CircleClass({
                        center: marker.position,
                        radius: marker.radius,
                    });
                    bounds.union(circle.getBounds());
                } else {
                    bounds.extend(marker.position);
                }
                map.fitBounds(bounds);
            });
        } else {
            map.setCenter(center);
            map.setZoom(zoom);
        }
    });

    useEffect(fitBounds);

    return (
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
                rotateControl: false,
            }}
            {...rest}
        >
            {!!markers.length &&
                markers.map(marker => {
                    const { position, radius } = marker;
                    const positionStr = `${position.lat}-${position.lng}`;
                    return (
                        <React.Fragment key={positionStr}>
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
    );
});

MapRenderer.displayName = 'MapRenderer';

MapRenderer.propTypes = {
    /** The default center of the map to be used if no markers are present */
    center: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
            lng: PropTypes.number.isRequired,
            lat: PropTypes.number.isRequired,
        }),
    ]),
    /** The default zoom of the map to be used if no markers are present */
    zoom: PropTypes.number,
    /** The markers to be shown on the map. When present, map will zoom automatically to display them
     * The radius is in meters on the Earth's surface.
     */
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.shape({
                lng: PropTypes.number.isRequired,
                lat: PropTypes.number.isRequired,
            }),
            radius: PropTypes.number,
        })
    ),
    /** The style of the map container. It has to have explicit width and height (requirement from Google).
     *  Altenatively you can set explicit size on the parent container, then, by default, the map will scale to match that
     */
    mapContainerStyle: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
    }),
};

MapRenderer.defaultProps = {
    center: {
        lat: 52.3922288,
        lng: 4.9338793,
    },
    zoom: 7,
    markers: [],
    mapContainerStyle: {
        height: '100%',
        width: '100%',
    },
};

export default MapRenderer;
