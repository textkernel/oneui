import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import bem from '../../../utils/bem';
import styles from './SearchButton.scss';

const { block, elem } = bem('SearchButton', styles);

const SearchButton = forwardRef((props, ref) => {
    const { disabled, children, type, ...rest } = props;

    return (
        <button
            {...rest}
            {...block({ ...props, withLabel: !!children })}
            ref={ref}
            type={type}
            disabled={disabled}
        >
            <FaSearch {...elem('searchIcon', { ...props, withLabel: !!children })} />
            {children}
        </button>
    );
});

SearchButton.displayName = 'SearchButton';

// Any other attributes (onClick, onFocus etc.) are
// supported although not defined in propTypes
SearchButton.propTypes = {
    /** Should button be disabled or not */
    disabled: PropTypes.bool,
    /** Type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
};

SearchButton.defaultProps = {
    disabled: false,
    type: 'button',
};

export default SearchButton;
