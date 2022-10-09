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
    /** The title of entity */
    title: SingleReactNode;
    /** The subtitle of the entity */
    subTitle?: SingleReactNode;
    /** The location of the entity */
    location?: SingleReactNode;
    /** Details related to the entity */
    details?: SingleReactNode;
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
            title={subTitle}
            context={disabled ? 'muted' : 'secondary'}
            {...elem('subTitle')}
        >
            {subTitle}
        </Text>
    );
    const detailsElement = (
        <Text inline title={details} context="muted" {...elem('details')}>
            {details}
        </Text>
    );
    return (
        <div {...rest} {...block()}>
            <div {...elem('line')}>
                <Text
                    inline
                    context={disabled ? 'muted' : 'primary'}
                    {...elem('title')}
                    title={title}
                >
                    {title}
                </Text>
                {location && (
                    <Text inline context="muted" {...elem('location')}>
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
                                    <Text inline context="muted" size="small">
                                        {label}
                                    </Text>
                                </Tooltip>
                                {index < statuses.length - 1 && (
                                    <Text inline context="muted" size="small">
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
