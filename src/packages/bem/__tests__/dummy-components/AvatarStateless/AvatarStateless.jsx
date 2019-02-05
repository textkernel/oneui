import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../..';
import classnamesMap from './classnamesMap.json';

const { block, elem } = bem({
    name: 'AvatarStateless',
    classnames: classnamesMap,
    propsToMods: [],
});

const calculateOutlineColor = (match) => {
    if (match > 77) return 'green';
    if (match > 33) return 'yellow';
    if (match >= 0) return 'red';
    return 'red';
}

const calculateIsPerfect = (match) => match === 100;

const calculateUnmatchScore = (match) => 100 - match;

const AvatarStateless = (props) => {

    const { match, children } = props;
    const outlineColor = calculateOutlineColor(match);
    const isPerfect = calculateIsPerfect(match);
    const unmatchScore = calculateUnmatchScore(match);
    const extraMods = {
        outlineColor, // String mod
        unmatchScore, // Number mod
        isPerfect, // Boolean mod
    };

    return (
        <div {...block(props, extraMods)}>
            <div {...elem('image', props, extraMods)}>
                {children}
            </div>
        </div>
    );
    
};

AvatarStateless.displayName = 'AvatarStateless';

AvatarStateless.propTypes = {
    match: PropTypes.number,
}

AvatarStateless.defaultProps = {
    match: 0,
}

export default AvatarStateless;
