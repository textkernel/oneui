import * as React from 'react';
import { bem } from '../../utils';
import styles from './NumericStepper.scss';

import { StepperButton } from '../Buttons';

interface Props {
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
     * The value stepping starts from
     */
    defaultValue?: number;
    /**
     * De-facto CSS property that sets custom width for input
     */
    customWidth?: string;
}

const { block, elem } = bem('NumericStepper', styles);

export const NumericStepper: React.FC<Props> = (props) => {
    const { onChange, step, minValue, maxValue, defaultValue, customWidth } = props;

    const [currentValue, setCurrentValue] = React.useState<number>(defaultValue || minValue || 0);

    if (
        step === undefined ||
        defaultValue === undefined ||
        minValue === undefined ||
        maxValue === undefined
    )
        return null; // TODO: Remove this redundant "not-undefined" check

    const onValueUpdate = (value: number) => {
        if (value !== currentValue) {
            setCurrentValue(value);
            onChange(value);
        }
    };

    const handleStepUp = () => {
        const newValue = currentValue + step;

        if (newValue > maxValue) {
            onValueUpdate(maxValue);
        } else {
            onValueUpdate(newValue);
        }
    };
    const handleStepDown = () => {
        const newValue = currentValue - step;

        if (newValue < minValue) {
            onValueUpdate(minValue);
        } else {
            onValueUpdate(newValue);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCurrentValue(parseInt(value, 10));
    };
    const handleInputBlur = () => {
        if (currentValue >= minValue && currentValue <= maxValue) {
            // CASE: Entered value is in between minValue and maxValue
            onValueUpdate(currentValue);
        } else if (currentValue < minValue) {
            // CASE: Entered value is less then minValue
            onValueUpdate(minValue);
        } else if (currentValue > maxValue) {
            // CASE: Entered value is greater then maxValue
            onValueUpdate(maxValue);
        }
    };

    return (
        <div {...block(props)}>
            <StepperButton
                icon="minus"
                onClick={handleStepDown}
                disabled={currentValue === minValue}
            />
            <input
                {...elem('stepperInput', props)}
                style={{ width: customWidth }}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={currentValue.toString()}
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

NumericStepper.defaultProps = {
    step: 1,
    defaultValue: 0,
    minValue: 0,
    maxValue: Number.MAX_SAFE_INTEGER,
    customWidth: '3ch',
};
