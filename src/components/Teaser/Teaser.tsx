import * as React from 'react';
import bem from '../../utils/bem';
import { Text } from '../Text';
import styles from './Teaser.scss';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
    /** The title of entity */
    title: string;
    /** The subtitle of the entity */
    subTitle?: string;
    /** The location of the entity */
    location?: string;
    /** Details related to the entity */
    details?: string;
}

const { block, elem } = bem('Teaser', styles);

const Teaser: React.FC<Props> = props => {
    const { title, subTitle, location, details, ...rest } = props;

    return (
        <p {...rest} {...block(props)}>
            <span {...elem('titleLine', props)}>
                <Text inline context="brand" title={title} {...elem('title', props)}>
                    {title}
                </Text>
                {location && (
                    <Text inline context="muted" {...elem('location', props)}>
                        {location}
                    </Text>
                )}
            </span>
            {subTitle && (
                <Text inline context="accent" title={subTitle} {...elem('subTitle', props)}>
                    {subTitle}
                </Text>
            )}
            {details && (
                <Text inline context="muted">
                    {details}
                </Text>
            )}
        </p>
    );
};

Teaser.displayName = 'Teaser';

Teaser.defaultProps = {
    location: '',
    subTitle: '',
    details: '',
};

export default Teaser;
