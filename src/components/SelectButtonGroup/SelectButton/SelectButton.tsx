import * as React from 'react';

// These props will be passed by the parent <SelectButtonGroup>
interface InternalProps {
    /** A function to be called if a button is pressed. */
    onChange?: (value: string) => void;
    /** is this button has same width as its siblings */
    isEqualWidth?: boolean;
}

export interface Props extends InternalProps {
    /** the label to be displayed on this button */
    children: NotEmptyReactNode;
    /** the value associated with this button */
    value: string;
    /** if this button should be in a selected state */
    isSelected?: boolean;
    /** the color context to be applied in the selected state */
    selectedContext?: 'neutral' | 'brand';
}

const SelectButton: React.FC<Props> = props => <div></div>;

SelectButton.displayName = 'SelectButton';

SelectButton.defaultProps = {
    isSelected: false,
    selectedContext: 'brand',
    isEqualWidth: false,
};

export default SelectButton;
