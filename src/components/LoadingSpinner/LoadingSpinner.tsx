import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './LoadingSpinner.scss';
import { Context } from '../../constants';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Center the spinner relative to parent element or viewport */
    centerIn?: 'parent' | 'viewport';
    /** Loading text */
    children?: ReactNode;
    /** The spinner context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context?: Context;
    /** Hides the spinner when true */
    hidden?: boolean;
    /** Custom spinner size (will affect both width and height) */
    size?: number;
}

const { block, elem } = bem('LoadingSpinner', styles);

export const LoadingSpinner: React.FC<Props> = props => {
    const { centerIn, children, context, hidden, size, ...rest } = props;

    return (
        <div {...rest} {...block(props)} role="status" aria-busy={!hidden} aria-hidden={hidden}>
            <svg
                viewBox={[0, 0, 44, 44]}
                style={(s => {
                    if (!s) {
                        return null;
                    }
                    return {
                        width: s,
                        height: s,
                    };
                })(size)}
                {...elem('svg', props)}
            >
                <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                    {...elem('path', props)}
                />
            </svg>
            {!!children && (
                <Text inline {...elem('label', props)}>
                    {children}
                </Text>
            )}
        </div>
    );
};

LoadingSpinner.displayName = 'LoadingSpinner';

LoadingSpinner.defaultProps = {
    context: 'brand',
    hidden: false,
};
