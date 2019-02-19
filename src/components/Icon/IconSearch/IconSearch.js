import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconSearch = props => (
    <IconBase {...props} viewBox="0 0 92.34 92.43">
        <path d="M49,48.84H23.66V44.35a6.23,6.23,0,0,1,6.18-6.17h3.37V35.26a8.49,8.49,0,0,1-3.26-7c0-4.38,2.92-8,6.51-8s6.52,3.6,6.52,8a8.82,8.82,0,0,1-3.26,7v2.92h3.37a6.22,6.22,0,0,1,6.17,6.17v4.49Z" />
        <path d="M91,74.44c-7.74-6.4-15.72-13.13-23.91-20a36.14,36.14,0,0,0-5.5-43.91A35.52,35.52,0,0,0,36.13,0a36.16,36.16,0,0,0-25.6,61.76,36.23,36.23,0,0,0,44,5.5C61.28,75.34,68,83.43,74.42,91.17a3.36,3.36,0,0,0,3.81,1A29.38,29.38,0,0,0,92,78.37,3.33,3.33,0,0,0,91,74.44Zm-72-21.22A24.15,24.15,0,0,1,36.13,12,24.09,24.09,0,1,1,19.06,53.22Z" />
    </IconBase>
);

IconSearch.displayName = 'IconSearch';

IconSearch.propTypes = {
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

IconSearch.defaultProps = {
    context: null,
    margin: null,
    size: null,
    title: null
};

export default IconSearch;
