import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './RadioButtonGroup.scss';

const { block, elem } = bem({
    name: 'RadioButtonGroup',
    classnames: styles,
});

const RadioButtonGroup = forwardRef((props, ref) => {
    const { children, name, ...rest } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            {React.Children.map(children, child => {
                if (child) {
                    return React.cloneElement(child, {
                        ...elem('option', props, child.props.className),
                        name,
                    });
                }
                return null;
            })}
        </div>
    );
});

RadioButtonGroup.displayName = 'RadioButtonGroup';

RadioButtonGroup.propTypes = {
    /** The name of the group this radio button belongs to */
    name: PropTypes.string.isRequired,
    /** The radio buttons */
    children: PropTypes.node.isRequired,
};

export default RadioButtonGroup;
