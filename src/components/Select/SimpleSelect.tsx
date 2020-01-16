/* eslint-disable react/display-name */
import * as React from 'react';
import { IoIosArrowUp, IoIosArrowDown, IoIosClose } from 'react-icons/io';
import bem from '../../utils/bem';
import SelectBase, { Props as SelectBaseProps } from './SelectBase';
import SuggestionsList from './SuggestionsList';
import styles from './SimpleSelect.scss';
import { ESCAPE_KEY, TAB_KEY } from '../../constants';

interface Props<S>
    extends Omit<
        Omit<Omit<SelectBaseProps<S>, 'listRenderer'>, 'focusedRenderer'>,
        'blurredRenderer'
    > {
    selectedSuggestion?: S | null;
    inputPlaceholder: string;
}

const { elem } = bem('SimpleSelect', styles);

function SimpleSelect<S>(props: Props<S>) {
    const {
        onSelectionChange,
        inputRef: inputRefFromProps,
        suggestions,
        suggestionToString,
        selectedSuggestion,
        showClearButton,
        noSuggestionsPlaceholder,
        onBlur,
        onInputValueChange,
        onClearAllSelected,
        inputPlaceholder,
        ...rest
    } = props;
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();

    const renderFocused = ({ getInputProps, getToggleButtonProps, onBlur: blur, inputValue }) => {
        const handleInputKeyDown = event => {
            if (event.key === TAB_KEY) {
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

        const showSelection = !!selectedSuggestion && !inputValue;

        return (
            <div tabIndex="0" role="searchbox" {...elem('wrapper', props)}>
                <input
                    {...getInputProps({
                        ref: inputRef,
                        placeholder: showSelection ? '' : inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        ...elem('input', { ...props, showSelection }),
                    })}
                />
                {showSelection && <span>{suggestionToString(selectedSuggestion)}</span>}
                <div {...elem('buttons', props)}>
                    <IoIosArrowUp {...getToggleButtonProps()} />
                </div>
            </div>
        );
    };

    const renderBlurred = ({ getInputProps, getToggleButtonProps }) => (
        <div tabIndex="0" role="searchbox" {...elem('wrapper', props)}>
            {selectedSuggestion ? (
                <span>{suggestionToString(selectedSuggestion)}</span>
            ) : (
                <input
                    {...getInputProps({
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        ...elem('input', props),
                    })}
                />
            )}
            <div {...elem('buttons', props)}>
                {selectedSuggestion && (
                    <IoIosClose
                        onClick={e => {
                            e?.stopPropagation();
                            onClearAllSelected?.();
                        }}
                    />
                )}
                <IoIosArrowDown
                    {...getToggleButtonProps({
                        onClick: e => {
                            e?.stopPropagation();
                        },
                    })}
                />
            </div>
        </div>
    );

    return (
        <SelectBase
            {...rest}
            suggestions={suggestions}
            suggestionToString={suggestionToString}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            inputRef={inputRef}
            onBlur={onBlur}
            onSelectionChange={onSelectionChange}
            onInputValueChange={onInputValueChange}
            onClearAllSelected={onClearAllSelected}
            listRenderer={listProps => <SuggestionsList {...listProps} />}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
        />
    );
}

SimpleSelect.defaultProps = {
    showClearButton: false,
};

SimpleSelect.displayName = 'AutosuggestMulti';

export default SimpleSelect;
