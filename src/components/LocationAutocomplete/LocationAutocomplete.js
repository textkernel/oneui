import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Autosuggest, Alert, ListItem, MarkedText } from '../../index';
import useDebounce from '../../hooks/useDebounce';
import POWERED_BY_GOOGLE_ON_WHITE from './images/powered_by_google_on_white.png';
import POWERED_BY_GOOGLE_ON_WHITE_2X from './images/powered_by_google_on_white@2x.png';
import POWERED_BY_GOOGLE_ON_WHITE_3X from './images/powered_by_google_on_white@3x.png';
import styles from './LocationAutocomplete.scss';

const { elem } = bem({
    name: 'LocationAutocomplete',
    classnames: styles,
});

const DEBOUNCE_DELAY = 350;
const ACCEPTABLE_API_STATUSES = ['OK', 'NOT_FOUND', 'ZERO_RESULTS'];

const LocationAutocomplete = props => {
    const [storage] = React.useState({ latestInputValue: '' });
    const [suggestionsList, setSuggestionsList] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

    const {
        isFocused,
        onSelectionChange,
        inputPlaceholder,
        noSuggestionsPlaceholder,
        country,
        placeTypes,
        showCountryInSuggestions,
        onError,
        hidePoweredByGoogleLogo,
        ...rest
    } = props;

    // Suggestion functions
    const resetSuggestionsList = () => setSuggestionsList(null);
    const suggestionToString = suggestion => (suggestion ? suggestion.description : '');

    React.useEffect(() => {
        if (debouncedInputValue) {
            // Putting latest debounced input value to the storage
            storage.latestInputValue = debouncedInputValue;

            const service = new window.google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: debouncedInputValue,
                    types: placeTypes,
                    componentRestrictions: { country },
                },
                (predictions, status) => {
                    // if this function was called with outdated input value, return early
                    if (debouncedInputValue !== storage.latestInputValue) return;

                    if (ACCEPTABLE_API_STATUSES.includes(status)) {
                        setSuggestionsList(predictions);
                    } else {
                        // TODO: check desired behaviour with Carlo
                        // currently the UI will look same as when no suggestions found
                        resetSuggestionsList();
                        if (onError) {
                            onError(status);
                        }
                    }
                    setIsLoading(false);
                }
            );
        } else {
            resetSuggestionsList();
        }
    }, [country, debouncedInputValue, onError, placeTypes, storage.latestInputValue]);

    if (!(window.google && window.google.maps && window.google.maps.places)) {
        // TODO: clarify with Carlo how to handle errors
        return (
            <Alert context="bad" title="No API found">
                Google Maps Places APi was not found on the page. Before using this component, make
                sure to load the places API
            </Alert>
        );
    }

    const handleInputValueChange = value => {
        setInputValue(value);
        if (value) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            resetSuggestionsList();
        }
    };

    const handleSelection = value => {
        resetSuggestionsList();
        setInputValue('');
        onSelectionChange(value);
    };

    // eslint-disable-next-line react/display-name
    const renderListPoweredByGoogle = ({ listInputValue, getItemProps, highlightedIndex }) => {
        const elems = suggestionsList.map((item, index) => (
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
                    {showCountryInSuggestions
                        ? suggestionToString(item)
                        : item.structured_formatting.main_text}
                </MarkedText>
            </ListItem>
        ));

        if (!hidePoweredByGoogleLogo) {
            elems.unshift(
                <img
                    key="powered by google logo"
                    {...elem('poweredByGoogleImage', props)}
                    src={POWERED_BY_GOOGLE_ON_WHITE}
                    srcSet={`${POWERED_BY_GOOGLE_ON_WHITE}, ${POWERED_BY_GOOGLE_ON_WHITE_2X} 2x, ${POWERED_BY_GOOGLE_ON_WHITE_3X} 3x`}
                    alt="Powered by Google"
                    data-list-exception
                />
            );
        }

        return elems;
    };

    return (
        <Autosuggest
            getSuggestions={suggestionsList}
            suggestionToString={suggestionToString}
            isLoading={isLoading}
            isFocused={isFocused}
            inputPlaceholder={inputPlaceholder}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            listRenderer={renderListPoweredByGoogle}
            onBlur={resetSuggestionsList}
            onInputValueChange={handleInputValueChange}
            onSelectionChange={handleSelection}
            iconNode={<FaMapMarkerAlt {...elem('icon', props)} />}
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
    /** trigger of the initial focus of the input field */
    isFocused: PropTypes.bool,
    /** callback to be called with selected value.
     * Value is of type AutocompletePrediction: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction
     */
    onSelectionChange: PropTypes.func.isRequired,
    /** restrict predictions to country/countries.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions
     */
    country: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    /** type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes: PropTypes.arrayOf(PropTypes.string),
    /** show state and country in suggestions list */
    showCountryInSuggestions: PropTypes.bool,
    /** function to be executed if error occurs while fetching suggestions */
    onError: PropTypes.func,
    /** To hide powered by google logo. For legal reasons only set it to true if Google map is displayed on the same screen as this component! */
    hidePoweredByGoogleLogo: PropTypes.bool,
};

LocationAutocomplete.defaultProps = {
    country: null,
    placeTypes: ['(regions)'],
    isFocused: false,
    showCountryInSuggestions: false,
    onError: null,
    hidePoweredByGoogleLogo: false,
};

export default LocationAutocomplete;
