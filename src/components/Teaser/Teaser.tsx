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

export const Teaser: React.FC<Props> = (props) => {
    const { title, subTitle, location, details, statuses, disabled, ...rest } = props;

    const subTitleElement = (
        <Text
            inline
            title={subTitle}
            context={disabled ? 'muted' : 'secondary'}
            {...elem('subTitle', props)}
        >
            {subTitle}
        </Text>
    );
    const detailsElement = (
        <Text inline title={details} context="muted" {...elem('details', props)}>
            {details}
        </Text>
    );
    return (
        <div {...rest} {...block(props)}>
            <div {...elem('line', props)}>
                <Text
                    inline
                    context={disabled ? 'muted' : 'primary'}
                    {...elem('title', props)}
                    title={title}
                >
                    {title}
                </Text>
                {location && (
                    <Text inline context="muted" {...elem('location', props)}>
                        {location}
                    </Text>
                )}
            </div>
            <div {...elem('line', props)}>
                {subTitle && subTitleElement}
                {!subTitle && details && detailsElement}
            </div>
            <div {...elem('line', props)}>
                {subTitle && details && detailsElement}
                {statuses && statuses.length > 0 && (
                    <div {...elem('statuses', props)}>
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

Teaser.defaultProps = {
    location: '',
    subTitle: '',
    details: '',
    disabled: false,
};
