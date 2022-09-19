import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { usePopper } from 'react-popper';
import { bem } from '../../utils/bem/bem';
import { mergeRefs } from '../../utils/mergeRefs';
import { PopupPlacement } from '../../constants';
import { ButtonProps } from '../Buttons';
import { ListItemProps } from '../List/ListItem';
import { List } from '../List';
import styles from './Dropdown.scss';

const { elem } = bem('Dropdown', styles);

export interface Props<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     *  Popup content to be placed inside List.
     *  Navigation available only if element has not empty `value` attribute
     *  and empty/false `disabled` attribute.
     *  Use {@link ListItem} component.
     */
    children:
        | React.ReactElement<ListItemProps>
        | (React.ReactElement<ListItemProps> | EmptyElement)[]
        | (
              | React.ReactElement<ListItemProps>
              | React.ReactElement<ListItemProps>[]
              | EmptyElement
          )[];
    /** {@link Button} element, controlled by current component */
    button: React.FunctionComponentElement<ButtonProps>;
    /**
     * Callback called on selecting one of the passed as children items.
     * Value parameter it is a `value` attribute of children item ({@link ListItemProps.value}).
     */
    onChange: (value: V) => void;
    /**
     * Callback called on toggle button click with current/previous open state
     */
    onToggleClick?: (prevOpenState: boolean) => void;
    /**
     * Callback called on focus of the dropdown menu
     */
    onMenuFocus?: () => void;
    /**
     * Callback called on blur of the dropdown menu
     */
    onMenuBlur?: () => void;
    /**
     * Additional select props that enrich and use downshift API
     */
    additionalSelectProps?: Record<string, unknown>;
    /**
     * ClassName that is assigned to <ul> element of the dropdown
     */
    listClassName?: string;
    /** Popup placement relative to button */
    placement?: PopupPlacement;
}

/**
 * ## Usage information
 * This component is intended for displaying available actions by button click.
 * It allows you to navigate with keyboard across non-disabled actions.
 * If you don't need navigation - use PopupBase component.

 * Navigation available only through children which have not empty `value` attribute
 * and empty/false `disabled` attribute (all other children items will be skipped during navigation).
 * Use `ListItem` component as child item.
 */
export function Dropdown<V>(props: Props<V>) {
    const {
        button,
        children,
        onChange,
        onToggleClick,
        onMenuBlur,
        onMenuFocus,
        placement,
        additionalSelectProps,
        listClassName,
        ...rest
    } = props;

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

    const childrenArray = React.Children.toArray(children);
    const valuesAvailableForHighlight: V[] = [];
    childrenArray.forEach((child: NotEmptyReactNode) => {
        if (
            React.isValidElement(child) &&
            child.props.value !== undefined &&
            child.props.value !== null &&
            !child.props.disabled
        ) {
            valuesAvailableForHighlight.push(child.props.value);
        }
    });

    const { isOpen, getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, reset } =
        useSelect<V>({
            items: valuesAvailableForHighlight,
            onSelectedItemChange: ({ selectedItem }) => {
                if (selectedItem) {
                    onChange(selectedItem);
                    reset();
                }
            },
            ...additionalSelectProps,
        });

    const menuProps = getMenuProps({
        onBlur: onMenuBlur,
        onFocus: onMenuFocus,
    });
    const toggleButtonProps = getToggleButtonProps({
        onClick: () => {
            onToggleClick?.(isOpen);
        },
    });
    const openPopperProps = isOpen && {
        style: state.styles.popper,
        ...state.attributes.popper,
        ...elem('list', {
            elemClassName: listClassName,
        }),
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
                {isOpen &&
                    childrenArray.map((child) => {
                        if (
                            React.isValidElement(child) &&
                            valuesAvailableForHighlight.includes(child.props.value)
                        ) {
                            const currentValueIndex = valuesAvailableForHighlight.findIndex(
                                (val) => val === child.props.value
                            );

                            return React.cloneElement(child, {
                                ...getItemProps({
                                    index: currentValueIndex,
                                    item: child.props.value,
                                }),
                                isHighlighted: highlightedIndex === currentValueIndex,
                            });
                        }
                        return child;
                    })}
            </List>
        </>
    );
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
    placement: 'bottom-end',
    onToggleClick: undefined,
    onMenuFocus: undefined,
    onMenuBlur: undefined,
    additionalSelectProps: {},
    listClassName: '',
};
