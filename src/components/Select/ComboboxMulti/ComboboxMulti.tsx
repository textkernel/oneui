import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { SelectBase, BasicSelectProps, WithInputFieldProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './ComboboxMulti.scss';
import { ESCAPE_KEY } from '../../../constants';

const { elem } = bem('ComboboxMulti', styles);

interface Props<S> extends BasicSelectProps<S>, WithInputFieldProps {
    /** define id for input element */
    id?: string;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** Enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
}

export function ComboboxMulti<S>(props: Props<S>) {
    const {
        id,
        onSelectionAdd,
        inputRef: inputRefFromProps,
        suggestions,
        suggestionToString,
        suggestionItemRenderer,
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
        const handleInputKeyDown = (event) => {
            if (event.key === ESCAPE_KEY) {
                inputRef.current?.blur();
            }
        };

        return (
            <div tabIndex={0} role="searchbox" {...elem('wrapper', { ...props })}>
                <input
                    {...getInputProps({
                        id,
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
    const renderBlurred = ({ getInputProps, getToggleButtonProps, onFocus }) => (
        <div tabIndex={0} role="searchbox" {...elem('wrapper', { ...props })}>
            <input
                {...getInputProps({
                    id,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onFocus,
                    'data-lpignore': true,
                    ...elem('input', { ...props }),
                })}
            />
            <IoMdArrowDropdown
                {...elem('dropdownIcon', { ...props })}
                {...getToggleButtonProps({
                    onClick: (e) => {
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
            onSelectionAdd={onSelectionAdd}
            onInputValueChange={onInputValueChange}
            listRenderer={(listProps) => (
                <SuggestionsList
                    {...listProps}
                    isLoading={false}
                    useOptimizeRender={useOptimizeListRender}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    suggestionItemRenderer={suggestionItemRenderer}
                />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            keepExpandedAfterSelection
        />
    );
}

ComboboxMulti.defaultProps = {
    useOptimizeListRender: false,
    id: undefined,
};

ComboboxMulti.displayName = 'ComboboxMulti';
