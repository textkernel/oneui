import React from 'react';
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
    const [inputValue, setInputValue] = React.useState('');
    const [placesList, setPlacesList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: '',
        libraries: LOAD_SCRIPT_LIBRARIES,
    });

    React.useEffect(() => {
        if (inputValue) {
            console.log(1);
            const service = new window.google.maps.places.AutocompleteService();

            console.log(2);
            service.getPlacePredictions(
                {
                    input: inputValue,
                    types: ['(regions)'],
                },
                predictions => setPlacesList(predictions)
            );
            setIsLoading(false);

            console.log(3);
        } else {
            setPlacesList([]);
        }
    }, [inputValue]);

    const handleInputValueChange = value => {
        setInputValue(value);
        setIsLoading(true);
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
                inputPlaceholder="Select something..."
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
