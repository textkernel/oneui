import * as React from 'react';

interface Props {
    /** the label to be displayed on this button */
    children: string;
    /** the value associated with this button */
    value: string;
    /**
     * A function to be called if a button is pressed.
     * This prop, if defined on the parent SelectButtonGroup will overwrite this one
     */
    onSelect?: (value: string) => void;
    /** if this button should be in a selected state */
    isSelected?: boolean;
    /** the color context to be applied in the selected state */
    selectedContext?: 'neutral' | 'brand';
    /**
     * is this button part of a multiselect group
     * when yes will render as checkbox otherwise as radioButton
     * This prop will be overwritten by the parent <SelectButtonGroup>
     */
    isMultiselect?: boolean;
    /**
     * is this button has same width as its siblings
     * This prop will be overwritten by the parent <SelectButtonGroup>
     */
    isEqualWidth?: boolean;
}

const SelectButton: React.FC<Props> = props => <div></div>;

SelectButton.displayName = 'SelectButton';

SelectButton.defaultProps = {
    isSelected: false,
    selectedContext: 'brand',
    isMultiselect: false,
    isEqualWidth: false,
};

export default SelectButton;
