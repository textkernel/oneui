import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../../Text';
import styles from './JobResult.scss';

const { block, elem } = bem({
    name: 'JobResult',
    classnames: styles
});

const JobResult = props => {
    const { title, location, organization, details, ...rest } = props;

    return (
        <p {...rest} {...block(props)}>
            <span {...elem('titleLine', props)}>
                {typeof title === 'string' ? (
                    <Text inline context="brand" title={title} {...elem('title', props)}>
                        {title}
                    </Text>
                ) : (
                    title
                )}
                {location && typeof location === 'string' ? (
                    <Text inline context="muted" {...elem('location', props)}>
                        {location}
                    </Text>
                ) : (
                    location
                )}
            </span>
            {organization && typeof organization === 'string' ? (
                <Text inline context="accent" {...elem('organization', props)}>
                    {organization}
                </Text>
            ) : (
                organization
            )}
            {details && typeof details === 'string' ? (
                <Text inline context="muted" {...elem('details', props)}>
                    {details}
                </Text>
            ) : (
                details
            )}
        </p>
    );
};

JobResult.displayName = 'JobResult';

JobResult.propTypes = {
    /** The job's title. Note: when using node and not string text formatting will not be applied */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The location of the job. Note: when using node and not string text formatting will not be applied */
    location: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** The organization that posted this job. Note: when using node and not string text formatting will not be applied */
    organization: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Details related to this job. Note: when using node and not string text formatting will not be applied */
    details: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

JobResult.defaultProps = {
    location: '',
    organization: '',
    details: ''
};

export default JobResult;
