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
    const { imageUrl, matchPercentage, showPercentageOnHover, size, ...rest } = props;

    const fixedSize = Math.round(Math.max(32, size));
    const radius = (fixedSize / 2) - 2;
    const percentage = Math.max(0, Math.min(100, matchPercentage));
    const circumference = 2 * radius * Math.PI;
    const strokeDasharray = `${(percentage * circumference) / 100} 999`;

    return (
        <div {...rest} {...block(props)}
            style={{
                width: fixedSize,
                height: fixedSize
            }}
        >
            <div
                {...elem('image', props)}
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            >
                { !!showPercentageOnHover && (
                    <div {...elem('percentage', props)}>{`${percentage}%`}</div>
                )}
            </div>
            <svg {...elem('ring', props)}
                style={{
                    width: fixedSize,
                    height: fixedSize
                }}
            >
                <circle
                    r={ radius}
                    cx={ fixedSize / 2}
                    cy={ fixedSize / 2 }
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
    matchPercentage: PropTypes.number,
    showPercentageOnHover: PropTypes.bool,
    size: PropTypes.number
};

CandidateAvatar.defaultProps = {
    imageUrl: null,
    matchPercentage: null,
    showPercentageOnHover: false,
    size: 72
};

export default CandidateAvatar;
