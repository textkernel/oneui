import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../Text';
import styles from './RadioButton.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';

const { block, elem } = bem({
    name: 'RadioButton',
    classnames: styles,
    propsToMods: ['disabled']
});

const RadioButton = props => {
    const { id, children, viewbox, disabled, ...rest } = props;

    return (
        <div {...block(props)}>
            <input type="radio" id={id} {...rest} {...elem('input', props)} disabled={disabled} />
            <label {...elem('label', props)} htmlFor={id} disabled={disabled}>
                <span {...elem('box', props)}>
                    <svg
                        {...elem('svg', props)}
                        width="12px"
                        height="10px"
                        viewBox={CHECKBOX_VIEWBOX}
                    >
                        <circle cx="5" cy="6" r="3" />
                    </svg>
                </span>
                <Text {...elem('text', props)} inline muted={disabled}>
                    {children}
                </Text>
            </label>
        </div>
    );
};

RadioButton.propTypes = {
    /** A unique id to reference this radio button */
    id: PropTypes.string.isRequired,
    /** If the radio button should be disabled */
    disabled: PropTypes.bool,
    /** The label for the radio button */
    children: PropTypes.string.isRequired
};

RadioButton.defaultProps = {
    disabled: false
};

export default RadioButton;
