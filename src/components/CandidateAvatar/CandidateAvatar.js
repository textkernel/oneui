import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './CandidateAvatar.scss';

const { block, elem } = bem({
    name: 'CandidateAvatar',
    classnames: styles,
    propsToMods: ['context']
});

const context = percentage => {
    if (percentage <= 33) {
        return 'bad';
    }
    if (percentage <= 66) {
        return 'warning';
    }
    return 'good';
};

const CandidateAvatar = props => {
    const { imageUrl, matchPercentage, ...rest } = props;

    const radius = 34;
    const percentage = Math.max(0, Math.min(100, matchPercentage));
    const circumference = 2 * radius * Math.PI;
    const strokeDasharray = `${(percentage * circumference) / 100} 999`;

    return (
        <div {...rest} {...block(props)}>
            <div
                {...elem('image', props)}
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            >
                <div {...elem('percentage', props)}>{`${percentage}%`}</div>
            </div>
            <svg {...elem('ring', props)}>
                <circle
                    r="34"
                    cx="36"
                    cy="36"
                    strokeWidth="4"
                    {...elem('circle', {
                        ...props,
                        context: context(percentage)
                    })}
                    style={{
                        strokeDasharray
                    }}
                />
            </svg>
        </div>
    );
};

CandidateAvatar.propTypes = {
    imageUrl: PropTypes.string,
    matchPercentage: PropTypes.number
};

CandidateAvatar.defaultProps = {
    imageUrl: null,
    matchPercentage: null
};

export default CandidateAvatar;
