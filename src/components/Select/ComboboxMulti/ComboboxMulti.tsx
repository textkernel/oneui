import * as React from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { Props as SelectBaseProps, SelectBase } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './ComboboxMulti.scss';
import { ESCAPE_KEY, TAB_KEY } from '../../../constants';

interface Props<S>
    extends Omit<
        Omit<Omit<SelectBaseProps<S>, 'listRenderer'>, 'focusedRenderer'>,
        'blurredRenderer'
    > {
    inputPlaceholder: string;
}

const { elem } = bem('ComboboxMulti', styles);

export function ComboboxMulti<S>(props: Props<S>) {
    const {
        onSelectionChange,
        inputRef: inputRefFromProps,
        suggestions,
        suggestionToString,
        showClearButton,
        noSuggestionsPlaceholder,
        onBlur,
        onInputValueChange,
        inputPlaceholder,
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
                        ...elem('input', { ...props }),
                    })}
                />
                <IoIosArrowUp {...getToggleButtonProps()} />
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
                    ...elem('input', { ...props }),
                })}
            />
            <IoIosArrowDown
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
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            inputRef={inputRef}
            onBlur={onBlur}
            onSelectionChange={onSelectionChange}
            onInputValueChange={onInputValueChange}
            listRenderer={listProps => <SuggestionsList {...listProps} />}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            keepExpandedAfterSelection
        />
    );
}

ComboboxMulti.defaultProps = {
    showClearButton: false,
};

ComboboxMulti.displayName = 'ComboboxMulti';
