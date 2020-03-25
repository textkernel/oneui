import * as React from 'react';
import { bem } from '../../../utils';
import { SuggestionTag } from './SuggestionTag';
import { SuggestionsList } from '../SuggestionsList';
import {
    SelectBase,
    CommonProps,
    FocusedRendererHelpers,
    BlurredRendererHelpers,
} from '../SelectBase';
import styles from './AutosuggestMulti.scss';
import { BACKSPACE_KEY, ESCAPE_KEY, TAB_KEY } from '../../../constants';

interface Props<S> extends CommonProps<S> {
    /** array of already selected suggestions */
    selectedSuggestions: S[];
    /** number of shown tags in blur mode */
    numberOfShownTags?: number;
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
        numberOfShownTags = 3,
        onBlur,
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
        const shownTags = selectedSuggestions.slice(0, numberOfShownTags);
        const hiddenTags = selectedSuggestions.slice(numberOfShownTags);
        const numberOfHiddenTags = hiddenTags.length;
        const shownTagsList = shownTags.map((item) => (
            <SuggestionTag isStretched={numberOfHiddenTags > 0} key={suggestionToString(item)}>
                {suggestionToString(item)}
            </SuggestionTag>
        ));

        if (numberOfHiddenTags > 0) {
            const counter = (
                <SuggestionTag key="counter" isBounded>{`+${numberOfHiddenTags}`}</SuggestionTag>
            );
            return [...shownTagsList, counter];
        }

        return shownTagsList;
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
        } else if (
            event.key === BACKSPACE_KEY &&
            !inputValue &&
            selectedSuggestions &&
            !!selectedSuggestions.length
        ) {
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
            keepExpandedAfterSelection
            clearInputAfterSelection
        />
    );
}

AutosuggestMulti.displayName = 'AutosuggestMulti';
