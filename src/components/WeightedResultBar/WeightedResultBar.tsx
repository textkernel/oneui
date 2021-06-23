import * as React from 'react';
import { bem } from '../../utils';
import { Context } from '../../constants';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { ProgressBar } from '../ProgressBar';
import { Text } from '../Text';
import styles from './WeightedResultBar.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Description of the result */
    children: string;
    /** Weight of this result in percentage */
    percentage: number;
    /** A react node with a weight of this result in absolute number */
    count: NotEmptySingleReactNode;
    /** Color context for the weighted bar */
    context?: Context;
    /** Whether or not to render loading state */
    isLoading?: boolean;
}

const { block, elem } = bem('WeightedResultBar', styles);

export const WeightedResultBar: React.FC<Props> = (props) => {
    const { children, percentage, count, context, isLoading, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('details', props)}>
                {isLoading ? (
                    <ContentPlaceholder
                        {...elem('placeholder', props)}
                        height={17}
                        width={Math.floor(Math.random() * 60) + 25}
                    />
                ) : (
                    <Text inline>{children}</Text>
                )}
                {['number', 'string'].includes(typeof count) ? <Text inline>{count}</Text> : count}
            </div>
            <ProgressBar
                percentage={isLoading ? 100 : percentage}
                context={isLoading ? 'neutral' : context}
                small
            />
        </div>
    );
};

WeightedResultBar.displayName = 'WeightedResultBar';

WeightedResultBar.defaultProps = {
    context: 'brand',
};
