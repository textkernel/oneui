import React from 'react';
// import PropTypes from 'prop-types';
import { useLoadScript } from '@react-google-maps/api';
import { Autosuggest } from '../Autosuggest';
import useDebounce from '../../hooks/useDebounce';
// import bem from 'bem';
// import styles from './Heading.scss';
// import { HEADING_SIZES } from '../../constants';

// const { block } = bem({
//     name: 'Heading',
//     classnames: styles,
//     propsToMods: ['align', 'level'],
// });

const LOAD_SCRIPT_LIBRARIES = ['places'];
const PLACE_PREDICTIONS_TYPES = ['(regions)'];

const LocationAutocomplete = () => {
    const [inputValue, setInputValue] = React.useState('');
    const [placesList, setPlacesList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const debouncedInputValue = useDebounce(inputValue, 350);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: '',
        libraries: LOAD_SCRIPT_LIBRARIES,
    });

    React.useEffect(() => {
        if (debouncedInputValue) {
            const service = new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: debouncedInputValue,
                    types: PLACE_PREDICTIONS_TYPES,
                },
                predictions => {
                    setPlacesList(predictions);
                    setIsLoading(false);
                }
            );
        } else {
            setPlacesList([]);
        }
    }, [debouncedInputValue]);

    const handleInputValueChange = value => {
        if (value) {
            setIsLoading(true);
            setInputValue(value);
        } else {
            setIsLoading(false);
            setPlacesList([]);
        }
    };

    const handleSelectionChange = () => null;

    const getSuggestions = () => placesList;

    const suggestionToString = suggestion => (suggestion ? suggestion.description : '');

    if (loadError) return null;

    if (isLoaded) {
        return (
            <Autosuggest
                getSuggestions={getSuggestions}
                suggestionToString={suggestionToString}
                isLoading={isLoading}
                inputPlaceholder="Enter a city, region or postal code"
                noSuggestionsPlaceholder="No suggestions found..."
                clearTitle="Clear"
                onInputValueChange={handleInputValueChange}
                onSelectionChange={handleSelectionChange}
                showClearButton
                isProminent
                style={{ width: '650px' }}
            />
        );
    }

    return null;
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.propTypes = {};

LocationAutocomplete.defaultProps = {};

export default LocationAutocomplete;
