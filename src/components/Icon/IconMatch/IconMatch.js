import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { ALL_COLOR_CONTEXTS } from '../../../constants';

const IconMatch = props => (
    <IconBase {...props} viewBox="0 0 107.17 92.73">
        <path d="M0,92.73V80.35A11.25,11.25,0,0,1,11.07,68.91h6.12V63.52c-3.52-2.55-6-7.4-6-12.92,0-8.21,5.21-14.8,11.72-14.8s11.72,6.59,11.72,14.8c0,5.52-2.48,10.37-6,12.92v5.39h6.12A11.25,11.25,0,0,1,45.84,80.35V92.73Z" />
        <path d="M101.7,0H36.2a5.65,5.65,0,0,0-5.6,5.79v25.3C36.72,34.45,41,41.86,41,50.47a25.62,25.62,0,0,1-.39,4.44H50.91V51.14a3.78,3.78,0,1,1,7.56,0v3.77H78.26V51.14a3.78,3.78,0,1,1,7.55,0v3.77h15.76a5.66,5.66,0,0,0,5.6-5.79V5.79A5.48,5.48,0,0,0,101.7,0ZM81.77,40.11H55.34V35.26a6.5,6.5,0,0,1,6.38-6.59h3.52v-3.1a9,9,0,0,1-3.39-7.4c0-4.71,3-8.61,6.77-8.61s6.77,3.9,6.77,8.61a9,9,0,0,1-3.51,7.4v3.1h3.51a6.5,6.5,0,0,1,6.38,6.59v4.85Z" />
    </IconBase>
);

IconMatch.displayName = 'IconMatch';

IconMatch.propTypes = {
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(ALL_COLOR_CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string
};

IconMatch.defaultProps = {
    context: ALL_COLOR_CONTEXTS[3],
    margin: null,
    size: null,
    title: null
};

export default IconMatch;
