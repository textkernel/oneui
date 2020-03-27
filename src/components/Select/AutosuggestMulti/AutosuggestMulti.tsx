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
import { BACKSPACE_KEY, ESCAPE_KEY, TAB_KEY } from '../../../constants';

interface Props<S> extends CommonPropsWithClear<S> {
    /** array of already selected suggestions */
    selectedSuggestions: S[];
    /** number of visible tags in blur mode */
    numberOfVisibleTags: number;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
}

const { elem } = bem('AutosuggestMulti', styles);

export function AutosuggestMulti<S>(props: Props<S>) {
    const {
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
        ...rest
    } = props;
    const inputRef = React.createRef<HTMLInputElement>();
    const [inputValue, setInputValue] = React.useState('');

    const handleInputValueChange = (value: string) => {
        onInputValueChange(value);
        setInputValue(value);
    };

    const renderFullTagsList = () => {
        return selectedSuggestions.map((item) => (
            <SuggestionTag key={suggestionToString(item)} onClick={() => onSelectionChange(item)}>
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

    const handleInputKeyDown = (blur: () => void) => (event: KeyboardEvent) => {
        if (event.key === TAB_KEY) {
            inputRef.current?.blur();
            blur();
        } else if (event.key === ESCAPE_KEY) {
            // prevents key propagation and sets the focus on parent component
            inputRef.current?.blur();
            blur();
            inputRef.current?.parentElement?.focus();
            event.stopPropagation();
        } else if (event.key === BACKSPACE_KEY && !inputValue && !!selectedSuggestions.length) {
            const lastItem = selectedSuggestions[selectedSuggestions.length - 1];
            onSelectionChange(lastItem);
        }
    };

    // eslint-disable-next-line react/display-name
    const renderFocused: FocusedRendererHelpers<S> = ({ getInputProps, onBlur: blur }) => (
        <div {...elem('wrapper', { isFocused: true })}>
            {renderFullTagsList()}
            <input
                {...getInputProps({
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
    const renderBlurred: BlurredRendererHelpers<S> = ({ getInputProps }) => (
        <div {...elem('wrapper')}>
            {renderShortTagsList()}
            {selectedSuggestions.length === 0 && (
                <input
                    {...getInputProps({
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        'data-lpignore': true,
                        ...elem('input'),
                    })}
                />
            )}
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
            clearInputAfterSelection
        />
    );
}

AutosuggestMulti.displayName = 'AutosuggestMulti';

AutosuggestMulti.defaultProps = {
    numberOfVisibleTags: 3,
    selectedSuggestions: [],
};
