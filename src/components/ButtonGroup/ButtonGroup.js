import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './ButtonGroup.scss';
import { SIZES } from '../../constants';

const ButtonGroup = ({ children, size, block, elem, ...rest }) => (
    <div {...block()} { ...rest }>
        {React.Children.map(children, button =>
            React.cloneElement(button, {
                ...button.props,
                size,
                ...elem('button')
            })
        )}
    </div>
);

ButtonGroup.propTypes = {
    /** The buttons in this group */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The size of the buttons in the button group */
    size: PropTypes.oneOf(SIZES),
    /** whether or not to show block-level button group (full width) */
    isBlock: PropTypes.bool
};

ButtonGroup.defaultProps = {
    size: 'normal',
    isBlock: false
};

ButtonGroup.propsToMods = ['size', 'isBlock'];

export default bem(styles)(ButtonGroup);
