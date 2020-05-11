import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

const circleOptions = (radius) => ({
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

export const Map = React.forwardRef((props, ref) => {
    const { defaultArea, markers, mapContainerStyle, ...rest } = props;
    const mapRef = ref || React.createRef();

    const fitBounds = React.useCallback(() => {
        if (!mapRef.current || !mapRef.current.state.map) return;
        const { map } = mapRef.current.state;
        const { LatLngBounds, Circle: CircleClass, Geocoder } = window.google.maps;
        const geocoder = new Geocoder();
        const bounds = new LatLngBounds();

        if (markers.length === 1 && markers[0].description) {
            const marker = markers[0];
            if (marker.radius) {
                const circle = new CircleClass({
                    center: marker.center,
                    radius: marker.radius,
                });
                bounds.union(circle.getBounds());
                map.fitBounds(bounds);
            } else if (marker.description) {
                geocoder.geocode({ address: marker.description }, (result, status) => {
                    if (status === 'OK') {
                        map.fitBounds(result[0].geometry.viewport);
                    }
                });
            } else {
                bounds.extend(marker.center);
                map.fitBounds(bounds);
            }
        } else if (markers.length) {
            markers.forEach((marker) => {
                if (marker.radius) {
                    const circle = new CircleClass({
                        center: marker.center,
                        radius: marker.radius,
                    });
                    bounds.union(circle.getBounds());
                } else {
                    bounds.extend(marker.center);
                }
                map.fitBounds(bounds);
            });
        } else if (defaultArea.address) {
            geocoder.geocode({ address: defaultArea.address }, (result, status) => {
                if (status === 'OK') {
                    map.fitBounds(result[0].geometry.viewport);
                } else {
                    // TODO: add error handling
                }
            });
        } else {
            map.setCenter(defaultArea.center);
            map.setZoom(defaultArea.zoom);
        }
    }, [defaultArea, mapRef, markers]);

    useEffect(fitBounds);

    return (
        <GoogleMap
            ref={mapRef}
            onLoad={fitBounds}
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
                markers.map((marker) => {
                    const { center: mCenter, radius } = marker;
                    const positionStr = `${mCenter.lat}-${mCenter.lng}`;

                    return (
                        <React.Fragment key={positionStr}>
                            <Marker key={`${positionStr}-marker`} position={mCenter} />
                            {!!radius && (
                                <Circle
                                    key={`${positionStr}-circle`}
                                    center={mCenter}
                                    options={circleOptions(radius)}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
        </GoogleMap>
    );
});

Map.displayName = 'Map';

Map.propTypes = {
    /** The default parameters to determine the viewport when no markers are present. */
    defaultArea: PropTypes.oneOfType([
        PropTypes.shape({
            address: PropTypes.string,
        }),
        PropTypes.shape({
            center: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.number),
                PropTypes.shape({
                    lng: PropTypes.number.isRequired,
                    lat: PropTypes.number.isRequired,
                }),
            ]),
            zoom: PropTypes.number,
        }),
    ]),
    /** The markers to be shown on the map. When present, map will zoom automatically to display them
     * The radius is in meters on the Earth's surface.
     */
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            center: PropTypes.shape({
                lng: PropTypes.number.isRequired,
                lat: PropTypes.number.isRequired,
            }),
            radius: PropTypes.number,
            description: PropTypes.string,
        })
    ),
    /** The style of the map container. It has to have explicit width and height (requirement from Google).
     *  Alternatively you can set explicit size on the parent container, then, by default, the map will scale to match that
     */
    mapContainerStyle: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
    }),
};

Map.defaultProps = {
    defaultArea: {
        center: {
            lat: 52.3922288,
            lng: 4.9338793,
        },
        zoom: 7,
    },
    markers: [],
    mapContainerStyle: {
        height: '100%',
        width: '100%',
    },
};
