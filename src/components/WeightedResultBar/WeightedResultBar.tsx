import * as React from 'react';
import { bem } from '../../utils';
import { Context } from '../../constants';
import { ProgressBar } from '../ProgressBar';
import { Text } from '../Text';
import styles from './WeightedResultBar.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Description of the result */
    children: string;
    /** Weight of this result in percentage */
    percentage: number;
    /** Weight of this result in absolute number */
    count: number;
    /** Color context for the weighted bar */
    context?: Context;
}

const { block, elem } = bem('WeightedResultBar', styles);

export const WeightedResultBar: React.FC<Props> = (props) => {
    const { children, percentage, count, context, ...rest } = props;
    const [percentageToShow, setPercentageToShow] = React.useState(100);

    // simulate prop change on ProgressBar to get a little animation going
    React.useEffect(() => {
        setTimeout(() => {
            setPercentageToShow(percentage);
        }, 0);
    }, [percentage]);

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('details', props)}>
                <Text inline>{children}</Text>
                <Text inline>{count}</Text>
            </div>
            <ProgressBar percentage={percentageToShow} context={context} small />
        </div>
    );
};

WeightedResultBar.displayName = 'WeightedResultBar';

WeightedResultBar.defaultProps = {
    context: 'brand',
};
