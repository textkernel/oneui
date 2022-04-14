import * as React from 'react';

export type Label = {
    /** the display name to be shown to the user */
    name: string;
    /** state of the label: selected or not */
    isSelected: boolean;
    /** the number of occurrences will be shown next to the name */
    count?: number;
};

export interface Props<B = HTMLButtonElement> {
    /** a list of available labels and their attributes */
    labels: Label[];
    /** a button like element that supports onClick handler to be used as the trigger */
    children: React.ReactElement<React.ButtonHTMLAttributes<B>>;
    /** callback to be called when the state of a checkbox changes */
    onChange: (Label) => void;
    /** callback to add new label */
    onAdd: (name: string) => void;
    /** callback when clicking the Done button */
    onDone?: () => void;
    /** callback on outer click */
    onCancel?: () => void;
    /** text to be shown as input placeholder for adding labels */
    inputPlaceholder: string;
    /** label for the done button */
    doneLabel: string;
    /** Ref to access the input field */
    ref?: React.ForwardedRef<HTMLButtonElement>;
}

export const LabelPicker: React.FC<Props> = (props) => {
    return <div></div>;
};

LabelPicker.displayName = 'LabelPicker';

LabelPicker.defaultProps = {};
