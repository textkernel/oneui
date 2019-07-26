import React from 'react';
import PropTypes from 'prop-types';
import { useLoadScript } from '@react-google-maps/api';
import { LoadingSpinner } from '../../../index';

const GoogleMapsApiLoader = props => {
    const { apiKey, onLoadError, language, region, children } = props;
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey, language, region });

    if (loadError && onLoadError) {
        onLoadError();
    }

    return isLoaded ? (
        <React.Fragment>{children}</React.Fragment>
    ) : (
        <LoadingSpinner centerIn="parent" />
    );
};

GoogleMapsApiLoader.displayName = 'GoogleMapsApiLoader';

GoogleMapsApiLoader.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /** Message to be shown if error occured during loading Google API */
    onLoadError: PropTypes.func,
    /** Tha language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language: PropTypes.string,
    /** Regonal setting for the map. By default Google uses US.
     * For adetails see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** The map to be rendered */
    children: PropTypes.node.isRequired,
};

GoogleMapsApiLoader.defaultProps = {
    onLoadError: null,
    language: undefined,
    region: undefined,
};

export default GoogleMapsApiLoader;
