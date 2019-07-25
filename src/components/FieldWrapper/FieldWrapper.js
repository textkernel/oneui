import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Button } from '../../index';
import styles from './FieldWrapper.scss';

const { block, elem } = bem({
    name: 'FieldWrapper',
    classnames: styles,
    propsToMod: ['isFocused']
});

const FieldWrapper = React.forwardRef((props, ref) => {
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
            {showClearButton && (
                <Button
                    isInline
                    context="link"
                    onClick={handleClear}
                    {...elem('clearButton', props)}
                >
                    {clearLabel}
                    <span {...elem('buttonIcon', props)}>&times;</span>
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
    onClear: PropTypes.func
};

FieldWrapper.defaultProps = {
    showClearButton: false,
    clearLabel: '',
    onClear: null
};

export default FieldWrapper;
