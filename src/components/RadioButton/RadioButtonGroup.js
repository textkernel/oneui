import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import styles from './RadioButtonGroup.scss';

const { block, elem } = bem('RadioButtonGroup', styles);

const RadioButtonGroup = forwardRef((props, ref) => {
    const { children, name, onChange, ...rest } = props;

    const childProps = { name };
    if (onChange) {
        childProps.onChange = onChange;
    }

    return (
        <div ref={ref} {...rest} {...block(props)}>
            {React.Children.map(children, child => {
                if (child) {
                    return React.cloneElement(child, {
                        ...elem('option', {
                            ...props,
                            elemClassName: child.props.className,
                        }),
                        ...childProps,
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
    /** common onChange handler that will be passed to all children */
    onChange: PropTypes.func,
    /** The radio buttons */
    children: PropTypes.node.isRequired,
};

RadioButtonGroup.defaultProps = {
    onChange: null,
};

export default RadioButtonGroup;
