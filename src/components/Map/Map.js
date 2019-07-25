import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoader from './GoogleLoader';
import MapRenderer from './MapRenderer';

const Map = React.forwardRef((props, ref) => {
    const { apiKey, loadErrorMessage, ...rest } = props;

    return (
        <GoogleLoader apiKey={apiKey} loadErrorMessage={loadErrorMessage}>
            <MapRenderer ref={ref} {...rest} />
        </GoogleLoader>
    );
});

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
