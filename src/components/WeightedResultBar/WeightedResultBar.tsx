import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { ProgressBar } from '../ProgressBar';
import { Text } from '../Text';
import styles from './WeightedResultBar.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Description of the result */
    children: string;
    /** Weight of this result in percentage */
    percentage: number;
    /** A react node with a weight of this result in absolute number */
    count: NotEmptySingleReactNode;
    /** Whether or not to render loading state */
    isLoading?: boolean;
}

const { block, elem } = bem('WeightedResultBar', styles);

export const WeightedResultBar: React.FC<Props> = ({
    isLoading = false,
    children,
    percentage,
    count,
    ...rest
}) => {
    const loaderWidth = React.useRef(Math.floor(Math.random() * 60) + 25);

    return (
        <div {...rest} {...block({ ...rest })}>
            <div {...elem('details')}>
                {isLoading ? (
                    <ContentPlaceholder
                        {...elem('placeholder')}
                        height={17}
                        width={loaderWidth.current}
                    />
                ) : (
                    <Text inline>{children}</Text>
                )}
                {['number', 'string'].includes(typeof count) ? <Text inline>{count}</Text> : count}
            </div>
            <ProgressBar percentage={isLoading ? 100 : percentage} small />
        </div>
    );
};

WeightedResultBar.displayName = 'WeightedResultBar';
