import * as React from 'react';
import { SelectButtonProps } from '../SelectButton';

interface Props {
    /** SelectButton components */
    children: React.ReactElement<SelectButtonProps>[];
    /**
     * A function to be called selection is changed.
     * For convenience it will always be called with an array. In case of single select this array will always be of max length 1
     */
    onChange?: (selection: string[]) => void;
    /** is this button part of a multiselect group - when yes will allow more then one option to be selected */
    isMultiselect?: boolean;
    /** should the component take up all the width available */
    isBlock?: boolean;
    /** should children have equal width */
    isEqualWidth?: boolean;
}

const SelectButtonGroup: React.FC<Props> = props => {
    const { children } = props;

    // a skeleton implementation just to get a general idea of what will happen
    return (
        <div>
            <select style={{ visibility: 'hidden' }}>
                {children.map(child => (
                    <option value={child.props.value} />
                ))}
            </select>
            {children}
        </div>
    );
};

SelectButtonGroup.displayName = 'SelectButtonGroup';

SelectButtonGroup.defaultProps = {
    isMultiselect: false,
    isBlock: false,
};

export default SelectButtonGroup;
