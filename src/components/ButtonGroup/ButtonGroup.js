import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './ButtonGroup.scss';
import { SIZES } from '../../constants';

const ButtonGroup = ({ children, size, style, block, elem }) => (
    <div
        {...block()}
        style={style}
    >
        { React.Children.map(children, button => (
            React.cloneElement(button, {
                ...button.props,
                size,
                ...elem('Button')
            })
        )) }
    </div>
);

ButtonGroup.propTypes = {
    /** The buttons in this group */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The size of the button */
    size: PropTypes.oneOf(SIZES),
    /** whether or not to show block - level button(full width) */
    isBlock: PropTypes.bool,
    /** inline styles */
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** additional class names */
    className: PropTypes.string
};

ButtonGroup.defaultProps = {
    size: 'normal',
    isBlock: false,
    style: null,
    className: ''
};

ButtonGroup.propsToMods = ['size', 'isBlock'];

export default bem(styles)(ButtonGroup);
