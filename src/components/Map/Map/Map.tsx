import * as React from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

const circleOptions = () => ({
    strokeColor: 'transparent',
    strokeOpacity: 1,
    strokeWeight: 0,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
});

type CircularMarker = {
    center: {
        lng: number;
        lat: number;
    };
    radius: number;
    description: string;
};

interface Props extends Omit<GoogleMap, 'onLoad' | 'mapContainerStyle' | 'options'> {
    /** The default parameters to determine the viewport when no markers are present. */
    defaultArea:
        | {
              address: string;
          }
        | {
              center:
                  | [number, number]
                  | {
                        lng: number;
                        lat: number;
                    };
              zoom: number;
          };
    /** A geoJson description of the area that should be highlighted when there are no other markers present */
    defaultHighlight?: GeoJSON.GeoJsonObject;
    /** The markers to be shown on the map. When present, map will zoom automatically to display them
     * The radius is in meters on the Earth's surface.
     */
    markers?: CircularMarker[];
    /** The style of the map container. It has to have explicit width and height (requirement from Google).
     *  Alternatively you can set explicit size on the parent container, then, by default, the map will scale to match that
     */
    mapContainerStyle?: {
        width: string;
        height: string;
    };
}

const Map = React.forwardRef<GoogleMap, Props>((props, ref) => {
    const { defaultArea, markers = [], mapContainerStyle, defaultHighlight, ...rest } = props;
    const mapRef = ref || React.createRef<GoogleMap>();
    const [highlightFeatures, setHighlightFeatures] = React.useState<
        google.maps.Data.Feature[] | null
    >(null);

    const fitBounds = React.useCallback(() => {
        if (mapRef && typeof mapRef !== 'function' && mapRef.current && mapRef.current.state.map) {
            const { map } = mapRef.current.state;
            const { LatLngBounds, Circle: CircleClass, Geocoder } = window.google.maps;
            const geocoder = new Geocoder();
            const bounds = new LatLngBounds();

            const fitBoundsByAddress = (address) => {
                geocoder.geocode({ address }, (result, status) => {
                    if (status === 'OK') {
                        map.fitBounds(result[0].geometry.viewport);
                    } else {
                        // TODO: add error handling
                    }
                });
            };

            /**
             * if there's a single marker without radius, fits it into the map borders
             * else if there're any markers passed, create radius circles for them and fits them into the map borders
             * else if there's address for default area, fits it into the map borders
             * else centers the map on the default area and zooms on it
             */
            if (markers.length === 1 && !markers[0].radius) {
                const [firstMarker] = markers;
                if (firstMarker.description) {
                    fitBoundsByAddress(firstMarker.description);
                } else {
                    bounds.extend(firstMarker.center);
                    map.fitBounds(bounds);
                }
            } else if (markers.length) {
                markers.forEach(({ center, radius }) => {
                    if (radius) {
                        const circle = new CircleClass({ center, radius });
                        bounds.union(circle.getBounds());
                    } else {
                        bounds.extend(center);
                    }
                    map.fitBounds(bounds);
                });
            } else if ('address' in defaultArea) {
                fitBoundsByAddress(defaultArea.address);
            } else {
                if ('lng' in defaultArea.center) {
                    map.setCenter(defaultArea.center);
                } else {
                    map.setCenter(new google.maps.LatLng(...defaultArea.center));
                }

                map.setZoom(defaultArea.zoom);
            }
        }
    }, [defaultArea, mapRef, markers]);

    const manageDefaultHighlight = React.useCallback(() => {
        if (mapRef && typeof mapRef !== 'function' && mapRef.current && mapRef.current.state.map) {
            const { map } = mapRef.current.state;
            if (defaultHighlight && !markers.length && !highlightFeatures) {
                const highlight = map.data.addGeoJson(defaultHighlight);
                map.data.setStyle({
                    fillColor: 'red',
                    strokeColor: 'red',
                    strokeWeight: 2,
                });
                setHighlightFeatures(highlight);
            } else if (markers.length && highlightFeatures) {
                highlightFeatures.forEach((feature) => map.data.remove(feature));
                setHighlightFeatures(null);
            }
        }
    }, [defaultHighlight, highlightFeatures, mapRef, markers]);

    React.useEffect(fitBounds);

    React.useEffect(manageDefaultHighlight);

    return (
        <GoogleMap
            ref={mapRef}
            onLoad={() => {
                fitBounds();
                manageDefaultHighlight();
            }}
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
                                    radius={radius}
                                    options={circleOptions()}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
        </GoogleMap>
    );
});

Map.displayName = 'Map';

Map.defaultProps = {
    defaultArea: {
        center: {
            lat: 30,
            lng: 0,
        },
        zoom: 2,
    },
    defaultHighlight: undefined,
    markers: [],
    mapContainerStyle: {
        height: '100%',
        width: '100%',
    },
};

export { Map, Props as MapProps, CircularMarker };
