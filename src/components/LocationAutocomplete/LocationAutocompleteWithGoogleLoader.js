import * as React from 'react';
import PropTypes from 'prop-types';
import { LoadScriptNext } from '@react-google-maps/api';
import LoadingSpinner from '../LoadingSpinner';
import LocationAutocomplete from './LocationAutocomplete';

// for details see: https://developers.google.com/maps/documentation/javascript/libraries
const GOOGLE_API_LIBRARIES = ['places'];

const LocationAutocompleteWithGoogleLoader = props => {
    const { apiKey, language, region, additionalGoogleProps, ...rest } = props;

    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            libraries={GOOGLE_API_LIBRARIES}
            {...additionalGoogleProps}
        >
            <LocationAutocomplete {...rest} />
        </LoadScriptNext>
    );
};

LocationAutocompleteWithGoogleLoader.displayName = 'LocationAutocompleteWithGoogleLoader';

LocationAutocompleteWithGoogleLoader.propTypes = {
    /** Google API key */
    apiKey: PropTypes.string.isRequired,
    /**
     * The language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language: PropTypes.string,
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

LocationAutocompleteWithGoogleLoader.defaultProps = {
    additionalGoogleProps: {},
    language: undefined,
    region: undefined,
};

export default LocationAutocompleteWithGoogleLoader;
