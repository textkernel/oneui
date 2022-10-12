import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../../utils/bem/bem';
import { SelectBase, BasicSelectProps, SelectInputFieldProps } from '../SelectBase';
import { SuggestionsList } from '../SuggestionsList';
import styles from './ComboboxMulti.scss';
import { ESCAPE_KEY } from '../../../constants';

const { elem } = bem('ComboboxMulti', styles);

export interface Props<S> extends BasicSelectProps<S>, SelectInputFieldProps {
    /** define id for input element */
    id?: string;
    /** to be shown in the input field when no value is typed */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** Additional HTML attributes to be applied to the input element */
    inputAttrs?: DictionaryOf<string | boolean>;
}

/**
 * ## Usage information
 * This component is recommended to use when there's a static known list of values.
 * The user can filter the list through the input field. The list is shown right away
 * by clicking on the control. Selected options are not rendered by the component itself.
 * The application using this component should rendered them separately,
 * e.g. above this component using SelectedOption.
 *
 * More detailed face-to-face comparison of Select components can be found
 * [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)
 */
export function ComboboxMulti<S>({
    id = undefined,
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
    useOptimizeListRender = false,
    inputAttrs = {},
    ...rest
}: Props<S>) {
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();

    // eslint-disable-next-line react/display-name
    const renderFocused = ({ getInputProps, getToggleButtonProps, onBlur: blur }) => {
        const handleInputKeyDown = (event) => {
            if (event.key === ESCAPE_KEY) {
                inputRef.current?.blur();
            }
        };

        return (
            <div tabIndex={0} role="searchbox" {...elem('wrapper', { disabled })}>
                <input
                    {...getInputProps({
                        ...inputAttrs,
                        id,
                        disabled,
                        ref: inputRef,
                        placeholder: inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        'data-lpignore': true,
                        ...elem('input', { disabled }),
                    })}
                />
                <IoMdArrowDropup
                    {...elem('dropdownIcon', { disabled })}
                    {...getToggleButtonProps({ disabled, onClick: blur })}
                />
            </div>
        );
    };

    // eslint-disable-next-line react/display-name
    const renderBlurred = ({ getInputProps, getToggleButtonProps, onFocus }) => (
        <div tabIndex={0} role="searchbox" {...elem('wrapper', { disabled })}>
            <input
                {...getInputProps({
                    ...inputAttrs,
                    id,
                    disabled,
                    ref: inputRef,
                    placeholder: inputPlaceholder,
                    onFocus,
                    'data-lpignore': true,
                    ...elem('input', { disabled }),
                })}
            />
            <IoMdArrowDropdown
                {...elem('dropdownIcon', { disabled })}
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
                    passDisabledToListItems
                />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            keepExpandedAfterSelection
        />
    );
}

ComboboxMulti.displayName = 'ComboboxMulti';
