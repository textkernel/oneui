import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../../utils/bem';
import { Button } from '../../Buttons';
import styles from './PillDropdown.scss';

const { block, elem } = bem('PillDropdown', styles);

export const PillDropdown = React.forwardRef((props, ref) => {
    const { close, doneLabel, noPadding, children, ...rest } = props;

    const handleDoneClick = () => {
        close();
    };

    return (
        <div ref={ref} role="presentation" {...rest} {...block(props)}>
            <div role="dialog" {...elem('dialog', props)}>
                <div {...elem('content', props)}>{children({ close })}</div>
                <div {...elem('footer', props)}>
                    <Button context="primary" size="small" onClick={handleDoneClick}>
                        {doneLabel}
                    </Button>
                </div>
            </div>
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
    /** label for the Done button */
    doneLabel: PropTypes.string.isRequired,
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
