import * as React from 'react';
import bem from '../../utils/bem';
import styles from './ContentPlaceholder.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
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

const calcDuration = seconds => `${seconds}s`;

const calcMaskWidth = width => ({
    width: `${100 - Math.max(Math.min(width, 100), 0)}%`,
});

const ContentPlaceholder: React.FC<Props> = props => {
    const { duration, height, width, withoutMargin, ...rest } = props;

    return (
        <div
            {...rest}
            {...block(props)}
            style={{
                animationDuration: calcDuration(duration),
                height,
            }}
        >
            &nbsp;
            <div {...elem('mask', props)} style={calcMaskWidth(width)} />
        </div>
    );
};

ContentPlaceholder.displayName = 'ContentPlaceholder';

ContentPlaceholder.defaultProps = {
    duration: 1,
    width: 100,
    withoutMargin: false,
};

export default ContentPlaceholder;
