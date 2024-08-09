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

/**
 * A Toggle is a user interface component designed to quickly switch between two distinct states,
 * such as “on” and “off.” It functions as a simple mechanism to turn a feature or option on or off with
 * a single action. Toggles are often employed for straightforward binary choices, making them ideal
 * for turning notifications on or off or activating/deactivating a mode. Their clear visual representation
 * helps users understand the current state and makes the transition between states intuitive and efficient.
 *
 * ## Usage
 *
 * A Toggle is a control used to switch between two possible states quickly. It is designed for binary
 * actions, where the change happens immediately after the user interacts with the control. Swithers are
 * commonly used for simple “on/off” switches and are ideal for settings or options that have only two states.
 *
 * ## Content
 *
 * ### Label Text
 *
 * Label text must accompany a toggle to indicate what the toggle controls or adjusts clearly. It helps
 * users understand the purpose of the toggle and what changes will occur.
 *
 * ### Action Text
 *
 * Action text describes the binary action of the toggle. It should be three words or fewer and displayed
 * on the side of the toggle. This text helps users understand the immediate effect of flipping the toggle.
 *
 * ### Language
 *
 * Use adjectives rather than verbs to describe the actions and states associated with the toggle.
 * Adjectives provide clear, descriptive information about the state of the object affected by the toggle,
 * such as “Enabled” or “Disabled,” rather than instructing users on what to do.
 *
 * ## States
 *
 * Toggles have four distinct states:
 *  * inactive,
 *  * active,
 *  * inactive-disabled and
 *  * active-disabled.
 *
 * When not disabled they are interactive and will have a distinctive appearance when hovered or focused.
 *
 */
export const Toggle = React.forwardRef<HTMLInputElement, Props>(
    ({ children, disabled = false, id, ...rest }, ref) => (
        <label {...block({ disabled, ...rest })} htmlFor={id}>
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
                <Text {...elem('text')} inline context={disabled ? 'neutral' : 'default'}>
                    {children}
                </Text>
            )}
        </label>
    )
);

Toggle.displayName = 'Toggle';
