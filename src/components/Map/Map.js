import React from 'react';
import PropTypes from 'prop-types';
import { LoadScriptNext } from '@react-google-maps/api';
import { LoadingSpinner } from '../../index';
// import GoogleMapsApiLoader from './GoogleMapsApiLoader';
import MapRenderer from './MapRenderer';

const Map = React.forwardRef((props, ref) => {
    const { apiKey, language, region, additionalGoogleProps, ...rest } = props;

    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            {...additionalGoogleProps}
        >
            <MapRenderer ref={ref} {...rest} />
        </LoadScriptNext>
    );
});

Map.displayName = 'Map';

Map.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /** Tha language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language: PropTypes.string,
    /** Regonal setting for the map. By default Google uses US.
     * For adetails see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** other props to pass to the google loader. For details see: https://developers.google.com/maps/documentation/javascript/localization#Region */
    additionalGoogleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    ...MapRenderer.propTypes,
};

Map.defaultProps = {
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
    additionalLoaderProps: {},
    onLoadError: undefined,
    language: undefined,
    region: undefined,
};

export default Map;
