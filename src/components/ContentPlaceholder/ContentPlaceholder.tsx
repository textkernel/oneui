import * as React from 'react';
import { bem } from '../../utils';
import styles from './ContentPlaceholder.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Animation duration in seconds */
    duration?: number;
    /** Custom height in pixels for the content placeholder */
    height?: number;
    /** Width of the content placeholder, relative to its parent */
    width?: number;
    /** Renders placeholder without its default margin */
    withoutMargin?: boolean;
}

const { block, elem } = bem('ContentPlaceholder', styles);

const calcDuration = (seconds) => `${seconds}s`;

const calcMaskWidth = (width) => ({
    width: `${100 - Math.max(Math.min(width, 100), 0)}%`,
});

export const ContentPlaceholder: React.FC<Props> = ({
    duration = 1,
    height,
    width = 100,
    withoutMargin = false,
    ...rest
}) => {
    return (
        <div
            role="alert"
            aria-label="Loading"
            {...rest}
            {...block({ withoutMargin, ...rest })}
            style={{
                animationDuration: calcDuration(duration),
                height,
            }}
        >
            &nbsp;
            <div role="presentation" {...elem('mask')} style={calcMaskWidth(width)} />
        </div>
    );
};

ContentPlaceholder.displayName = 'ContentPlaceholder';
