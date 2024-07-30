import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './RadioButton.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /** A unique id to reference this radio button */
    id: string;
    /** The name of the group this radio button belongs to */
    name?: string;
    /** If the radio button should be disabled */
    disabled?: boolean;
    /** The label for the radio button. Note: it is rendered within a <span> */
    children?: React.ReactNode;
}

const { block, elem } = bem('RadioButton', styles);

export const RadioButton = forwardRef<HTMLInputElement, Props>(
    ({ id, children, disabled = false, name, ...rest }, ref) => (
        <div {...block({ ...rest, disabled })}>
            <input
                {...rest}
                {...elem('input')}
                ref={ref}
                type="radio"
                id={id}
                name={name}
                disabled={disabled}
            />
            <label {...elem('label')} htmlFor={id}>
                <span {...elem('box')} />
                {!!children && (
                    <Text {...elem('text')} inline context={disabled ? 'muted' : 'default'}>
                        {children}
                    </Text>
                )}
            </label>
        </div>
    )
);

RadioButton.displayName = 'RadioButton';
