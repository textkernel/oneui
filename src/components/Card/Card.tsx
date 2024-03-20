import React from 'react';
import { Text } from '../Text';
import { Heading } from '../Heading';
import styles from './Card.scss';

export interface Props {
    title: string;
    subtitle?: string;
    trailing?: string | number;
}

export const Card = ({ title, subtitle, trailing }: Props) => (
    <div className={styles.container}>
        <div className={styles.leftColumn}>
            <Heading level="h3" className={styles.title}>
                {title}
            </Heading>
            {subtitle && (
                <Text inline className={styles.subtitle}>
                    {subtitle}
                </Text>
            )}
        </div>
        {typeof trailing !== 'undefined' && (
            <div className={styles.trailing}>
                <Heading level="h1">{trailing}</Heading>
            </div>
        )}
    </div>
);

Card.displayName = 'Card';
