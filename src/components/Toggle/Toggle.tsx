import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Toggle.scss';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** A unique id to reference this toggle */
    id: string;
    /** Label related to toggle */
    children?: string;
    /** Should be Toggle disabled or not */
    disabled?: boolean;
}

const { block, elem } = bem('Toggle', styles);

export const Toggle = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { children, disabled, id, ...rest } = props;
    return (
        <label {...block(props)} htmlFor={id}>
            <div {...elem('toggleContainer')}>
                <input
                    {...elem('realCheckbox')}
                    {...rest}
                    ref={ref}
                    type="checkbox"
                    id={id}
                    disabled={disabled}
                />
                <div {...elem('toggleButton')} />
            </div>
            {children && (
                <Text {...elem('text')} inline context={disabled ? 'muted' : 'default'}>
                    {children}
                </Text>
            )}
        </label>
    );
});

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
    disabled: false,
};
