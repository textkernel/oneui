import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Checkbox.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';

const { block, elem } = bem({
    name: 'Checkbox',
    classnames: styles,
    propsToMods: ['disabled']
});

const Checkbox = props => {
    const { id, children, viewbox, disabled, ...rest } = props;

    return (
        <label {...block(props)} htmlFor={id} disabled={disabled}>
            <input
                type="checkbox"
                id={id}
                {...rest}
                {...elem('input', props)}
                disabled={disabled}
            />
            <span {...elem('box', props)}>
                <svg {...elem('svg', props)} width="12px" height="10px" viewBox={viewbox}>
                    <polyline points="1.5 6 3.5 9 8 3" />
                </svg>
            </span>
            <span {...elem('text', props)}>{children}</span>
        </label>
    );
};

Checkbox.propTypes = {
    /** A unique id to reference this checkbox */
    id: PropTypes.string.isRequired,
    /** If the checkbox should be disabled */
    disabled: PropTypes.bool,
    /** The label for the checkbox */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Viewbox dimentions, allows to costumise the checkbox */
    viewbox: PropTypes.arrayOf(PropTypes.number)
};

Checkbox.defaultProps = {
    disabled: false,
    viewbox: CHECKBOX_VIEWBOX
};

export default Checkbox;
