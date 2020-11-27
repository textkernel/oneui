import * as React from 'react';
import { Context } from '../../constants';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Description of the result */
    children: string;
    /** Weight of this result in percentage */
    percentage: number;
    /** Weight of this result in absolute number */
    count: number;
    /** Callback to be executed if component is clicked */
    onClick?: () => void;
    /** Color context for the weighted bar */
    context?: Context;
}

export const WeightedResultBar: React.FC<Props> = (props) => {
    const { children, percentage, count, context, ...rest } = props;

    return <div {...rest}>{children}</div>;
};

WeightedResultBar.displayName = 'WeightedResultBar';

WeightedResultBar.defaultProps = {
    context: 'brand',
};
