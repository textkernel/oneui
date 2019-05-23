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
                <Text inline context="brand" title={title} {...elem('title', props)}>
                    {title}
                </Text>
                {location && (
                    <Text inline context="muted" {...elem('location', props)}>
                        {location}
                    </Text>
                )}
            </span>
            {organization && (
                <Text inline context="accent" title={organization} {...elem('organization', props)}>
                    {organization}
                </Text>
            )}
            {details && (
                <Text inline context="muted" {...elem('details', props)}>
                    {details}
                </Text>
            )}
        </p>
    );
};

JobResult.displayName = 'JobResult';

JobResult.propTypes = {
    /** The job's title. */
    title: PropTypes.string.isRequired,
    /** The location of the job. */
    location: PropTypes.string,
    /** The organization that posted this job. */
    organization: PropTypes.string,
    /** Details related to this job. */
    details: PropTypes.string
};

JobResult.defaultProps = {
    location: '',
    organization: '',
    details: ''
};

export default JobResult;
