import * as React from 'react';
import bem from '../../../utils/bem'
import { SelectButtonProps } from '../SelectButton';
import styles from './SelectButtonGroup.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    /** Color context for selected buttons */
    selectedContext?: 'neutral' | 'brand'
    /** should children have equal width */
    isEqualWidth?: boolean;
}

const { block } = bem('SelectButtonGroup', styles);

const SelectButtonGroup: React.FC<Props> = props => {
    const { children, isMultiselect, isEqualWidth, isBlock, selectedContext, onChange, ...rest } = props;

    const initiallySelectedValues: string[] = [];
    children.forEach(child => {
        const { value, isSelected = false } = child.props;
        if (isSelected) {
            initiallySelectedValues.push(value);
        }
    });

    const [selectedValues, setSelectedValues] = React.useState(initiallySelectedValues);

    React.useEffect(() => {
        onChange?.(selectedValues)
    }, [selectedValues]);

    const handleSelectionChangeForValue = (value: string) => {
        if (!isMultiselect) {
            setSelectedValues([value]);
        } else {
            if (selectedValues.includes(value)) {
                setSelectedValues(selectedValues.filter(v => v !== value));
            } else {
                setSelectedValues([...selectedValues, value]);
            }
        }
    };

    return (
        <div {...rest} {...block(props)}>
            {children.map(child =>
                React.cloneElement(child, {
                    isEqualWidth,
                    isSelected: selectedValues.includes(child.props.value),
                    onChange: handleSelectionChangeForValue,
                    selectedContext: child.props.selectedContext || selectedContext
                })
            )}
        </div>
    );
};

SelectButtonGroup.displayName = 'SelectButtonGroup';

SelectButtonGroup.defaultProps = {
    isMultiselect: false,
    isBlock: false,
    isEqualWidth: false,
    selectedContext: 'brand'
};

export default SelectButtonGroup;
