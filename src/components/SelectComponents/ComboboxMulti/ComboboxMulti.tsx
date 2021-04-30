import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { SelectBase, BasicSelectProps, SelectInputFieldProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './ComboboxMulti.scss';
import { ESCAPE_KEY } from '../../../constants';

const { elem } = bem('ComboboxMulti', styles);

interface Props<S> extends BasicSelectProps<S>, SelectInputFieldProps {
    /** define id for input element */
    id?: string;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** Additional HTML attributes to be applied to the input element */
    inputAttr?: DictionaryOf<string | boolean>;
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
        disabled,
        inputPlaceholder,
        useOptimizeListRender,
        inputAttr,
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
                        disabled,
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        'data-lpignore': true,
                        ...inputAttr,
                        ...elem('input', { ...props }),
                    })}
                />
                <IoMdArrowDropup
                    {...elem('dropdownIcon', { ...props })}
                    {...getToggleButtonProps({ disabled, onClick: blur })}
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
                    disabled,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onFocus,
                    'data-lpignore': true,
                    ...inputAttr,
                    ...elem('input', { ...props }),
                })}
            />
            <IoMdArrowDropdown
                {...elem('dropdownIcon', { ...props })}
                {...getToggleButtonProps({
                    disabled,
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
            disabled={disabled}
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
    inputAttr: {},
};

ComboboxMulti.displayName = 'ComboboxMulti';
