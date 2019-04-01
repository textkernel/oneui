import React, { Children } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ButtonIcon.scss';
import { CONTEXTS } from '../../constants';

const { block } = bem({
    name: 'ButtonIcon',
    classnames: styles,
    propsToMods: ['context', 'isActive']
});

const ButtonIcon = props => {
    const { children, ...rest } = props;

    return (
        <button {...rest} {...block(props)}>
            {Children.only(children)}
        </button>
    );
};

ButtonIcon.displayName = 'ButtonIcon';

ButtonIcon.propTypes = {
    context: PropTypes.oneOf([...CONTEXTS]),
    isActive: PropTypes.bool
};

ButtonIcon.defaultProps = {
    context: 'neutral',
    isActive: false
};

export default ButtonIcon;
