import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../utils';
import styles from './TextArea.scss';
import { SIZES } from '../../constants';

const { block } = bem('TextArea', styles);

export const TextArea = forwardRef((props, ref) => {
    const { disabled, isBlock, size, ...rest } = props;
    return <textarea {...rest} {...block(props)} ref={ref} disabled={disabled} />;
});

TextArea.displayName = 'TextArea';

// Any other attributes (value, defaultValue onChange, onKeyUp etc.) are
// supported although not defined in propTypes
TextArea.propTypes = {
    /** Should the input field be disabled or not */
    disabled: PropTypes.bool,
    /** Whether or not to show block-level textarea (full width) */
    isBlock: PropTypes.bool,
    /** The size of the textarea */
    size: PropTypes.oneOf(SIZES),
};

TextArea.defaultProps = {
    disabled: false,
    isBlock: false,
    size: 'normal',
};
