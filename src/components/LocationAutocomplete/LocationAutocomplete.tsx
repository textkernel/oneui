import * as React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Autosuggest } from '../SelectComponents/Autosuggest';
import { bem } from '../../utils';
import { ListItem } from '../List/ListItem';
import { MarkedText, Text } from '../Text';
import { useDebounce } from '../../hooks';
import POWERED_BY_GOOGLE_ON_WHITE from './images/powered_by_google_on_white.png';
import POWERED_BY_GOOGLE_ON_WHITE_2X from './images/powered_by_google_on_white@2x.png';
import POWERED_BY_GOOGLE_ON_WHITE_3X from './images/powered_by_google_on_white@3x.png';
import styles from './LocationAutocomplete.scss';

interface Props {
    /** input field ref */
    inputRef?: React.RefObject<HTMLInputElement>;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** default input value */
    defaultInputValue?: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** trigger of the initial focus of the input field */
    isFocused?: boolean;
    /** label for the Clear button */
    clearTooltipLabel?: string;
    /** defines if there's a single location to select in component */
    singleLocation?: boolean;
    /** callback to be called with selected value. */
    onSelectionChange: (value: google.maps.places.AutocompletePrediction) => void;
    /** restrict predictions to country/countries.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions
     */
    country?: string | string[];
    /** type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes?: string[];
    /** show state and country in suggestions list */
    showCountryInSuggestions?: boolean;
    /** function to remove all locations */
    onRemoveAllLocations?: () => void;
    /** function to be executed if error occurs while fetching suggestions */
    onError?: (error: google.maps.places.PlacesServiceStatus) => void;
    /** To hide powered by google logo. For legal reasons only set it to true if Google map is displayed on the same screen as this component! */
    hidePoweredByGoogleLogo?: boolean;
}

const { elem } = bem('LocationAutocomplete', styles);

const DEBOUNCE_DELAY = 350;
const ACCEPTABLE_API_STATUSES = ['OK', 'NOT_FOUND', 'ZERO_RESULTS'];
const PLACE_TYPES = ['(regions)'];

/**
 * ## Note about props
 * `LocationAutocompleteWithGoogleLoader` is a wrapper around the `LocationAutocomplete` component,
 * and it makes sure the Google API is loaded on the page.
 *
 * You don't need to use `LocationAutocomplete` directly.
 * `LocationAutocompleteWithGoogleLoader` __will pass props__ that are not needed for loading the API
 * __to `LocationAutocomplete`__, so you can provide them all together. For list of props see below
 */
const LocationAutocomplete: React.FC<Props> = ({
    inputRef,
    isFocused = false,
    onSelectionChange,
    defaultInputValue = '',
    inputPlaceholder,
    clearTooltipLabel = '',
    noSuggestionsPlaceholder,
    country = '',
    placeTypes = PLACE_TYPES,
    singleLocation = false,
    showCountryInSuggestions = false,
    onRemoveAllLocations,
    onError,
    hidePoweredByGoogleLogo = false,
    ...rest
}) => {
    const [storage] = React.useState({ latestInputValue: '' });
    const [suggestionsList, setSuggestionsList] = React.useState<
        google.maps.places.AutocompletePrediction[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

    // Suggestion functions
    const resetSuggestionsList = () => setSuggestionsList([]);
    const suggestionToString = (suggestion) => (suggestion ? suggestion.description : '');

    React.useEffect(
        () => {
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
                        if (debouncedInputValue !== storage.latestInputValue) {
                            return;
                        }

                        if (ACCEPTABLE_API_STATUSES.includes(status) && predictions) {
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
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [country, debouncedInputValue, onError, placeTypes, storage.latestInputValue]
    );

    if (!(window.google && window.google.maps && window.google.maps.places)) {
        // TODO: clarify with Carlo how to handle errors
        const errorMessage =
            'Google Maps Places API was not found on the page. Before using this component, make sure to load the places API';
        // eslint-disable-next-line no-console
        console.error(errorMessage);
        return (
            <Text context="danger" inline>
                Error while rendering LocationAutocomplete
            </Text>
        );
    }

    const handleInputValueChange = (value) => {
        setInputValue(value);
        if (value) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            resetSuggestionsList();

            if (singleLocation) {
                onRemoveAllLocations?.();
            }
        }
    };

    const handleSelection = (value) => {
        resetSuggestionsList();
        setInputValue(singleLocation ? value : '');
        onSelectionChange(value);
    };

    // eslint-disable-next-line react/display-name
    const renderListPoweredByGoogle = ({ listInputValue, getItemProps, highlightedIndex }) => {
        const elems = suggestionsList?.map((item, index) => (
            <ListItem
                key={suggestionToString(item)}
                {...getItemProps({
                    item,
                    index,
                    isHighlighted: highlightedIndex === index,
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
                    {...elem('poweredByGoogleImage')}
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
            suggestions={suggestionsList}
            onSelectionAdd={handleSelection}
            suggestionToString={suggestionToString}
            isLoading={isLoading}
            isFocused={isFocused}
            initInputValue={defaultInputValue}
            inputPlaceholder={inputPlaceholder}
            showClearButton={singleLocation}
            clearTitle={clearTooltipLabel}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            onInputValueChange={handleInputValueChange}
            onClearAllSelected={onRemoveAllLocations}
            iconNode={<FaMapMarkerAlt {...elem('icon')} />}
            onBlur={resetSuggestionsList}
            customListRender={renderListPoweredByGoogle}
            {...rest}
            inputRef={inputRef}
            clearInputAfterSelection={false}
        />
    );
};

LocationAutocomplete.displayName = 'LocationAutocomplete';

export { LocationAutocomplete, Props as LocationAutocompleteProps };
