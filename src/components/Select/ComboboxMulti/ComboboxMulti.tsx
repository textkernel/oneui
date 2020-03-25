import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { SelectBase, CommonProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './ComboboxMulti.scss';
import { ESCAPE_KEY, TAB_KEY } from '../../../constants';

const { elem } = bem('ComboboxMulti', styles);

interface Props<S> extends CommonProps<S> {
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
}

export function ComboboxMulti<S>(props: Props<S>) {
    const {
        onSelectionChange,
        inputRef: inputRefFromProps,
        suggestions,
        suggestionToString,
        noSuggestionsPlaceholder,
        onBlur,
        onInputValueChange,
        inputPlaceholder,
        useOptimizeListRender,
        ...rest
    } = props;
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();

    // eslint-disable-next-line react/display-name
    const renderFocused = ({ getInputProps, getToggleButtonProps, onBlur: blur }) => {
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

        return (
            <div tabIndex={0} role="searchbox" {...elem('wrapper', { ...props })}>
                <input
                    {...getInputProps({
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        'data-lpignore': true,
                        ...elem('input', { ...props }),
                    })}
                />
                <IoMdArrowDropup
                    {...elem('dropdownIcon', { ...props })}
                    {...getToggleButtonProps({ onClick: blur })}
                />
            </div>
        );
    };

    // eslint-disable-next-line react/display-name
    const renderBlurred = ({ getInputProps, getToggleButtonProps }) => (
        <div tabIndex={0} role="searchbox" {...elem('wrapper', { ...props })}>
            <input
                {...getInputProps({
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    'data-lpignore': true,
                    ...elem('input', { ...props }),
                })}
            />
            <IoMdArrowDropdown
                {...elem('dropdownIcon', { ...props })}
                {...getToggleButtonProps({
                    onClick: e => {
                        e?.stopPropagation();
                    },
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
            onInputValueChange={onInputValueChange}
            listRenderer={listProps => (
                <SuggestionsList
                    {...listProps}
                    useOptimizeRender={useOptimizeListRender}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            keepExpandedAfterSelection
        />
    );
}

ComboboxMulti.defaultProps = {
    showClearButton: false,
    useOptimizeListRender: false,
};

ComboboxMulti.displayName = 'ComboboxMulti';
