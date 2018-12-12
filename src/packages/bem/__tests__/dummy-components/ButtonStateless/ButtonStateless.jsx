import React from 'react';
import bem from '../../../';
import classnamesMap from './classnamesMap.json';

const { block, elem } = bem({
    name: 'ButtonStateless',
    classnames: classnamesMap,
    propsToMods: ['active', 'disabled', 'context']
});

const ButtonStateless = (props) => (
    <button {...block(props)} type="button">
        <span {...elem('icon', props)} />
        <span {...elem('label', props)}>
            {props.children}
        </span>
    </button>
);

export default ButtonStateless;
