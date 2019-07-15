import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Button } from '../../index';
import styles from './InputWrapper.scss';

const { block, elem } = bem({
    name: 'InputWrapper',
    classnames: styles,
    propsToMod: ['isFocused']
});

const InputWrapper = React.forwardRef((props, ref) => {
    const handleClear = e => {
        const { onClear } = props;

        e.stopPropagation();
        if (onClear) {
            onClear(e);
        }
    };

    const { children, clearLabel, showClearButton, onClear, refKey, isFocused, ...rest } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            {children}
            {showClearButton && !isFocused && (
                <Button
                    isInline
                    context="link"
                    onClick={handleClear}
                    {...elem('clearButton', props)}
                >
                    {clearLabel}
                    <span>&times;</span>
                </Button>
            )}
        </div>
    );
});

InputWrapper.displayName = 'InputWrapper';

InputWrapper.propTypes = {
    /** clear button label */
    clearLabel: PropTypes.string.isRequired,
    /** reset the selected suggestions array to it's default value */
    onClear: PropTypes.func,
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton: PropTypes.bool,
    /** is content should be considered to be in focus */
    isFocused: PropTypes.bool
};

InputWrapper.defaultProps = {
    showClearButton: false,
    onClear: null,
    isFocused: false
};

export default InputWrapper;
