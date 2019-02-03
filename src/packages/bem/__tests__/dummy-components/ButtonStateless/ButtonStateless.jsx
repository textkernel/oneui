import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../';
import classnamesMap from './classnamesMap.json';

const { block, elem } = bem({
    name: 'ButtonStateless',
    classnames: classnamesMap,
    propsToMods: ['active', 'disabled', 'context', 'size']
});

const ButtonStateless = (props) => (
    <button {...block(props)} type="button">
        <span {...elem('icon', props)} />
        <span {...elem('label', props)}>
            {props.children}
        </span>
    </button>
);

ButtonStateless.displayName = 'ButtonStateless';

ButtonStateless.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    context: PropTypes.string,
    size: PropTypes.oneOf([1, 2, 3]),
};

ButtonStateless.defaultProps = {
    active: false,
    disabled: false,
    context: 'default',
    size: 1,
};

export default ButtonStateless;
