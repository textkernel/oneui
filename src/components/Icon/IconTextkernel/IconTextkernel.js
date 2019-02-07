import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconTextkernel = props => (
    <IconBase {...props} viewBox="0 0 369.7 800">
        <path d="M334.3,800C203.4,766.9,89.9,681.8,89.9,543.8V248.3H0v-104H89.9V0H223.1V144.2H349.2v104H223.1V554c0,76.5,56.7,109.6,146.6,130.8Z" />
    </IconBase>
);

IconTextkernel.displayName = 'IconTextkernel';

IconTextkernel.propTypes = {
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string
};

IconTextkernel.defaultProps = {
    context: CONTEXTS[1],
    margin: null,
    size: null,
    title: null
};

export default IconTextkernel;
