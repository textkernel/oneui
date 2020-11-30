import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { ProgressBar } from '../ProgressBar';
import styles from './WeightedResultBar.scss';

const { block } = bem('WeightedResultBar', styles);

export const WeightedResultBarLoader: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} {...block(props)}>
            <ContentPlaceholder height={17} width={Math.floor(Math.random() * 60) + 25} />
            <ProgressBar percentage={100} context="neutral" small />
        </div>
    );
};

WeightedResultBarLoader.displayName = 'WeightedResultBarLoader';
