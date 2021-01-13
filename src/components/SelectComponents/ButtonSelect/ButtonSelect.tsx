import React, { useState } from 'react';
import { useSelect } from 'downshift';
import { usePopper } from 'react-popper';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Context } from '@textkernel/oneui/constants';
import { Button, ButtonProps } from '../../Buttons';
import { List } from '../../List';
import { ListItem } from '../../List/ListItem';
import { bem } from '../../../utils/bem/bem';
import styles from './ButtonSelect.scss';

const { elem } = bem('ButtonSelect', styles);

interface Props<S> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    itemsTitle?: string;
    items: S[];
    itemToString: (item: S) => string;
    button: React.ReactElement<ButtonProps>;
    onChange: (item?: S | null) => void;
    context?: Context;
}

export function ButtonSelect<S>(props: Props<S>) {
    const {
        button,
        context,
        items,
        itemToString,
        itemsTitle,
        onChange,
        ...rest
    } = props;

    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);

    const state = usePopper(
        referenceElement,
        popperElement,
        {
            placement: 'bottom-end',
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: [0, 5] },
                },
            ],
        },
    );

    const {
        isOpen,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        highlightedIndex,
    } = useSelect<S>({
        items,
        onSelectedItemChange: ({ selectedItem }) => {
            onChange(selectedItem);
        },
    });

    return (
        <div {...elem('main')} {...rest}>
            {React.cloneElement(button, {
                ...button.props,
                context,
                ...elem('button', props),
            })}
            <div ref={setReferenceElement}>
                <Button
                    {...elem('dropdownButton')}
                    {...getToggleButtonProps()}
                    context={context}
                >
                    <IoMdArrowDropdown {...elem('dropdownIcon')} />
                </Button>
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
                        {[
                            ...(
                                itemsTitle
                                    ? [
                                        <ListItem {...elem('listHeader')} key="disabled" disabled>
                                            {itemsTitle}
                                        </ListItem>,
                                    ]
                                    : []
                            ),
                            ...items.map((item, index) => {
                                const itemAsString = itemToString(item);
                                const disabled = index === 1;
                                return (
                                    <ListItem
                                        {...getItemProps({ item, index })}
                                        key={itemAsString}
                                        isHighlighted={highlightedIndex === index}
                                        disabled={disabled}
                                    >
                                        {itemAsString}
                                    </ListItem>
                                );
                            }),
                        ]}
                    </List>
                )}
            </div>
        </div>
    );
}

ButtonSelect.displayName = 'ButtonSelect';

ButtonSelect.defaultProps = {
    context: 'brand',
};
