import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoader from './GoogleLoader';
import MapRenderer from './MapRenderer';

const Map = React.forwardRef((props, ref) => {
    const { apiKey, onLoadError, language, region, additionalLoaderProps, ...rest } = props;

    return (
        <GoogleLoader
            apiKey={apiKey}
            onLoadError={onLoadError}
            language={language}
            region={region}
            {...additionalLoaderProps}
        >
            <MapRenderer ref={ref} {...rest} />
        </GoogleLoader>
    );
});

Map.displayName = 'Map';

Map.propTypes = {
    ...GoogleLoader.propTypes,
    ...MapRenderer.propTypes,
    /** other props to pass to the google loader. For details see: https://developers.google.com/maps/documentation/javascript/localization#Region */
    additionalLoaderProps: PropTypes.object // eslint-disable-line react/forbid-prop-types
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
    },
    additionalLoaderProps: {}
};

export default Map;
