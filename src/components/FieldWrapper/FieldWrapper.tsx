import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { bem } from '../../utils';
import { Button } from '../Buttons';
import styles from './FieldWrapper.scss';

const { block, elem } = bem('FieldWrapper', styles);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** content of the wrapper */
    children: NotEmptyReactNode;
    /** show dropdown icon */
    showArrow?: boolean;
    /** set direction of dropdown icon (default drop down) */
    isArrowUp?: boolean;
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton?: boolean;
    /** clear button label */
    clearLabel?: string;
    /** reset the selected suggestions array to it's default value */
    onClear?: ((e) => void) | null;
    /** to style the field as it is focused */
    isFocused?: boolean;
    /** defines if the component is disabled */
    disabled?: boolean;
}

export const FieldWrapper: React.FC<Props> = React.forwardRef((props, ref) => {
    const handleClear = (e) => {
        const { onClear } = props;

        e.stopPropagation();
        if (onClear) {
            onClear(e);
        }
    };

    const {
        children,
        showArrow,
        isArrowUp,
        clearLabel,
        showClearButton,
        onClear,
        isFocused,
        ...rest
    } = props;

    return (
        <div ref={ref} {...rest} {...block(props)}>
            <div {...elem('content', props)}>{children}</div>

            {showClearButton && (
                <Button
                    isInline
                    context="link"
                    onClick={handleClear}
                    title={clearLabel}
                    {...elem('clearButton', { ...props, rightIndent: showArrow })}
                >
                    {clearLabel}
                </Button>
            )}

            {showArrow &&
                (isArrowUp ? (
                    <IoMdArrowDropup {...elem('dropdownIcon')} />
                ) : (
                    <IoMdArrowDropdown {...elem('dropdownIcon')} />
                ))}
        </div>
    );
});

FieldWrapper.displayName = 'FieldWrapper';

FieldWrapper.defaultProps = {
    showArrow: false,
    isArrowUp: false,
    showClearButton: false,
    clearLabel: '',
    onClear: null,
    isFocused: false,
    disabled: false,
};
