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

    const constrainedSize = Math.round(Math.max(32, size));
    const fixedSize = constrainedSize % 2 === 0 ? constrainedSize : constrainedSize + 1; // force even number
    const isSmall = fixedSize < 60;
    const strokeWidth = isSmall ? 2 : 4;
    const radiusCorrection = isSmall ? 3 : 2;
    const radius = fixedSize / 2 - radiusCorrection;
    const percentage = Math.max(0, Math.min(100, matchPercentage));
    const circumference = 2 * radius * Math.PI;
    const strokeDasharray = `${(percentage * circumference) / 100} 999`;

    return (
        <div
            {...rest}
            {...block(props)}
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
                {!!Number.isInteger(matchPercentage) &&
                    !!showPercentageOnHover && (
                        <div {...elem('percentage', props)}>{`${percentage}%`}</div>
                    )}
            </div>
            <svg
                {...elem('ring', props)}
                style={{
                    width: fixedSize,
                    height: fixedSize
                }}
            >
                {!!Number.isInteger(matchPercentage) && (
                    <circle
                        r={radius}
                        cx={fixedSize / 2}
                        cy={fixedSize / 2}
                        strokeWidth={strokeWidth}
                        {...elem('circle', {
                            ...props,
                            context: context(percentage)
                        })}
                        style={{
                            strokeDasharray
                        }}
                    />
                )}
            </svg>
        </div>
    );
};

CandidateAvatar.propTypes = {
    /** Path to the avatar image resource */
    imageUrl: PropTypes.string,
    /** The match percentage, ranging from 0 (bad) - 100 (good) */
    matchPercentage: PropTypes.number,
    /** Whether to show the match percentage when hovering the image */
    showPercentageOnHover: PropTypes.bool,
    /** Avatar size (1:1 aspect ratio), should be even number */
    size: PropTypes.number
};

CandidateAvatar.defaultProps = {
    imageUrl: null,
    matchPercentage: null,
    showPercentageOnHover: false,
    size: 72
};

export default CandidateAvatar;
