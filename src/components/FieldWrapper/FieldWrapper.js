import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import { Button } from '../../index';
import styles from './FieldWrapper.scss';

const { block, elem } = bem('FieldWrapper', styles);

const FieldWrapper = React.forwardRef((props, ref) => {
    const handleClear = e => {
        const { onClear } = props;

        e.stopPropagation();
        if (onClear) {
            onClear(e);
        }
    };

    const { children, clearLabel, showClearButton, onClear, isFocused, ...rest } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            <div {...elem('content', props)}>{children}</div>

            {showClearButton && (
                <Button
                    isInline
                    context="link"
                    onClick={handleClear}
                    {...elem('clearButton', props)}
                >
                    {clearLabel}
                </Button>
            )}
        </div>
    );
});

FieldWrapper.displayName = 'FieldWrapper';

FieldWrapper.propTypes = {
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton: PropTypes.bool,
    /** clear button label */
    clearLabel: PropTypes.string,
    /** reset the selected suggestions array to it's default value */
    onClear: PropTypes.func,
    /** to style the field as it is focused */
    isFocused: PropTypes.bool,
};

FieldWrapper.defaultProps = {
    showClearButton: false,
    clearLabel: '',
    onClear: null,
    isFocused: false,
};

export default FieldWrapper;
