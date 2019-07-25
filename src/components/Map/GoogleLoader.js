import React from 'react';
import PropTypes from 'prop-types';
import { useLoadScript } from '@react-google-maps/api';
import { LoadingSpinner } from '../../index';

const GoogleLoader = props => {
    const { apiKey, loadErrorMessage, children } = props;
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey });

    if (loadError) {
        return <div>{loadErrorMessage}</div>;
    }

    return isLoaded ? (
        <React.Fragment>{children}</React.Fragment>
    ) : (
        <LoadingSpinner centerIn="parent" />
    );
};

GoogleLoader.displayName = 'GoogleLoader';

GoogleLoader.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /** Message to be shown if error occured during loading Google API */
    loadErrorMessage: PropTypes.string.isRequired,
    /** The map to be rendered */
    children: PropTypes.node.isRequired
};

export default GoogleLoader;
