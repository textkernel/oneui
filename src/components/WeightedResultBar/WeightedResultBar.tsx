import * as React from 'react';
import { Context } from '../../constants';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Is component data still loading */
    isLoading?: boolean;
    /** Description of the result */
    children?: string;
    /** Color context for the weighted bar */
    context?: Context;
    /** Weight of this result in percentage */
    percentage?: number;
    /** Weight of this result in absolute number */
    count?: number;
    /** Callback to be executed if component is clicked */
    onClick?: () => void;
}

export const WeightedResultBar: React.FC<Props> = (props) => {
    const {
        isLoading = false,
        children = '',
        context = 'brand',
        percentage = 100,
        count = 0,
        ...rest
    } = props;

    return <div {...rest}>{children}</div>;
};

WeightedResultBar.displayName = 'WeightedResultBar';
