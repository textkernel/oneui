import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Autosuggest } from '../../Autosuggest';
import useDebounce from '../../../hooks/useDebounce';
import { ListItem, MarkedText } from '../../../index';
import POWERED_BY_GOOGLE_ON_WHITE from '../../../images/powered_by_google_on_white.png';
import styles from '../LocationAutocomplete.scss';

const { elem } = bem({
    name: 'LocationAutocomplete',
    classnames: styles,
});

const DEBOUNCE_DELAY = 350;

const LocationAutocomplete = props => {
    const [inputValue, setInputValue] = React.useState('');
    const [suggestionsList, setSuggestionsList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        onSelectionChange,
        inputPlaceholder,
        noSuggestionsPlaceholder,
        country,
        placeTypes,
        ...rest
    } = props;

    // Suggestion functions
    const resetSuggestionsList = () => setSuggestionsList([]);
    const suggestionToString = suggestion => (suggestion ? suggestion.description : '');

    const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

    React.useEffect(() => {
        if (debouncedInputValue) {
            const service = new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: debouncedInputValue,
                    types: placeTypes,
                    componentRestrictions: { country },
                },
                predictions => {
                    setSuggestionsList(predictions);
                    setIsLoading(false);
                }
            );
        } else {
            resetSuggestionsList();
        }
    }, [country, debouncedInputValue, placeTypes]);

    const handleInputValueChange = value => {
        if (value) {
            setIsLoading(true);
            setInputValue(value);
        } else {
            setIsLoading(false);
            resetSuggestionsList();
        }
    };

    // eslint-disable-next-line react/display-name
    const renderListPoweredByGoogle = ({ listInputValue, getItemProps, highlightedIndex }) => (
        <React.Fragment>
            <img
                {...elem('poweredByGoogleImage', props)}
                src={POWERED_BY_GOOGLE_ON_WHITE}
                alt="Powered by Google"
            />
            {suggestionsList.map((item, index) => (
                <ListItem
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
                </ListItem>
            ))}
        </React.Fragment>
    );

    return (
        <Autosuggest
            getSuggestions={suggestionsList}
            suggestionToString={suggestionToString}
            isLoading={isLoading}
            inputPlaceholder={inputPlaceholder}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            listRenderer={renderListPoweredByGoogle}
            onBlur={resetSuggestionsList}
            onInputValueChange={handleInputValueChange}
            onSelectionChange={onSelectionChange}
            {...rest}
        />
    );
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

LocationAutocomplete.propTypes = {
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: PropTypes.string.isRequired,
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /** callback to be called with selected value.
     * Value is of type [AutocompletePrediction](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction)
     */
    onSelectionChange: PropTypes.func,
    /** restrict predictions to country/countries.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions
     */
    country: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    /** type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes: PropTypes.arrayOf(PropTypes.string),
};

LocationAutocomplete.defaultProps = {
    onSelectionChange: () => null,
    country: null,
    placeTypes: ['(regions)'],
};

export default LocationAutocomplete;
