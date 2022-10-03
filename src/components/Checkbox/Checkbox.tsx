import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Checkbox.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /** A unique id to reference this checkbox */
    id: string;
    /** If the checkbox should be disabled */
    disabled?: boolean;
    /** The label for the checkbox */
    children?: string | React.ReactElement;
    /** Optionally render checkbox in a flexbox */
    asFlexbox?: boolean;
    /** Indeterminate status, show minus sign across checkbox */
    indeterminate?: boolean;
}

const { block, elem } = bem('Checkbox', styles);

export const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { id, children, disabled, asFlexbox, className, style, indeterminate, checked, ...rest } =
        props;

    let text = children;
    if (children && typeof children === 'string') {
        text = (
            <Text {...elem('text', props)} inline context={disabled ? 'muted' : 'default'}>
                {children}
            </Text>
        );
    }

    return (
        <div style={style} {...block(props)}>
            <input
                {...rest}
                {...elem('input', props)}
                ref={ref}
                type="checkbox"
                id={id}
                disabled={disabled}
                checked={checked}
            />
            <label {...elem('label', props)} htmlFor={id}>
                <span {...elem('box', props)}>
                    <svg
                        {...elem('svg', props)}
                        width="12px"
                        height="10px"
                        viewBox={CHECKBOX_VIEWBOX}
                    >
                        {indeterminate && <line x1="2" y1="6" x2="8" y2="6" />}
                        {!indeterminate && <polyline points="1.5 6 3.5 9 8 3" />}
                    </svg>
                </span>
                {text}
            </label>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
    disabled: false,
    asFlexbox: false,
};
