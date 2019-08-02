import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Autosuggest } from '../../Autosuggest';
import useDebounce from '../../../hooks/useDebounce';
import { ListItem, MarkedText } from '../../../index';
import POWERED_BY_GOOGLE_ON_WHITE from '../../../images/powered_by_google_on_white.png';
import styles from '../LocationAutocomplete.scss';

const { block, elem } = bem({
    name: 'LocationAutocomplete',
    classnames: styles,
});

const PLACE_PREDICTIONS_TYPES = ['(regions)'];

const DEBOUNCE_DELAY = 350;

const LocationAutocomplete = props => {
    const [inputValue, setInputValue] = React.useState('');
    const [suggestionsList, setSuggestionsList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const { onSelectionChange } = props;

    // Suggestion functions
    const getSuggestions = () => suggestionsList;
    const resetSuggestionsList = () => setSuggestionsList([]);
    const suggestionToString = suggestion => (suggestion ? suggestion.description : '');

    const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

    React.useEffect(() => {
        if (debouncedInputValue) {
            const service = new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: debouncedInputValue,
                    types: PLACE_PREDICTIONS_TYPES,
                },
                predictions => {
                    setSuggestionsList(predictions);
                    setIsLoading(false);
                }
            );
        } else {
            resetSuggestionsList();
        }
    }, [debouncedInputValue]);

    const handleInputValueChange = value => {
        if (value) {
            setIsLoading(true);
            setInputValue(value);
        } else {
            setIsLoading(false);
            resetSuggestionsList();
        }
    };

    const renderListPoweredByGoogle = ({
        suggestions,
        listInputValue,
        getItemProps,
        highlightedIndex,
    }) =>
        suggestions.map((item, index) => (
            <ListItem
                {...block(props)}
                key={suggestionToString(item)}
                {...getItemProps({
                    item,
                    index,
                    isHighlighted: highlightedIndex === index,
                    highlightContext: 'brand',
                })}
            >
                <MarkedText marker={listInputValue} inline>
                    {suggestionToString(item)}
                </MarkedText>
                {index === suggestions.length - 1 && (
                    <img
                        {...elem('poweredByGoogleImage', props)}
                        src={POWERED_BY_GOOGLE_ON_WHITE}
                        alt="Powered by Google"
                    />
                )}
            </ListItem>
        ));

    return (
        <Autosuggest
            getSuggestions={getSuggestions}
            suggestionToString={suggestionToString}
            isLoading={isLoading}
            inputPlaceholder="Enter a city, region or postal code"
            noSuggestionsPlaceholder="No suggestions found..."
            clearTitle="Clear"
            renderList={renderListPoweredByGoogle}
            onBlur={resetSuggestionsList}
            onInputValueChange={handleInputValueChange}
            onSelectionChange={onSelectionChange}
            showClearButton
            style={{ width: '650px' }}
        />
    );
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.propTypes = {
    onSelectionChange: PropTypes.func,
};

LocationAutocomplete.defaultProps = {
    onSelectionChange: () => null,
};

export default LocationAutocomplete;
