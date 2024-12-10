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
import { DictionaryOf } from '../../../customTypes/types';

const { elem } = bem('Combobox', styles);

export interface Props<S>
    extends BasicSelectProps<S>,
        SelectClearButtonProps,
        SelectInputFieldProps {
    /** The item that is currently selected, will be used as placeholder in the input field */
    selectedSuggestion?: S;
    /** to be shown in the input field when no value is typed or selected */
    inputPlaceholder: string;
    /** to be shown when no suggestions are available */
    noSuggestionsPlaceholder: string;
    /** Additional HTML attributes to be applied to the input element */
    inputAttrs?: DictionaryOf<string | boolean>;
    /** Down arrow name for ARIA labelling, it is used when the component isn't focused */
    downArrowLabel?: string;
    /** Up arrow name for ARIA labelling, it is used when the component is focused and options are shown */
    upArrowLabel?: string;
    /** enable ListOptimizer component for decreasing render time */
    useOptimizeListRender?: boolean;
    /** determines if the suggestion list should be rendered using a React Portal
     *  to the dropdown needs to bypass parent element clipping, overflow, or z-index issues.
     */
    shouldRenderWithPortal?: boolean;
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
    id,
    onSelectionAdd,
    inputRef: inputRefFromProps,
    suggestions,
    suggestionToString,
    suggestionItemRenderer,
    noSuggestionsPlaceholder,
    onBlur,
    onInputValueChange,
    onOuterClick,
    disabled,
    inputPlaceholder,
    inputAttrs = {},
    selectedSuggestion,
    upArrowLabel,
    downArrowLabel,
    useOptimizeListRender,
    shouldRenderWithPortal = false,
    ...rest
}: Props<S>) {
    const inputRef = inputRefFromProps || React.createRef<HTMLInputElement>();

    const renderFocused = ({ getInputProps }) => {
        const handleInputKeyDown = (event: React.KeyboardEvent) => {
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
                        placeholder: suggestionToString(selectedSuggestion) || inputPlaceholder,
                        onKeyDown: handleInputKeyDown,
                        'data-lpignore': true,
                        ...elem('input', { disabled }),
                    })}
                />
            </div>
        );
    };

    const renderBlurred = ({ getInputProps }) => (
        <div tabIndex={0} role="searchbox" {...getInputProps()} {...elem('wrapper', { disabled })}>
            <span {...elem('selection')}>
                {selectedSuggestion ? (
                    suggestionToString(selectedSuggestion)
                ) : (
                    <Text inline {...elem('placeholder')} context="neutral">
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
            onOuterClick={onOuterClick}
            listRenderer={(listProps) => (
                <SuggestionsList
                    {...listProps}
                    isLoading={false}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    suggestionItemRenderer={suggestionItemRenderer}
                    useOptimizeRender={useOptimizeListRender}
                    passDisabledToListItems
                />
            )}
            focusedRenderer={renderFocused}
            blurredRenderer={renderBlurred}
            showArrow
            downArrowLabel={downArrowLabel}
            upArrowLabel={upArrowLabel}
            shouldRenderWithPortal={shouldRenderWithPortal}
        />
    );
}

Combobox.displayName = 'Combobox';
