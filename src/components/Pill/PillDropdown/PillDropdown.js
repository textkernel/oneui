import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './PillDropdown.scss';

const { block } = bem({
    name: 'PillDropdown',
    classnames: styles,
    propsToMods: ['noPadding'],
});

const PillDropdown = React.forwardRef((props, ref) => {
    const { close, noPadding, children, ...rest } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            {children({ close })}
        </div>
    );
});

PillDropdown.displayName = 'PillDropdown';

PillDropdown.propTypes = {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} - see below
     */
    children: PropTypes.func.isRequired,
    /** function that closes the dropdown */
    close: PropTypes.func,
    /** whether or not to add a padding to the dropdown container.
     * It is useful if you need to add elements that stretch to the edge of the container.
     * You can use the CSS variable --pill-dropdown-padding to add padding as required.
     * */
    noPadding: PropTypes.bool,
};

PillDropdown.defaultProps = {
    close: null,
    noPadding: false,
};

export default PillDropdown;
