import * as React from 'react';
import { bem } from '../../../utils';
import { SuggestionTag } from './SuggestionTag';
import { SuggestionsList } from '../SuggestionsList';
import {
    SelectBase,
    BasicSelectProps,
    SelectClearButtonProps,
    SelectInputFieldProps,
    FocusedRendererHelpers,
    BlurredRendererHelpers,
    ListRendererHelper,
} from '../SelectBase';
import styles from './Autosuggest.scss';
import { BACKSPACE_KEY, ESCAPE_KEY, ENTER_KEY } from '../../../constants';

export interface Props<S>
    extends BasicSelectProps<S>,
        SelectClearButtonProps,
        Omit<SelectInputFieldProps, 'clearInputAfterSelection'> {
    /** HTML id for the input element */
    id?: string;
    /** Creates a unique (React) key for a suggestion item. If undefined suggestionToString will be used */
    suggestionToKey?: (suggestions: S) => string;
    /** An array of already selected suggestions */
    selectedSuggestions?: S[];
    /** Number of visible tags in blur mode */
    numberOfVisibleTags?: number;
    /** String to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** String to be shown when no suggestions are available */
    noSuggestionsPlaceholder?: string;
    /** Defines if suggestions list is visible even while loading other elements */
    allowMixingSuggestionsAndLoading?: boolean;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** Function to be called when a suggestion is removed  */
    onSelectionRemove?: (item: S) => void;
    /** Function to be called on submitting form */
    onSubmit?: () => void;
    /** If suggestions are still loading, i.e. display placeholders */
    isLoading?: boolean;
    /** Means to overwrite the look and feel of the UI in its blurred state.
     * It should be null or undefined if there is no selection yet */
    customSelectionIndicator?: ReactNode;
    /** Additional HTML attributes to be applied to the input element */
    inputAttrs?: DictionaryOf<string | boolean>;
}

const { elem } = bem('Autosuggest', styles);

/**
 * The Autosuggest component is recommended to use for a dynamic list of values.
 * It is geared toward a multi-select use-case, but you can use it in single select mode too
 * or even a combination of the two. See related story for details.
 * The list of suggestions is shown once there's a value inside the input.
 *
 * More detailed face-to-face comparison of Select components can be found
 * [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)`,
 */
