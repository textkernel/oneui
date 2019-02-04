import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './TextArea.scss';
import { CONTEXTS, SIZES } from '../../constants';

const { block } = bem({
    name: 'TextArea',
    classnames: styles,
    propsToMods: ['context', 'isBlock', 'size']
});

const TextArea = forwardRef((props, ref) => {
    const { context, disabled, isBlock, size, ...rest } = props;
    return <textarea {...rest} {...block(props)} disabled={disabled} ref={ref} />;
});

TextArea.displayName = 'TextArea';

// Any other attributes (value, defaultValue onChange, onKeyUp etc.) are
// supported although not defined in propTypes
TextArea.propTypes = {
    /** The textarea context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Should the input field be disabled or not */
    disabled: PropTypes.bool,
    /** Whether or not to show block-level textarea (full width) */
    isBlock: PropTypes.bool,
    /** The size of the textarea */
    size: PropTypes.oneOf(SIZES)
};

TextArea.defaultProps = {
    context: 'brand',
    disabled: false,
    isBlock: false,
    size: 'normal'
};

export default TextArea;
