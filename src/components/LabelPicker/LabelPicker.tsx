import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import { usePopper } from 'react-popper';
import { bem } from '../../utils/bem/bem';
import { Button } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Text } from '../Text';
import { useOuterClick } from '../../hooks';
import { ENTER_KEY } from '../../constants';
import { mergeRefs } from '../../utils/mergeRefs';
import styles from './LabelPicker.scss';

const { elem } = bem('LabelPicker', styles);

export type Label = {
    /** the display name to be shown to the user */
    name: string;
    /** state of the label: selected or not */
    isSelected: boolean;
    /** the number of occurrences will be shown next to the name */
    count?: number;
};

export interface Props<L extends Label> {
    /** a list of available labels and their attributes */
    labels: L[];
    /** a button like element that supports onClick handler to be used as the trigger */
    children: React.ReactElement<{ onClick: (event: any) => void; ref: React.RefObject<any> }>;
    /** callback to be called when the user clicks the checkbox - updating the state of the checkbox is up to the consuming application */
    onChange: (label: L, event: React.ChangeEventHandler<HTMLInputElement>) => void;
    /** callback to add new label */
    onAdd: (name: string) => void;
    /** callback fired when the component closes, clicking Done, outer click or through the trigger button */
    onClose?: () => void;
    /** text to be shown as input placeholder for adding labels */
    inputPlaceholder: string;
    /** label for the done button */
    doneLabel: string;
}

export function LabelPicker<L extends Label>(props: Props<L>) {
    const { labels, children, onChange, onAdd, onClose, inputPlaceholder, doneLabel } = props;
    // const triggerRef = React.createRef<Element>();
    const [triggerRef, setTriggerRef] = React.useState<Element | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    const handleOuterClick = (event) => {
        // @ts-ignore
        if (triggerRef.current && !triggerRef.current.contains(event.target)) {
            handleClose();
        }
    };

    const dialogRef = useOuterClick<HTMLDivElement>(handleOuterClick);

    const popper = usePopper(triggerRef, dialogRef.current, {
        placement: 'bottom',
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 3] },
            },
        ],
    });

    const handleTriggerClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        // call the onClick function that might have been set on the child
        children.props?.onClick?.(event);

        // toggle dialog
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
        }
    };

    const getChangeHandler = (label) => (event) => {
        onChange(label, event);
    };

    const handleAdd = () => {
        onAdd(inputValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ENTER_KEY) {
            handleAdd();
        }
    };

    return (
        <>
            {React.cloneElement(children, {
                onClick: handleTriggerClick,
                // @ts-ignore
                ref: mergeRefs([setTriggerRef]),
            })}
            <div style={popper?.styles?.popper} {...popper?.attributes}>
                {isOpen ? (
                    <div ref={dialogRef} {...elem('container')}>
                        {labels.map((label) => (
                            <Checkbox
                                key={label.name}
                                id={label.name}
                                checked={label.isSelected}
                                onChange={getChangeHandler(label)}
                                {...elem('checkbox')}
                            >
                                <Text inline>
                                    {label.name}
                                    {label.count ? (
                                        <Text inline context="muted" {...elem('count')}>
                                            ({label.count})
                                        </Text>
                                    ) : null}
                                </Text>
                            </Checkbox>
                        ))}
                        <div {...elem('inputLine')}>
                            <Input
                                placeholder={inputPlaceholder}
                                size="small"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                {...elem('input')}
                            />
                            <Button
                                context="good"
                                size="small"
                                onClick={handleAdd}
                                disabled={!inputValue}
                                {...elem('addButton')}
                            >
                                <FaPlus width="24px" height="24px" />
                            </Button>
                        </div>
                        <Button onClick={handleClose} context="primary" isBlock>
                            {doneLabel}
                        </Button>
                    </div>
                ) : null}
            </div>
        </>
    );
}

LabelPicker.displayName = 'LabelPicker';
