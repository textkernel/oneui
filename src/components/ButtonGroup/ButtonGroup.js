import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ButtonGroup.scss';
import { CONTEXTS, SIZES } from '../../constants';

const compact = obj =>
    Object.keys(obj).reduce((accumulator, k) => {
        if (obj[k] && typeof obj[k] !== typeof undefined) {
            accumulator[k] = obj[k];
        }
        return accumulator;
    }, {});

const { block, elem } = bem({
    name: 'ButtonGroup',
    classnames: styles,
    propsToMods: ['size', 'isBlock']
});

const ButtonGroup = props => {
    const { children, context, size, isBlock, ...rest } = props;

    return (
        <div {...rest} {...block(props)} role="group">
            {React.Children.map(children, button =>
                React.cloneElement(button, {
                    ...compact({
                        ...button.props,
                        context,
                        size
                    }),
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
    /** The context for all buttons in this group (e.g. brand, primary, bad, good etc.) */
    context: PropTypes.oneOf([...CONTEXTS, 'link']),
    /** Whether or not to show block-level button group (full width) */
    isBlock: PropTypes.bool,
    /** The size of the buttons in the button group */
    size: PropTypes.oneOf(SIZES)
};

ButtonGroup.defaultProps = {
    context: null,
    size: 'normal',
    isBlock: false
};

export default ButtonGroup;
