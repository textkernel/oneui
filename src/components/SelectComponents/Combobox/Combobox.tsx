import * as React from 'react';
import { bem } from '../../../utils/bem/bem';
import {
    SelectBase,
    BasicSelectProps,
    SelectClearButtonProps,
    SelectInputFieldProps,
} from '../SelectBase';
import { Text } from '../../Text';
import { SuggestionsList } from '../SuggestionsList';
import { ESCAPE_KEY } from '../../../constants';
import styles from './Combobox.scss';

const { elem } = bem('Combobox', styles);

export interface Props<S>
    extends BasicSelectProps<S>,
        SelectClearButtonProps,
        SelectInputFieldProps {
    /** The item that is currently selected */
    selectedSuggestion?: S;
    /** The value if the input field when focused.
     * If undefined, falls back to selectedSuggestion, and lastly to the placeholder. */
    inputValue?: string;
    /** to be shown in the input field when no value is typed or selected */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** Additional HTML attributes to be applied to the input element */
    inputAttrs?: DictionaryOf<string | boolean>;
}

/**
 * ## Usage information
 * This component is recommended to use when there's a static known list of values.
 * The user can filter the list through the input field. The list is shown right away
 * by clicking on the control. The selected option is shown in the component itself.
 *
 * More detailed face-to-face comparison of Select components can be found
 * [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)
 */
export function Combobox<S>({
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
    inputValue,
    inputPlaceholder,
    inputAttrs = {},
    selectedSuggestion,
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
                        value: inputValue || suggestionToString(selectedSuggestion),
                        onKeyDown: handleInputKeyDown,
                        'data-lpignore': true,
                        ...elem('input', { disabled }),
                    })}
                />
            </div>
        );
    };

    // eslint-disable-next-line react/display-name
    const renderBlurred = ({ getInputProps, getToggleButtonProps, onFocus }) => (
        <div
            tabIndex={0}
            role="searchbox"
            {...getInputProps({ onClick: focus })}
            {...elem('wrapper', { disabled })}
        >
            <span {...elem('selection')}>
                {selectedSuggestion ? (
                    suggestionToString(selectedSuggestion)
                ) : (
                    <Text inline {...elem('placeholder')} context="muted">
                        {inputPlaceholder}
                    </Text>
                )}
            </span>
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
                    // useOptimizeRender={useOptimizeListRender}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    suggestionItemRenderer={suggestionItemRenderer}
                    passDisabledToListItems
                />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            selectOnTab
            showArrow
        />
    );
}

Combobox.displayName = 'Combobox';
