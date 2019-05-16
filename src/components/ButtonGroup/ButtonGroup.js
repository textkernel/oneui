import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ButtonGroup.scss';
import { SIZES } from '../../constants';

const { block, elem } = bem({
    name: 'ButtonGroup',
    classnames: styles,
    propsToMods: ['size', 'isBlock', 'isInline']
});

const ButtonGroup = props => {
    const { children, size, isBlock, isInline, ...rest } = props;

    return (
        <div {...rest} {...block(props)} role="group">
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
    /** Whether or not to show block-level button group (full width) */
    isBlock: PropTypes.bool,
    /** Whether or not to show button group as inline element */
    isInline: PropTypes.bool,
    /** The size of the buttons in the button group */
    size: PropTypes.oneOf(SIZES)
};

ButtonGroup.defaultProps = {
    size: 'normal',
    isBlock: false,
    isInline: false
};

export default ButtonGroup;
