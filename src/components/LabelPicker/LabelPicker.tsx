import * as React from 'react';
import { Button } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { useOuterClick } from '../../hooks';

export type Label = {
    /** the display name to be shown to the user */
    name: string;
    /** state of the label: selected or not */
    isSelected: boolean;
    /** the number of occurrences will be shown next to the name */
    count?: number;
};

export interface Props {
    /** a list of available labels and their attributes */
    labels: Label[];
    /** a button like element that supports onClick handler to be used as the trigger */
    children: React.ReactElement<{ onClick: (event: any) => void; ref: React.RefObject<any> }>;
    /** callback to be called when the state of a checkbox changes */
    onChange: (Label) => void;
    /** callback to add new label */
    onAdd: (name: string) => void;
    /** callback fired when the component closes, clicking Done, outer click or through the trigger button */
    onClose?: () => void;
    /** text to be shown as input placeholder for adding labels */
    inputPlaceholder: string;
    /** label for the done button */
    doneLabel: string;
}

export const LabelPicker: React.FC<Props> = (props) => {
    const { children } = props;
    const triggerRef = React.createRef<React.ReactElement<any>>();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = (event) => {
        // @ts-ignore
        if (triggerRef.current && !triggerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const dialogRef = useOuterClick<HTMLDivElement>(handleClose);

    const handleTriggerClick = (event) => {
        setIsOpen(!isOpen);

        // call the onClick function that might have been set on the child
        children.props?.onClick?.(event);
    };

    return (
        <>
            {React.cloneElement(children, {
                onClick: handleTriggerClick,
                ref: triggerRef,
            })}
            {isOpen ? (
                <div ref={dialogRef}>
                    <Input />
                </div>
            ) : null}
        </>
    );
};

LabelPicker.displayName = 'LabelPicker';
