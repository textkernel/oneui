import * as React from 'react';
import { bem } from '../../../utils/bem/bem';
import { SuggestionsList } from '../SuggestionsList';
import { SelectBase } from '../SelectBase';
import { Text } from '../../Text';
import styles from './Select.scss';

const { elem } = bem('Select', styles);

interface Props<S> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * an array of objects or strings that will be used to render the options list.
     * if you want to disabled some of the items, this props needs to be an array of objects,
     * where the object has a property "disabled" set true as needed.
     */
    items: S[];
    /** itemToString(item) should return a string to be displayed in the UI. e.g.: item => item.name */
    itemToString: (item?: S | null) => string;
    /** render function for option list item. If undefined, itemToString will be used. */
    optionItemRenderer?: (item?: S | null) => ReactNode;
    /** onChange(item) called when an item is selected */
    onChange: (item: S) => void;
    /** The item that is currently selected */
    selectedItem?: S;
    /** to be shown in the field when no value is typed */
    placeholder?: string;
    /** label for the Clear button */
    clearLabel?: string;
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
}
export function Select<S>(props: Props<S>) {
    const {
        items,
        selectedItem,
        itemToString,
        optionItemRenderer,
        placeholder,
        clearLabel,
        onChange,
        onBlur,
        onFocus,
        onClear,
        rootRef,
        listRef,
        ...rest
    } = props;

    const selectionRenderer = () => (
        <span {...elem('selected')}>
            {selectedItem ? (
                itemToString(selectedItem)
            ) : (
                <Text inline {...elem('placeholder')} context="muted">
                    {placeholder}
                </Text>
            )}
        </span>
    );

    const blurredRenderer = () => (
        <div tabIndex={0} role="searchbox" onFocus={onFocus} {...elem('wrapper')}>
            {selectionRenderer()}
        </div>
    );

    const focusedRenderer = ({ getToggleButtonProps, onBlur: blur }) => (
        <div
            tabIndex={0}
            role="searchbox"
            {...elem('wrapper', { isOpen: true })}
            {...getToggleButtonProps({ onClick: blur })}
        >
            {selectionRenderer()}
        </div>
    );

    return (
        <SelectBase
            {...rest}
            showArrow
            suggestions={items}
            suggestionToString={itemToString}
            onSelectionAdd={onChange}
            blurredRenderer={blurredRenderer}
            focusedRenderer={focusedRenderer}
            showClearButton={Boolean(selectedItem)}
            clearTitle={clearLabel}
            rootRef={rootRef}
            listRef={listRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onClearAllSelected={onClear}
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

Select.defaultProps = {
    optionItemRenderer: undefined,
    selectedItem: undefined,
    placeholder: '',
    clearLabel: '',
    onFocus: undefined,
    onBlur: undefined,
    onClear: undefined,
    rootRef: undefined,
    listRef: undefined,
};
