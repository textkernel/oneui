import * as React from 'react';
import { bem } from '../../utils/bem';
import styles from './CandidateAvatar.scss';

interface Props {
    /** Path to the avatar image resource */
    imageUrl: string;
    /** The match percentage; ranging from 0 (bad) - 100 (good) */
    matchPercentage: number;
    /** Whether to show the match percentage when hovering the image */
    showPercentageOnHover?: boolean;
    /** Avatar size (1:1 aspect ratio); should be even number */
    size?: number;
}

const { block, elem } = bem('CandidateAvatar', styles);

export const CandidateAvatar: React.FC<Props> = props => {
    const getContext = (percentage: number): 'bad' | 'warning' | 'good' => {
        if (percentage <= 33) {
            return 'bad';
        }
        if (percentage <= 66) {
            return 'warning';
        }
        return 'good';
    };

    const { imageUrl, matchPercentage, showPercentageOnHover, size = 72, ...rest } = props;

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
                height: fixedSize,
            }}
        >
            <div
                {...elem('image', props)}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
                {!!Number.isInteger(matchPercentage) && !!showPercentageOnHover && (
                    <svg {...elem('percentage', props)} viewBox="0 0 50 50">
                        <text
                            {...elem('percentage-value', props)}
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                        >
                            {`${percentage}%`}
                        </text>
                    </svg>
                )}
            </div>
            <svg
                {...elem('ring', props)}
                style={{
                    width: fixedSize,
                    height: fixedSize,
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
                            context: getContext(percentage),
                        })}
                        style={{
                            strokeDasharray,
                        }}
                    />
                )}
            </svg>
        </div>
    );
};

CandidateAvatar.displayName = 'CandidateAvatar';

CandidateAvatar.defaultProps = {
    showPercentageOnHover: false,
    size: 72,
};
