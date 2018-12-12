import React from 'react';

const ButtonStateless = (props) => (
    <button { ...props.bem.block() } type="button">
        <span { ...props.bem.elem('icon') } />
        <span { ...props.bem.elem('label') }>
            {props.children}
        </span>
    </button>
);

ButtonStateless.propsToMods = ['active', 'context'];

export default ButtonStateless;
