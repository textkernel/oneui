import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './RadioButton.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';
import { SingleReactNode } from '../../customTypes/types';

export interface Props extends React.HTMLProps<HTMLInputElement> {
    /** A unique id to reference this radio button */
    id: string;
    /** The name of the group this radio button belongs to */
    name?: string;
    /** If the radio button should be disabled */
    disabled?: boolean;
    /** The label for the radio button */
    children?: SingleReactNode;
}

const { block, elem } = bem('RadioButton', styles);

export const RadioButton = forwardRef<HTMLElement, Props>(
    ({ id, children, disabled = false, name, ...rest }, ref) => {
        return (
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
                    <span {...elem('box')}>
                        <svg {...elem('svg')} width="12px" height="10px" viewBox={CHECKBOX_VIEWBOX}>
                            <circle cx="5" cy="6" r="3" />
                        </svg>
                    </span>
                    {!!children && (
                        <Text {...elem('text')} inline context={disabled ? 'muted' : 'default'}>
                            {children}
                        </Text>
                    )}
                </label>
            </div>
        );
    }
);

RadioButton.displayName = 'RadioButton';
