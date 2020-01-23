import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { bem } from '../../../utils';
import styles from './SearchButton.scss';

const { block, elem } = bem('SearchButton', styles);

export const SearchButton = forwardRef((props, ref) => {
    const { disabled, children, type, ...rest } = props;
    const propsForBem = { ...props, withLabel: !!children };

    return (
        <button {...rest} {...block(propsForBem)} ref={ref} type={type} disabled={disabled}>
            <FaSearch {...elem('searchIcon', propsForBem)} />
            {children}
        </button>
    );
});

SearchButton.displayName = 'SearchButton';

// Any other attributes (onClick, onFocus etc.) are
// supported although not defined in propTypes
SearchButton.propTypes = {
    /** Label for the button */
    children: PropTypes.string,
    /** Should button be disabled or not */
    disabled: PropTypes.bool,
    /** Type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
};

SearchButton.defaultProps = {
    children: '',
    disabled: false,
    type: 'button',
};
