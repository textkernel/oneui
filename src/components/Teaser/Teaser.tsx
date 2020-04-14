import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Teaser.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The title of entity */
    title: SingleReactNode;
    /** The subtitle of the entity */
    subTitle?: SingleReactNode;
    /** The location of the entity */
    location?: SingleReactNode;
    /** Details related to the entity */
    details?: SingleReactNode;
}

const { block, elem } = bem('Teaser', styles);

export const Teaser: React.FC<Props> = (props) => {
    const { title, subTitle, location, details, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('titleLine', props)}>
                <Text inline context="brand" {...elem('title', props)}>
                    {title}
                </Text>
                {location && (
                    <Text inline context="muted" {...elem('location', props)}>
                        {location}
                    </Text>
                )}
            </div>
            {subTitle && (
                <Text inline context="accent" {...elem('subTitle', props)}>
                    {subTitle}
                </Text>
            )}
            {details && (
                <Text inline context="muted">
                    {details}
                </Text>
            )}
        </div>
    );
};

Teaser.displayName = 'Teaser';

Teaser.defaultProps = {
    location: '',
    subTitle: '',
    details: '',
};
