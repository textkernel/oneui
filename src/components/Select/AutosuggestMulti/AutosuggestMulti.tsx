import * as React from 'react';
import { bem } from '../../../utils';
import { SuggestionTag } from './SuggestionTag';
import { SuggestionsList } from '../SuggestionsList';
import {
    SelectBase,
    CommonPropsWithClear,
    FocusedRendererHelpers,
    BlurredRendererHelpers,
} from '../SelectBase';
import styles from './AutosuggestMulti.scss';
import { BACKSPACE_KEY, ESCAPE_KEY, TAB_KEY, ENTER_KEY } from '../../../constants';

interface Props<S> extends CommonPropsWithClear<S> {
    /** define id for input element */
    id?: string;
    /** array of already selected suggestions */
    selectedSuggestions: S[];
    /** number of visible tags in blur mode */
    numberOfVisibleTags: number;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** onSelectionChange() called when a suggestion is removed  */
    onSelectionRemove: (item: S) => void;
}

const { elem } = bem('AutosuggestMulti', styles);

export function AutosuggestMulti<S>(props: Props<S>) {
    const {
        id,
        onInputValueChange,
        onSelectionChange,
        selectedSuggestions,
        suggestionToString,
        inputPlaceholder,
        useOptimizeListRender,
        suggestions,
        numberOfVisibleTags,
        onBlur,
        showClearButton,
        onSelectionRemove,
        ...rest
    } = props;
    const inputRef = React.createRef<HTMLInputElement>();
    const [inputValue, setInputValue] = React.useState('');
    const [selectOnBlur, setSelectOnBlur] = React.useState(false);

    const handleInputValueChange = (value: string) => {
        onInputValueChange(value);
        setInputValue(value);
    };

    const renderFullTagsList = () => {
        return selectedSuggestions.map((item) => (
            <SuggestionTag key={suggestionToString(item)} onClick={() => onSelectionRemove(item)}>
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

    const handleInputKeyDown = (blur: () => void) => (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === TAB_KEY) {
            setSelectOnBlur(true);
            blur();
        } else if (event.key === ENTER_KEY && !inputValue) {
            /**
             * Prevent the default Downshift handler behavior
             * That need for submitting form
             */
            // eslint-disable-next-line no-param-reassign, dot-notation
            event.nativeEvent['preventDownshiftDefault'] = true;
        } else if (event.key === ESCAPE_KEY) {
            setSelectOnBlur(false);
            inputRef.current?.blur();
            blur();
        } else if (event.key === BACKSPACE_KEY && !inputValue && !!selectedSuggestions.length) {
            const lastItem = selectedSuggestions[selectedSuggestions.length - 1];
            onSelectionRemove(lastItem);
        }
    };

    // eslint-disable-next-line react/display-name
    const renderFocused: FocusedRendererHelpers<S> = ({ getInputProps, onBlur: blur }) => (
        <div {...elem('wrapper', { isFocused: true })}>
            {renderFullTagsList()}
            <input
                {...getInputProps({
                    id,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onKeyDown: handleInputKeyDown(blur),
                    'data-lpignore': true,
                    ...elem('input'),
                })}
            />
        </div>
    );

    // eslint-disable-next-line react/display-name
    const renderBlurred: BlurredRendererHelpers<S> = ({ getInputProps, onFocus }) => (
        <div {...elem('wrapper')}>
            {renderShortTagsList()}
            <input
                {...getInputProps({
                    id,
                    ref: inputRef,
                    placeholder: selectedSuggestions.length === 0 ? inputPlaceholder : '',
                    'data-lpignore': true,
                    onFocus,
                    ...elem('input', { hidden: selectedSuggestions.length > 0 }),
                })}
            />
        </div>
    );

    return (
        <SelectBase
            {...rest}
            suggestions={suggestions}
            suggestionToString={suggestionToString}
            inputRef={inputRef}
            onBlur={onBlur}
            onSelectionChange={onSelectionChange}
            onInputValueChange={handleInputValueChange}
            listRenderer={(listProps) => (
                <SuggestionsList {...listProps} useOptimizeRender={useOptimizeListRender} />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            showClearButton={showClearButton && selectedSuggestions.length > 0}
            keepExpandedAfterSelection
            selectOnBlur={selectOnBlur}
            clearInputAfterSelection
        />
    );
}

AutosuggestMulti.displayName = 'AutosuggestMulti';

AutosuggestMulti.defaultProps = {
    numberOfVisibleTags: 3,
    selectedSuggestions: [],
};
