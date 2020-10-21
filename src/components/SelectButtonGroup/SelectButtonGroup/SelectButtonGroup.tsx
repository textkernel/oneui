import * as React from 'react';
import { bem } from '../../../utils';
import { Context, Size } from '../../../constants';
import { SelectButtonProps } from '../SelectButton';
import styles from './SelectButtonGroup.scss';

interface Props<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** SelectButton components */
    children: React.ReactElement<SelectButtonProps<V>>[];
    /**
     * A function to be called selection is changed.
     * For convenience it will always be called with an array. In case of single select this array will always be of max length 1
     */
    onChange?: (selection: V[]) => void;
    /** is this button part of a multiselect group - when yes will allow more then one option to be selected */
    isMultiselect?: boolean;
    /** if this component should have at least one selected value (for now it effects only multiselect logic) */
    isRequired?: boolean;
    /** should the component take up all the width available */
    isBlock?: boolean;
    /** Color context for selected buttons */
    selectedContext?: Context;
    /** should children have equal width */
    isEqualWidth?: boolean;
    /** size of the button group */
    size?: Size;
}

const { block } = bem('SelectButtonGroup', styles);

export function SelectButtonGroup<V>(props: Props<V>) {
    const {
        children,
        isMultiselect,
        isRequired,
        isEqualWidth,
        isBlock,
        selectedContext,
        onChange,
        size,
        ...rest
    } = props;

    const initiallySelectedValues: V[] = [];
    children.forEach((child) => {
        const { value, isInitiallySelected } = child.props;
        if (isInitiallySelected) {
            initiallySelectedValues.push(value);
        }
    });

    const [selectedValues, setSelectedValues] = React.useState(initiallySelectedValues);

    React.useEffect(() => {
        onChange?.(selectedValues);
    }, [onChange, selectedValues]);

    const handleSelectionChangeForValue = (value: V) => {
        if (!isMultiselect) {
            if (isRequired || selectedValues[0] !== value) {
                setSelectedValues([value]);
            } else {
                setSelectedValues([]);
            }
        } else if (selectedValues.includes(value)) {
            if (!(isRequired && selectedValues.length === 1)) {
                setSelectedValues(selectedValues.filter((v) => v !== value));
            }
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    return (
        <div {...rest} {...block(props)}>
            {children.map((child) =>
                React.cloneElement(child, {
                    isBlock,
                    isEqualWidth,
                    isSelected: selectedValues.includes(child.props.value),
                    onChange: handleSelectionChangeForValue,
                    selectedContext: child.props.selectedContext || selectedContext,
                    size,
                })
            )}
        </div>
    );
}

SelectButtonGroup.displayName = 'SelectButtonGroup';

SelectButtonGroup.defaultProps = {
    isMultiselect: false,
    isRequired: false,
    isBlock: false,
    isEqualWidth: false,
    selectedContext: 'brand',
    size: 'normal',
    onChange: null,
};
