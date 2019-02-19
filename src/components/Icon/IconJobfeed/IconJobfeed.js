import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconJobfeed = props => (
    <IconBase {...props} viewBox="0 0 50 93.1">
        <path d="M50,28.86a7.72,7.72,0,0,0-4.55-6.78l-5-2A11.57,11.57,0,0,0,32.65,0H32.4a11.56,11.56,0,0,0-5,1.14A11.71,11.71,0,0,0,23,4.78a11.55,11.55,0,0,0-2.2,6.79c0,.33,0,.66,0,1a.31.31,0,0,1,0,.1c0,.31.07.62.13.93,0,0,0,.08,0,.11.06.31.13.61.21.91,0,0,0,.06,0,.08.09.31.19.62.3.92a19.82,19.82,0,0,0-3.32,1.29,9.22,9.22,0,0,0-2.65,1.92A4.57,4.57,0,0,0,14.27,22v6.94L1.69,24.64h0a.9.9,0,0,0-.16,0l-.13,0a1.15,1.15,0,0,0-.26,0h0a1.05,1.05,0,0,0-.24.06h0l-.12.07-.14.07A1.1,1.1,0,0,0,.32,25a1.2,1.2,0,0,0-.31.81v19.9a.34.34,0,0,1,0,.1v0H0v0C0,46,0,46,0,46.07H0v.5a1.26,1.26,0,0,0,.35.86l0,0a1.27,1.27,0,0,0,.12.1l.05,0,.11.06.07,0,.1,0,16.53,6v30.5a1.25,1.25,0,0,0,.78,1.16l9.12,3.7V66.81c0-.48.56-.87,1.25-.87s1.25.39,1.25.87V90.08L37,93a1.27,1.27,0,0,0,.47.09h.09l9.58-3.58V52.32L48.29,52l.29-.12a2,2,0,0,0,1-.79,2.22,2.22,0,0,0,.4-1.26V29.69C50,29.55,50,29,50,28.86ZM32.72,3A8.27,8.27,0,1,1,25.11,14.5s0,0,0-.05a8.54,8.54,0,0,1-.47-1.51,0,0,0,0,0,0,0,6.49,6.49,0,0,1-.11-.77.34.34,0,0,1,0-.1,6.85,6.85,0,0,1,0-.79A8.27,8.27,0,0,1,32.72,3ZM20.53,52.22V43.75l12,4.8Zm19.58-7.54-5.89,1.83L20.53,41.06V32a1.26,1.26,0,0,0-.84-1.19l-2.92-1V22a2.1,2.1,0,0,1,.66-1.48,6.75,6.75,0,0,1,1.81-1.3l.05,0,7.8,3.05a2,2,0,0,0-.05.42V40.89a1.75,1.75,0,0,0,3.5,0V23.66L36.34,26a6.61,6.61,0,0,1,3.77,5.75Zm4.73,6.42v0h0Z" />
    </IconBase>
);

IconJobfeed.displayName = 'IconJobfeed';

IconJobfeed.propTypes = {
    /** The icon context (e.g. brand, primary, bad, good etc.) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string
};

IconJobfeed.defaultProps = {
    context: null,
    margin: null,
    size: null,
    title: null
};

export default IconJobfeed;
