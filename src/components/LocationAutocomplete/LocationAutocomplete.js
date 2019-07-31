import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useLoadScript } from '@react-google-maps/api';
import { Autosuggest } from '../Autosuggest';
// import bem from 'bem';
// import styles from './Heading.scss';
// import { HEADING_SIZES } from '../../constants';

// const { block } = bem({
//     name: 'Heading',
//     classnames: styles,
//     propsToMods: ['align', 'level'],
// });

const LOAD_SCRIPT_LIBRARIES = ['places'];

const LocationAutocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [placesList, setPlacesList] = useState([]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA61aDjG48kvpwLhP-uE0sFSuHQ_j3EIwM',
        libraries: LOAD_SCRIPT_LIBRARIES,
    });

    useEffect(() => {
        if (inputValue) {
            const service = new window.google.maps.places.AutocompleteService();
            service.getQueryPredictions(
                {
                    input: inputValue,
                },
                predictions => setPlacesList(predictions)
            );
        }
    }, [inputValue]);

    const handleInputValueChange = value => setInputValue(value);

    const handleSelectionChange = () => null;

    const getSuggestions = () => placesList;

    const suggestionToString = suggestion => (suggestion ? suggestion.description : '');

    if (loadError) return null;

    if (isLoaded) {
        return (
            <Autosuggest
                getSuggestions={getSuggestions}
                suggestionToString={suggestionToString}
                inputPlaceholder="Select something..."
                noSuggestionsPlaceholder="No suggestions found..."
                clearTitle="Clear"
                onInputValueChange={handleInputValueChange}
                onSelectionChange={handleSelectionChange}
                showClearButton
            />
        );
    }

    return null;
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.propTypes = {};

LocationAutocomplete.defaultProps = {};

export default LocationAutocomplete;
