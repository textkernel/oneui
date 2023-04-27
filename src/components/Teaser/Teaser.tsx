import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import styles from './Teaser.scss';

type Status = {
    label: string;
    tooltip: string;
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The title of entity. Note: it is rendered within a <span> */
    title: React.ReactNode;
    /** The subtitle of the entity. Note: it is rendered within a <span> */
    subTitle?: React.ReactNode;
    /** The location of the entity. Note: it is rendered within a <span> */
    location?: React.ReactNode;
    /** Details related to the entity. Note: it is rendered within a <span> */
    details?: React.ReactNode;
    /** Statuses of entity containing status label and tooltip message */
    statuses?: Status[];
    /** Style the component as disabled */
    disabled?: boolean;
}

const { block, elem } = bem('Teaser', styles);

export const Teaser: React.FC<Props> = ({
    title,
    subTitle = '',
    location = '',
    details = '',
    statuses,
    disabled = false,
    ...rest
}) => {
    const subTitleElement = (
        <Text
            inline
            title={typeof subTitle === 'string' ? subTitle : undefined}
            context={disabled ? 'neutral' : 'background'}
            {...elem('subTitle')}
        >
            {subTitle}
        </Text>
    );
    const detailsElement = (
        <Text
            inline
            title={typeof details === 'string' ? details : undefined}
            context="neutral"
            {...elem('details')}
        >
            {details}
        </Text>
    );
    return (
        <div {...rest} {...block({ ...rest })}>
            <div {...elem('line')}>
                <Text
                    inline
                    context={disabled ? 'neutral' : 'foreground'}
                    {...elem('title')}
                    title={typeof title === 'string' ? title : undefined}
                >
                    {title}
                </Text>
                {location && (
                    <Text inline context="neutral" {...elem('location')}>
                        {location}
                    </Text>
                )}
            </div>
            <div {...elem('line')}>
                {subTitle && subTitleElement}
                {!subTitle && details && detailsElement}
            </div>
            <div {...elem('line')}>
                {subTitle && details && detailsElement}
                {statuses && statuses.length > 0 && (
                    <div {...elem('statuses')}>
                        {statuses.map(({ label, tooltip }, index) => (
                            <span key={label}>
                                <Tooltip content={tooltip}>
                                    <Text inline context="neutral" size="small">
                                        {label}
                                    </Text>
                                </Tooltip>
                                {index < statuses.length - 1 && (
                                    <Text inline context="neutral" size="small">
                                        {' & '}
                                    </Text>
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

Teaser.displayName = 'Teaser';
