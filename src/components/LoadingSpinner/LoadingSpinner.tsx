import * as React from 'react';
import { ButtonContext } from '@textkernel/oneui/constants';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './LoadingSpinner.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Center the spinner relative to parent element or viewport */
    centerIn?: 'parent' | 'viewport';
    /** Loading text */
    children?: React.ReactNode;
    /** Hides the spinner when true */
    hidden?: boolean;
    /** Custom spinner size (will affect both width and height) */
    size?: number;
    /**  Define the context, eg. primary, secondary, critical */
    context?: ButtonContext | 'inverted';
}

const { block, elem } = bem('LoadingSpinner', styles);

export const LoadingSpinner: React.FC<Props> = ({
    centerIn,
    children,
    hidden = false,
    size,
    context,
    ...rest
}) => (
    <div
        {...rest}
        {...block({ hidden, centerIn, context, ...rest })}
        role="status"
        aria-busy={!hidden}
        aria-hidden={hidden}
    >
        <svg
            viewBox={[0, 0, 44, 44]}
            style={((s) => {
                if (!s) {
                    return null;
                }
                return {
                    width: s,
                    height: s,
                };
            })(size)}
            {...elem('svg', { hidden, centerIn })}
        >
            <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                strokeWidth="4"
                {...elem('path', { context, hidden, centerIn })}
            />
        </svg>
        {!!children && (
            <Text inline {...elem('label')}>
                {children}
            </Text>
        )}
    </div>
);

LoadingSpinner.displayName = 'LoadingSpinner';
