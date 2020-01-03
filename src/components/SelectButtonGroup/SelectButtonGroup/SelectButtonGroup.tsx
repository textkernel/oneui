import * as React from 'react';

interface Props {
    /** SelectButton components */
    children: NotEmptyReactNode;
    /**
     * A function to be called if a button is pressed.
     * This prop, if defined will overwrite the onSelect on children
     */
    onSelect?: (value: string) => void;
    /** is this button part of a multiselect group - when yes will render as checkbox otherwise as radioButton */
    isMultiselect?: boolean;
    /** should the component take up all the width available */
    isBlock?: boolean;
    /** should children have equal width */
    isEqualWidth?: boolean;
}

const SelectButtonGroup: React.FC<Props> = props => <div></div>;

SelectButtonGroup.displayName = 'SelectButtonGroup';

SelectButtonGroup.defaultProps = {
    isMultiselect: false,
    isBlock: false,
};

export default SelectButtonGroup;
