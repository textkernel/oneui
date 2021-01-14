import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { usePopper } from 'react-popper';
import { ButtonProps } from '../../Buttons';
import { List } from '../../List';
import { bem } from '../../../utils/bem/bem';
import styles from './ActionsButton.scss';
import { Placement } from '@popperjs/core';

const { elem } = bem('ActionsButton', styles);

interface Props<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: NotEmptyReactNode;
    button: React.ReactElement<ButtonProps>;
    onChange: (value?: V | null) => void;
    placement?: Placement;
}

export function ActionsButton<V>(props: Props<V>) {
    const {
        button,
        children,
        onChange,
        placement,
        ...rest
    } = props;

    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);

    const state = usePopper(
        referenceElement,
        popperElement,
        {
            placement,
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: [0, 5] },
                },
            ],
        },
    );

    const childrenArray = React.Children.toArray(children);
    const valuesAvailableForHighlight: V[] = [];
    childrenArray.forEach((child: NotEmptyReactNode) => {
        if (
            React.isValidElement(child)
            && child.props.value
            && !child.props.disabled
        ) {
            return valuesAvailableForHighlight.push(child.props.value);
        }
    });

    const {
        isOpen,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        highlightedIndex,
    } = useSelect<V>({
        items: valuesAvailableForHighlight,
        onSelectedItemChange: ({ selectedItem }) => {
            onChange(selectedItem);
        },
    });

    return (
        <div {...rest}>
            <div ref={setReferenceElement}>
                {React.cloneElement(button, {
                    ...getToggleButtonProps(),
                })}
            </div>
            <div {...getMenuProps()}>
                {isOpen && (
                    <List
                        {...elem('list')}
                        ref={setPopperElement}
                        style={state.styles.popper}
                        {...state.attributes.popper}
                        isControlledNavigation
                    >
                        {childrenArray.map((child, index) => {
                            if (
                                React.isValidElement(child)
                                && valuesAvailableForHighlight.includes(child.props.value)
                            ) {
                                const currentValueIndex = valuesAvailableForHighlight
                                    .findIndex(val => val === child.props.value);

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
                )}
            </div>
        </div>
    );
}

ActionsButton.displayName = 'ActionsButton';

ActionsButton.defaultProps = {
    placement: 'bottom-end',
};
