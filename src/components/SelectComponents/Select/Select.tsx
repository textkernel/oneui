import * as React from 'react';
import { bem } from '../../../utils/bem/bem';
import { SuggestionsList } from '../SuggestionsList';
import { SelectBase } from '../SelectBase';
import { Text } from '../../Text';
import styles from './Select.scss';

const { elem } = bem('Select', styles);

export interface Props<S> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * an array of objects or strings that will be used to render the options list.
     * if you want to disabled some of the items, this props needs to be an array of objects,
     * where the object has a property "disabled" set true as needed.
     */
    items: S[];
    /** itemToString(item) should return a string to be displayed in the UI. e.g.: item => item.name */
    itemToString: (item?: S | null) => string;
    /** render function for option list item. If undefined, itemToString will be used. */
    optionItemRenderer?: (item?: S | null) => React.ReactNode;
    /** onChange(item) called when an item is selected */
    onChange: (item: S) => void;
    /** The item that is currently selected */
    selectedItem?: S;
    /** to be shown in the field when no value is typed */
    placeholder?: string;
    /** label for the Clear button */
    clearTooltipLabel?: string;
    /** Down arrow name for ARIA labelling, it is used when the component isn't focused */
    downArrowLabel?: string;
    /** Up arrow name for ARIA labelling, it is used when the component is focused and options are shown */
    upArrowLabel?: string;
    /** a class to be applied to the top level div */
    className?: string;
    /** onFocus() is called when the component is focused */
    onFocus?: () => void;
    /** onBlur() is called when the component is blurred */
    onBlur?: () => void;
    /** reset the selection to it's default value */
    onClear?: () => void;
    /** root wrapper ref */
    rootRef?: React.RefObject<HTMLDivElement>;
    /** items list ref */
    listRef?: React.RefObject<HTMLUListElement>;
    /** determines if the suggestion list should be rendered using a React Portal
     *  to the dropdown needs to bypass parent element clipping, overflow, or z-index issues.
     */
    shouldRenderWithPortal?: boolean;
}

/**
 * ## Usage information
 * This component is recommended to use for a simple select component with static known list
 * of values without a need for filtering. The list is shown right away by clicking on the control.
 * The selected item is shown in the top field.
 *
 * More detailed face-to-face comparison of Select components can be found
 * [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)
 */
export function Select<S>({
    items,
    selectedItem = undefined,
    itemToString,
    optionItemRenderer = undefined,
    placeholder = '',
    clearTooltipLabel,
    downArrowLabel,
    upArrowLabel,
    onChange,
    onBlur = undefined,
    onFocus = undefined,
    onClear = undefined,
    listRef = undefined,
    shouldRenderWithPortal = false,
    ...rest
}: Props<S>) {
    const focusElRef = React.useRef();

    const selectionRenderer = () => (
        <span {...elem('selected')}>
            {selectedItem ? (
                itemToString(selectedItem)
            ) : (
                <Text inline {...elem('placeholder')} context="neutral">
                    {placeholder}
                </Text>
            )}
        </span>
    );

    const blurredRenderer = ({ getInputProps, onFocus: focus }) => (
        <div
            tabIndex={0}
            role="searchbox"
            {...getInputProps({ onClick: focus })}
            {...elem('wrapper')}
        >
            {selectionRenderer()}
        </div>
    );

    const focusedRenderer = ({ getToggleButtonProps, onBlur: blur, onFocus: focus }) => (
        <div
            ref={focusElRef}
            tabIndex={0}
            role="searchbox"
            {...elem('wrapper', { isOpen: true })}
            {...getToggleButtonProps({ onClick: blur, onFocus: focus })}
        >
            {selectionRenderer()}
        </div>
    );

    return (
        <SelectBase
            {...rest}
            showArrow
            inputRef={focusElRef}
            suggestions={items}
            suggestionToString={itemToString}
            onSelectionAdd={onChange}
            blurredRenderer={blurredRenderer}
            focusedRenderer={focusedRenderer}
            showClearButton={onClear && Boolean(selectedItem)}
            clearTitle={clearTooltipLabel}
            downArrowLabel={downArrowLabel}
            upArrowLabel={upArrowLabel}
            listRef={listRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onClearAllSelected={onClear}
            shouldRenderWithPortal={shouldRenderWithPortal}
            listRenderer={(listProps) => (
                <SuggestionsList
                    {...listProps}
                    suggestionToString={itemToString}
                    suggestionItemRenderer={optionItemRenderer}
                    suggestions={items}
                    passDisabledToListItems
                />
            )}
        />
    );
}

Select.displayName = 'Select';
