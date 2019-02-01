import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './ButtonGroup.scss';
import { SIZES } from '../../constants';

const { block, elem } = bem({
    name: 'ButtonGroup',
    classnames: styles,
    propsToMods: ['size', 'isBlock']
});

const ButtonGroup = props => {
    const { children, size, isBlock, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {React.Children.map(children, button =>
                React.cloneElement(button, {
                    ...button.props,
                    size,
                    ...elem('button', props)
                })
            )}
        </div>
    );
};

ButtonGroup.displayName = 'ButtonGroup';

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

export default ButtonGroup;
