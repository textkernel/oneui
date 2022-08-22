import * as React from 'react';
import { bem } from '../../../utils';
import { Context, Size } from '../../../constants';
import { SelectButtonProps } from '../SelectButton';
import styles from './SelectButtonGroup.scss';

export interface Props<V>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** SelectButton children */
    children: React.ReactElement<SelectButtonProps<V>>[];
    /** Function that is called when the selection is changed (controlled use) */
    onChange?: (selection: V | V[]) => void;
    /** should more than one option be allowed to be selected (uncontrolled use) */
    isMultiselect?: boolean;
    /** if required, there should at least be one selected value (uncontrolled use) */
    isRequired?: boolean;
    /** should the component take up all the width available */
    isBlock?: boolean;
    /** Color context for selected buttons */
    context?: Context;
    /** should children have equal width */
    isEqualWidth?: boolean;
    /** size of the button group */
    size?: Size;
    /** currently selected value(s) (controlled use) */
    value?: V[];
    /** currently selected value(s) (uncontrolled use) */
    defaultValue?: V[];
}

const { block } = bem('SelectButtonGroup', styles);

export function SelectButtonGroup<V>(props: Props<V>) {
    const {
        children,
        isMultiselect,
        isRequired,
        isEqualWidth,
        isBlock,
        context,
        onChange,
        size,
        value,
        defaultValue,
        ...rest
    } = props;

    const [selection, setSelection] = React.useState(defaultValue || []);

    const handleChange = (selectedValue: V) => {
        if (value) {
            // If value is present, this means state is controlled outside of the component
            // Only the currently selected value will be passed as argument
            if (onChange) {
                onChange(selectedValue);
            }
        } else {
            // Uncontrolled use: state is managed internally
            const isCurrentlySelected = selection.includes(selectedValue);
            let newSelection = selection;

            if (!isMultiselect) {
                if (isRequired || !isCurrentlySelected) {
                    // Select a value other than the one currently selected
                    newSelection = [selectedValue];
                } else {
                    // Deselect the currently selected value
                    newSelection = [];
                }
            } else if (isCurrentlySelected) {
                if (!isRequired || selection.length > 1) {
                    // If some selection is required, only allow deselection
                    // if there are at least two values selected
                    newSelection = [...selection.filter((v) => v !== selectedValue)];
                }
            } else {
                // Add value to existing selection
                newSelection = [...selection, selectedValue];
            }

            setSelection(newSelection);

            if (onChange) {
                // Communicate new selection to the outside
                onChange(newSelection);
            }
        }
    };

    return (
        <div {...rest} {...block(props)}>
            {children.map((child) => {
                const childProps = {
                    context: context || child.props.context,
                    isBlock,
                    isEqualWidth,
                    isSelected:
                        (value || selection).includes(child.props.value) || child.props.isSelected,
                    onChange: handleChange,
                    size,
                };

                return React.cloneElement(child, childProps);
            })}
        </div>
    );
}

SelectButtonGroup.displayName = 'SelectButtonGroup';

SelectButtonGroup.defaultProps = {
    isMultiselect: false,
    isRequired: false,
    isBlock: false,
    isEqualWidth: false,
    context: null,
    size: 'normal',
    onChange: null,
    value: null,
    defaultValue: null,
};
