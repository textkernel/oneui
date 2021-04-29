import React, { useState } from 'react';
import { useSelect, PropGetters } from 'downshift';
import { usePopper } from 'react-popper';
import { bem } from '../../utils/bem/bem';
import { mergeRefs } from '../../utils/mergeRefs';
import { PopupPlacement } from '../../constants';
import { ButtonProps } from '../Buttons';
import { List } from '../List';
import styles from './Dropdown.scss';

const { elem } = bem('Dropdown', styles);

export type DropdownRenderArgs<V> = {
    getItemPropsByIndex: (index: number) => PropGetters<V>;
};

interface Props<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** List of items */
    items: V[];
    /** Popup content */
    children: (args: DropdownRenderArgs<V>) => React.ReactElement;
    /** {@link Button} element, controlled by current component */
    button: React.FunctionComponentElement<ButtonProps>;
    /** onChange called when an item is selected */
    onChange: (value: V) => void;
    /** onOpen called on request to be open */
    onOpen?: () => void;
    /** onClose called on request to be close */
    onClose?: () => void;
    /** Should the children be shown. This prop is used when we need to have Dropdown as "controlled" component */
    isOpen?: boolean;
    /**
     * Convert item to string.
     * Prop is required if passed items are not list of strings.
     * This is need for accessibility aria-live messages for downshift.
     */
    itemToString?: (item: V | null) => string;
    /** Popup placement relative to button */
    placement?: PopupPlacement;
}

/**
 * Component is intended for displaying available actions by button click.
 * It allows you to navigate with keyboard across actions.
 * If you don't need navigation - use PopupBase component.
 */
export function Dropdown<V>(props: Props<V>) {
    const {
        button,
        children,
        items,
        onChange,
        onOpen,
        onClose,
        isOpen: isOpenProp,
        itemToString,
        placement,
        ...rest
    } = props;

    // Assuming the rest of the items have the same type as the first item
    if (items[0] && typeof items[0] !== 'string' && itemToString === undefined) {
        throw new Error('You need pass "itemToString" for non string "items"');
    }

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const state = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 3] },
            },
        ],
    });

    const {
        isOpen,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        highlightedIndex,
        reset,
    } = useSelect<V>({
        items,
        isOpen: isOpenProp,
        itemToString,
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                onChange(selectedItem);
                reset();
            }
        },
        onIsOpenChange: (changes) => {
            if (changes.isOpen) {
                if (onOpen) {
                    onOpen();
                }
            } else if (onClose) {
                onClose();
            }
        },
    });

    const menuProps = getMenuProps();
    const toggleButtonProps = getToggleButtonProps();
    const openPopperProps = isOpen && {
        style: state.styles.popper,
        ...state.attributes.popper,
        ...elem('list'),
    };
    const getItemPropsByIndex = (index: number) => {
        return {
            ...getItemProps({
                index,
                item: items[index],
            }),
            isHighlighted: highlightedIndex === index,
        };
    };

    return (
        <>
            {React.cloneElement(button, {
                ...rest,
                ...toggleButtonProps,
                ref: mergeRefs([setReferenceElement, toggleButtonProps.ref, button.ref]),
            })}
            <List
                {...menuProps}
                {...openPopperProps}
                ref={mergeRefs([isOpen && setPopperElement, menuProps.ref])}
                isControlledNavigation
            >
                {isOpen && children({ getItemPropsByIndex })}
            </List>
        </>
    );
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
    placement: 'bottom-end',
    onOpen: undefined,
    onClose: undefined,
    isOpen: undefined,
    itemToString: undefined,
};
