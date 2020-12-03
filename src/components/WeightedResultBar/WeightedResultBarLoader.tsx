import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { ProgressBar } from '../ProgressBar';
import styles from './WeightedResultBar.scss';

const { block } = bem('WeightedResultBar', styles);

export const WeightedResultBarLoader: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [percentageToShow, setPercentageToShow] = React.useState(0);

    // simulate prop change on ProgressBar to get a little animation going
    React.useEffect(() => {
        setTimeout(() => {
            setPercentageToShow(100);
        }, 0);
    }, []);

    return (
        <div {...props} {...block(props)}>
            <ContentPlaceholder height={17} width={Math.floor(Math.random() * 60) + 25} />
            <ProgressBar percentage={percentageToShow} context="neutral" small />
        </div>
    );
};

WeightedResultBarLoader.displayName = 'WeightedResultBarLoader';
