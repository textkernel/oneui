/* eslint-disable react/display-name */
import * as React from 'react';
import bem from '../../utils/bem';
import ItemTag from '../Autosuggest/ItemTag';
import SelectBase, { Props as SelectBaseProps } from './SelectBase';
import SuggestionsListWithLoading from './SuggestionsListWithLoading';
import styles from './SelectBase.scss';
import { BACKSPACE_KEY, ESCAPE_KEY, TAB_KEY } from '../../constants';

interface Props<S>
    extends Omit<
        Omit<Omit<SelectBaseProps<S>, 'listRenderer'>, 'focusedRenderer'>,
        'blurredRenderer'
    > {
    isLoading: boolean;
    selectedPlaceholder: string;
    selectedSuggestions: S[];
    isProminent?: boolean;
    inputPlaceholder: string;
}

const { elem } = bem('SelectBase', styles);

function AutosuggestMulti<S>(props: Props<S>) {
    const {
        onSelectionChange,
        inputRef: inputRefFromProps,
        selectedPlaceholder,
        suggestions,
        suggestionToString,
        selectedSuggestions,
        showClearButton,
        noSuggestionsPlaceholder,
        clearTitle,
        onBlur,
        onInputValueChange,
        onClearAllSelected,
        isProminent,
        isLoading,
        inputPlaceholder,
        ...rest
    } = props;
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();

    const handleTagDeleteClick = item => {
        return e => {
            e.stopPropagation();
            onSelectionChange(item);
            inputRef.current?.focus();
        };
    };

    const renderFocused = ({ getInputProps, onBlur: blur }) => {
        const handleInputKeyDown = event => {
            if (
                event.key === BACKSPACE_KEY &&
                !event.target.value &&
                selectedSuggestions &&
                !!selectedSuggestions.length
            ) {
                // remove the last input
                onSelectionChange(selectedSuggestions[selectedSuggestions.length - 1]);
            } else if (event.key === TAB_KEY) {
                inputRef.current?.blur();
                blur();
            } else if (event.key === ESCAPE_KEY) {
                // prevents key propagation and sets the focus on parent component
                inputRef.current?.blur();
                blur();
                inputRef.current?.parentElement?.focus();
                event.stopPropagation();
            }
        };

        return (
            <div tabIndex="0" role="searchbox" {...elem('wrapper', props)}>
                {selectedSuggestions &&
                    !!selectedSuggestions.length &&
                    selectedSuggestions.map(item => (
                        <ItemTag
                            key={suggestionToString(item)}
                            onClick={handleTagDeleteClick(item)}
                        >
                            {suggestionToString(item)}
                        </ItemTag>
                    ))}
                <input
                    {...getInputProps({
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        ...elem('input', props),
                    })}
                />
            </div>
        );
    };

    const renderBlurred = ({ getInputProps }) => (
        <div tabIndex="0" role="searchbox" {...elem('wrapper', props)}>
            {selectedPlaceholder && <div {...elem('spacedElem', props)}>{selectedPlaceholder}</div>}
            <input
                {...getInputProps({
                    ref: inputRef,
                    placeholder: selectedPlaceholder ? '' : inputPlaceholder,
                    ...elem('input', props),
                })}
            />
        </div>
    );

    const doShowClearButton =
        showClearButton && !!selectedSuggestions && !!selectedSuggestions.length;

    return (
        <SelectBase
            {...rest}
            suggestions={suggestions}
            suggestionToString={suggestionToString}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            clearTitle={clearTitle}
            inputRef={inputRef}
            onBlur={onBlur}
            onSelectionChange={onSelectionChange}
            onInputValueChange={onInputValueChange}
            onClearAllSelected={onClearAllSelected}
            showClearButton={doShowClearButton}
            keepExpandedAfterSelection
            listRenderer={listProps => (
                <SuggestionsListWithLoading {...listProps} isLoading={isLoading} />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
        />
    );
}

AutosuggestMulti.defaultProps = {
    isLoading: false,
    showClearButton: false,
    selectedPlaceholder: '',
    isProminent: false,
    clearTitle: '',
};

AutosuggestMulti.displayName = 'AutosuggestMulti';

export default AutosuggestMulti;
