import React from 'react';
import PropTypes from 'prop-types';

const ButtonStateless = (props) => (
    <button { ...props.block() } type="button">
        <span { ...props.elem('icon') } />
        <span { ...props.elem('label') }>
            {props.children}
        </span>
    </button>
);

ButtonStateless.propTypes = {
    active: PropTypes.bool,
    context: PropTypes.string,
};

ButtonStateless.defaultProps = {
    active: false,
    context: 'info',
};

ButtonStateless.propsToMods = ['active', 'context'];

export default ButtonStateless;
