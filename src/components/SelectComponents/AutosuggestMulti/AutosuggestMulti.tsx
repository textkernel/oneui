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
import styles from './AutosuggestMulti.scss';
import { BACKSPACE_KEY, ESCAPE_KEY, ENTER_KEY } from '../../../constants';

interface Props<S>
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
    /** Defines if the first item of suggestions list is visible even while loading other elements */
    isFirstItemAlwaysVisible?: boolean;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** Function to be called when a suggestion is removed  */
    onSelectionRemove?: (item: S) => void;
    /** Function to be called on submitting form */
    onSubmit?: () => void;
    /** if suggestions are still loading, i.e. display placeholders */
    isLoading?: boolean;
}

const { elem } = bem('AutosuggestMulti', styles);

export function AutosuggestMulti<S>(props: Props<S>) {
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
        isFirstItemAlwaysVisible,
        onFocus,
        onBlur,
        onSubmit,
        disabled,
        showClearButton,
        onSelectionRemove,
        ...rest
    } = props;
    const inputRef = React.createRef<HTMLInputElement>();
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
        <div {...elem('wrapper', { disabled, isFocused: true })}>
            {renderFullTagsList()}
            <input
                {...getInputProps({
                    id,
                    disabled,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onFocus: onFocusInput,
                    onKeyDown: (e) => handleInputKeyDown(e, highlightedIndex),
                    'data-lpignore': true,
                    ...elem('input', { disabled }),
                })}
            />
        </div>
    );

    // eslint-disable-next-line react/display-name
    const renderBlurred: BlurredRendererHelpers<S> = ({ getInputProps, onFocus: onFocusInput }) => (
        <div {...elem('wrapper', { disabled })}>
            {renderShortTagsList()}
            <input
                {...getInputProps({
                    id,
                    disabled,
                    ref: inputRef,
                    placeholder: selectedSuggestions.length === 0 ? inputPlaceholder : '',
                    'data-lpignore': true,
                    onFocus: onFocusInput,
                    ...elem('input', { disabled, hidden: selectedSuggestions.length > 0 }),
                })}
            />
        </div>
    );

    const renderList: ListRendererHelper<S> = (listProps) => {
        const { inputValue: inputToList } = listProps;

        return inputToList ? (
            <SuggestionsList
                {...listProps}
                isFirstItemAlwaysVisible={isFirstItemAlwaysVisible}
                isLoading={isLoading}
                useOptimizeRender={useOptimizeListRender}
                suggestionToKey={suggestionToKey}
                suggestionItemRenderer={suggestionItemRenderer}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            />
        ) : null;
    };

    return (
        <SelectBase
            {...rest}
            suggestions={suggestions}
            suggestionToString={suggestionToString}
            inputRef={inputRef}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelectionAdd={onSelectionAdd}
            onInputValueChange={handleInputValueChange}
            listRenderer={renderList}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            showClearButton={showClearButton && selectedSuggestions.length > 0}
            highlightOnEmptyInput={false}
            keepExpandedAfterSelection
            selectOnTab
            clearInputAfterSelection
        />
    );
}

AutosuggestMulti.displayName = 'AutosuggestMulti';

AutosuggestMulti.defaultProps = {
    id: undefined,
    numberOfVisibleTags: 3,
    selectedSuggestions: [],
    suggestionToKey: null,
    isFirstItemAlwaysVisible: false,
    useOptimizeListRender: false,
    onSubmit: null,
    onSelectionRemove: null,
    noSuggestionsPlaceholder: '',
    isLoading: false,
};
