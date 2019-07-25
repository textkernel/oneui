import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconHarvester = props => (
    <IconBase {...props} viewBox="0 0 714.83 798.85">
        <path d="M5.72,196.05c.9.9,4.7,6.5,5.6,7.5l35.4,45.7c7.5,10.3,22.4,17.7,36.4,19.6a20,20,0,0,0,10.3,0l86.7-9.3,151,200.5-88.6,68.1a48.94,48.94,0,0,0-9.3,68.1l82,106.1h0c16.8,21.4,34.5,44.8,50.3,65.3,49.4,64.3,275.1,9.3,275.1,9.3s111-203.3,61.5-267.6c-15.9-20.5-33.6-42.9-50.3-65.3h0l-83-106.3c-15.9-21.4-46.6-25.2-68.1-9.3l-65.3,50.3,118.4,215.4L263,202.55l-1.9-5.6,31.7-81.1c5.6-14.9,2.8-37.3-7.5-50.3l-34.5-45.7c-.9-1.9-4.7-6.5-5.6-7.5-21.4-27-92.3-8.4-157.6,42.9C21.52,105.65-14.78,169.05,5.72,196.05Zm46.6-24.2,157.6-121.3,34.5,44.8v2.8l-41,107.2h0l-113.8,13.1c-.9,0-1.9-.9-2.8-.9Z" />
    </IconBase>
);

IconHarvester.displayName = 'IconHarvester';

IconHarvester.propTypes = {
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string,
};

IconHarvester.defaultProps = {
    context: null,
    margin: null,
    size: null,
    title: null,
};

export default IconHarvester;
