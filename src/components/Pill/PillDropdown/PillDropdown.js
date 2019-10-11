import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './PillDropdown.scss';

const { block } = bem({
    name: 'PillDropdown',
    classnames: styles,
});

const PillDropdown = React.forwardRef((props, ref) => {
    const { close, innerPadding, children, ...rest } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            {children({
                close,
                innerPadding,
            })}
        </div>
    );
});

PillDropdown.displayName = 'PillDropdown';

PillDropdown.propTypes = {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} - see below
     *   * innerPadding {string} - see below
     */
    children: PropTypes.func.isRequired,
    /** function that closes the dropdown */
    close: PropTypes.func,
    /** style that can be applied inside the component to set consistent padding */
    innerPadding: PropTypes.string,
};

PillDropdown.defaultProps = {
    close: null,
    innerPadding: '',
};

export default PillDropdown;
