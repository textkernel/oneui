import React from 'react';

const ButtonStateless = (props) => (
    <button { ...props.block() } type="button">
        <span { ...props.elem('icon') } />
        <span { ...props.elem('label') }>
            {props.children}
        </span>
    </button>
);

ButtonStateless.propsToMods = ['active'];

export default ButtonStateless;
