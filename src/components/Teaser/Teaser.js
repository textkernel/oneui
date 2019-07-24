import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../Text';
import styles from './Teaser.scss';

const { block, elem } = bem({
    name: 'Teaser',
    classnames: styles,
});

const Teaser = props => {
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

Teaser.propTypes = {
    /** The title of entity */
    title: PropTypes.string.isRequired,
    /** The subtitle of the entity */
    subTitle: PropTypes.string,
    /** The location of the entity */
    location: PropTypes.string,
    /** Details related to the entity */
    details: PropTypes.string,
};

Teaser.defaultProps = {
    location: '',
    subTitle: '',
    details: '',
};

export default Teaser;
