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

export const FieldWrapper = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            showArrow = false,
            isArrowUp = false,
            clearLabel = '',
            showClearButton = false,
            onClear = null,
            isFocused = false,
            disabled = false,
            ...rest
        },
        ref
    ) => {
        const handleClear = (e) => {
            e.stopPropagation();
            if (onClear) {
                onClear(e);
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ isFocused, disabled, ...rest })}>
                <div {...elem('content')}>{children}</div>

                {showClearButton && (
                    <Button
                        isInline
                        context="link"
                        onClick={handleClear}
                        title={clearLabel}
                        {...elem('clearButton', { rightIndent: showArrow })}
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
    }
);

FieldWrapper.displayName = 'FieldWrapper';
