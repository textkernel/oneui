import React from 'react';
import PropTypes from 'prop-types';
import { LoadScriptNext } from '@react-google-maps/api';
import { LoadingSpinner } from '../../index';
import LocationAutocompleteRenderer from './LocationAutocompleteRenderer';

const LOAD_SCRIPT_LIBRARIES = ['places'];

const LocationAutocomplete = props => {
    const { apiKey, language, region, additionalGoogleProps, ...rest } = props;

    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            libraries={LOAD_SCRIPT_LIBRARIES}
            {...additionalGoogleProps}
        >
            <LocationAutocompleteRenderer {...rest} />
        </LoadScriptNext>
    );
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /**
     * The language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language: PropTypes.string,
    /** Regonal setting for the map. By default Google uses US.
     * For adetails see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    ...LocationAutocompleteRenderer.propTypes,
};

LocationAutocomplete.defaultProps = {
    additionalGoogleProps: {},
    language: undefined,
    region: undefined,
    ...LocationAutocompleteRenderer.defaultProps,
};

export default LocationAutocomplete;
