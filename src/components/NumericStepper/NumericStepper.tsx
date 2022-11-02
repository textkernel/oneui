import * as React from 'react';
import { bem } from '../../utils';
import styles from './NumericStepper.scss';

import { StepperButton } from '../Buttons';

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Callback is called when user changes component value by using built-in controls
     */
    onChange: (value: number) => void;
    /**
     * Increase/decrease step value
     */
    step?: number;
    /**
     * Minimum possible value of NumericStepper
     */
    minValue?: number;
    /**
     * Maximum possible value of NumericStepper
     */
    maxValue?: number;
    /**
     * The value stepping starts from, if updated will also reset the current value
     */
    defaultValue?: number;
    /**
     * De-facto CSS property that sets custom width for input
     */
    customWidth?: string;
    /**
     * class to be applied to the component
     */
    className?: string;
}

const { block, elem } = bem('NumericStepper', styles);

/**
 * This component is used as a replacement for the traditional input component with step attribute
 * (also knows as Input Stepper), but with custom up and down buttons.
 */
export const NumericStepper: React.FC<Props> = ({
    onChange,
    step = 1,
    minValue = 0,
    maxValue = Number.MAX_SAFE_INTEGER,
    defaultValue = 0,
    customWidth = '3ch',
    className = undefined,
    ...rest
}) => {
    const [currentValue, setCurrentValue] = React.useState<number>(defaultValue || minValue);
    const [inputValue, setInputValue] = React.useState<string>(currentValue.toString());

    // set value to default if prop changes
    React.useEffect(() => {
        setCurrentValue(defaultValue || 0);
        setInputValue((defaultValue || 0).toString());
    }, [defaultValue]);

    // set value to max if prop changes and current value is higher then allowed
    React.useEffect(() => {
        if (currentValue > maxValue) {
            setCurrentValue(maxValue);
            setInputValue(maxValue.toString());
        }
    }, [maxValue, currentValue]);

    // set value to max if prop changes and current value is higher then allowed
    React.useEffect(() => {
        if (currentValue < minValue) {
            setCurrentValue(minValue);
            setInputValue(minValue.toString());
        }
    }, [minValue, currentValue]);

    const onValueUpdate = (value: number) => {
        setInputValue(value.toString());
        setCurrentValue(value);
        onChange(value);
    };
    const handleStepUp = () => {
        const newValue = currentValue + step;

        onValueUpdate(newValue > maxValue ? maxValue : newValue);
    };
    const handleStepDown = () => {
        const newValue = currentValue - step;

        onValueUpdate(newValue < minValue ? minValue : newValue);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
    };
    const handleInputBlur = () => {
        const parsedInputValue = parseInt(inputValue, 10);

        if (parsedInputValue !== currentValue) {
            if (Number.isNaN(parsedInputValue)) {
                // CASE: Entered value cannot be converted to integer (like empty string)
                onValueUpdate(currentValue);
            }

            if (parsedInputValue >= minValue && parsedInputValue <= maxValue) {
                // CASE: Entered value is in between minValue and maxValue
                onValueUpdate(parsedInputValue);
            } else if (parsedInputValue < minValue) {
                // CASE: Entered value is less then minValue
                onValueUpdate(minValue);
            } else if (parsedInputValue > maxValue) {
                // CASE: Entered value is greater then maxValue
                onValueUpdate(maxValue);
            }
        }
    };

    return (
        <div {...rest} {...block(className)}>
            <StepperButton
                icon="minus"
                onClick={handleStepDown}
                disabled={currentValue === minValue}
            />
            <input
                {...elem('stepperInput')}
                style={{ width: customWidth }}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={inputValue}
                type="number"
                step={step}
                min={minValue}
                max={maxValue}
            />
            <StepperButton
                icon="plus"
                onClick={handleStepUp}
                disabled={currentValue === maxValue}
            />
        </div>
    );
};

NumericStepper.displayName = 'NumericStepper';