export function Autosuggest<S>(props: Props<S>) {
    const {
        id,
        onInputValueChange,
        onSelectionAdd,
        selectedSuggestions = [],
        suggestionToString,
        suggestionToKey,
        suggestionItemRenderer,
        inputPlaceholder,
        noSuggestionsPlaceholder,
        useOptimizeListRender,
        suggestions,
        isLoading,
        numberOfVisibleTags,
        allowMixingSuggestionsAndLoading,
        onFocus,
        onBlur,
        onSubmit,
        showClearButton,
        onSelectionRemove,
        inputRef: inputRefFromProps,
        customSelectionIndicator,
        initInputValue,
        inputAttrs,
        ...rest
    } = props;
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();
    const [inputValue, setInputValue] = React.useState('');

    const handleInputValueChange = (value: string) => {
        onInputValueChange?.(value);
        setInputValue(value);
    };

    const renderFullTagsList = () => {
        return selectedSuggestions.map((item) => (
            <SuggestionTag key={suggestionToString(item)} onClick={() => onSelectionRemove?.(item)}>
                {suggestionToString(item)}
            </SuggestionTag>
        ));
    };

    const renderShortTagsList = () => {
        const visibleTags = selectedSuggestions.slice(0, numberOfVisibleTags);
        const hiddenTags = selectedSuggestions.slice(numberOfVisibleTags);
        const numberOfHiddenTags = hiddenTags.length;
        const visibleTagsList = visibleTags.map((item) => (
            <SuggestionTag
                key={suggestionToString(item)}
                width={numberOfHiddenTags > 0 ? 'block' : 'auto'}
            >
                {suggestionToString(item)}
            </SuggestionTag>
        ));

        if (numberOfHiddenTags > 0) {
            const counter = (
                <SuggestionTag key="counter" width="small">
                    {`+${numberOfHiddenTags}`}
                </SuggestionTag>
            );
            return [...visibleTagsList, counter];
        }

        return visibleTagsList;
    };

    const handleInputKeyDown = (
        event: React.KeyboardEvent<HTMLElement>,
        highlightedIndex: number | null
    ) => {
        const isHighlighted = highlightedIndex !== null && highlightedIndex > -1;
        if (event.key === ENTER_KEY && !inputValue && !isHighlighted) {
            /**
             * Prevent the default Downshift handler behavior
             * That need for submitting form
             */
            // eslint-disable-next-line no-param-reassign, dot-notation
            event.nativeEvent['preventDownshiftDefault'] = true;
            onSubmit?.();
        } else if (event.key === ESCAPE_KEY) {
            inputRef.current?.blur();
        } else if (event.key === BACKSPACE_KEY && !inputValue && !!selectedSuggestions.length) {
            const lastItem = selectedSuggestions[selectedSuggestions.length - 1];
            onSelectionRemove?.(lastItem);
        }
    };

    // eslint-disable-next-line react/display-name
    const renderFocused: FocusedRendererHelpers<S> = ({
        getInputProps,
        onFocus: onFocusInput,
        highlightedIndex,
    }) => (
        <div {...elem('wrapper', { isFocused: true })}>
            {renderFullTagsList()}
            <input
                {...getInputProps({
                    ...inputAttrs,
                    id,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onFocus: onFocusInput,
                    onKeyDown: (e) => handleInputKeyDown(e, highlightedIndex),
                    'data-lpignore': true,
                    ...elem('input'),
                })}
            />
        </div>
    );

    // eslint-disable-next-line react/display-name
    const renderBlurred: BlurredRendererHelpers<S> = ({ getInputProps, onFocus: onFocusInput }) => {
        const selectionIndicator = customSelectionIndicator || renderShortTagsList();
        const placeholder = selectedSuggestions.length === 0 ? inputPlaceholder : '';
        const isHidden = !!customSelectionIndicator || selectedSuggestions.length > 0;

        return (
            <div {...elem('wrapper')}>
                {selectionIndicator}
                <input
                    {...getInputProps({
                        ...inputAttrs,
                        id,
                        ref: inputRef,
                        placeholder,
                        'data-lpignore': true,
                        onFocus: onFocusInput,
                        ...elem('input', { hidden: isHidden }),
                    })}
                />
            </div>
        );
    };

    const renderList: ListRendererHelper<S> = (listProps) => {
        return suggestions.length > 0 || inputValue ? (
            <SuggestionsList
                {...listProps}
                allowMixingSuggestionsAndLoading={allowMixingSuggestionsAndLoading}
                isLoading={isLoading}
                useOptimizeRender={useOptimizeListRender}
                suggestionToKey={suggestionToKey}
                suggestionItemRenderer={suggestionItemRenderer}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                passDisabledToListItems
            />
        ) : null;
    };

    const isClearButtonShown = customSelectionIndicator
        ? showClearButton
        : showClearButton && selectedSuggestions.length > 0;

    return (
        <SelectBase
            {...rest}
            suggestions={suggestions}
            suggestionToString={suggestionToString}
            inputRef={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelectionAdd={onSelectionAdd}
            onInputValueChange={handleInputValueChange}
            listRenderer={renderList}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            showClearButton={isClearButtonShown}
            highlightOnEmptyInput={false}
            keepExpandedAfterSelection
            selectOnTab
            initInputValue={initInputValue}
            clearInputAfterSelection
        />
    );
}

Autosuggest.displayName = 'Autosuggest';

Autosuggest.defaultProps = {
    id: undefined,
    numberOfVisibleTags: 3,
    selectedSuggestions: [],
    suggestionToKey: null,
    allowMixingSuggestionsAndLoading: false,
    useOptimizeListRender: false,
    onSubmit: null,
    onSelectionRemove: null,
    noSuggestionsPlaceholder: '',
    isLoading: false,
    customSelectionIndicator: undefined,
    inputAttrs: {},
};
