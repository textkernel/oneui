import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchButton.scss';
import { MAIN_CONTEXTS } from '../../../constants';

const { block } = bem({
    name: 'SearchButton',
    classnames: styles,
    propsToMods: ['context'],
});

const SearchButton = forwardRef((props, ref) => {
    const { children, context, disabled, type, ...rest } = props;

    return (
        <button {...rest} {...block(props)} ref={ref} type={type} disabled={disabled}>
            <FaSearch />
        </button>
    );
});

SearchButton.displayName = 'SearchButton';

// Any other attributes (onClick, onFocus etc.) are
// supported although not defined in propTypes
SearchButton.propTypes = {
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context: PropTypes.oneOf(MAIN_CONTEXTS),
    /** Should button be disabled or not */
    disabled: PropTypes.bool,
    /** Type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
};

SearchButton.defaultProps = {
    context: 'primary',
    disabled: false,
    type: 'button',
};

export default SearchButton;
