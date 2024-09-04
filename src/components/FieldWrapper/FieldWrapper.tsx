import * as React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdClear } from 'react-icons/md';
import { bem } from '../../utils';
import { Button } from '../Buttons';
import { ENTER_KEY } from '../../constants';
import styles from './FieldWrapper.scss';

const { block, elem } = bem('FieldWrapper', styles);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** content of the wrapper */
    children: React.ReactNode;
    /** show dropdown icon */
    showArrow?: boolean;
    /** set direction of dropdown icon (default drop down) */
    isArrowUp?: boolean;
    /** a callback for the arrow when it is clicked */
    onArrowClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    /** show Clear button on hover even if there are no selectedSuggestions passed */
    showClearButton?: boolean;
    /** clear button label */
    clearTooltipLabel?: string;
    /** reset the selected suggestions array to it's default value */
    onClear?: ((e) => void) | null;
    /** to style the field as it is focused */
    isFocused?: boolean;
    /** defines if the component is disabled */
    disabled?: boolean;
    /** Down arrow name for ARIA labelling */
    downArrowLabel?: string;
    /** Up arrow name for ARIA labelling */
    upArrowLabel?: string;
}

export const FieldWrapper = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            showArrow = false,
            isArrowUp = false,
            onArrowClick,
            clearTooltipLabel,
            showClearButton = false,
            onClear = null,
            isFocused = false,
            disabled = false,
            downArrowLabel,
            upArrowLabel,
            ...rest
        },
        ref
    ) => {
        if (!children) {
            return null;
        }

        const handleClear = (e) => {
            e.stopPropagation();
            if (onClear) {
                onClear(e);
            }
        };

        const handleArrowClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onArrowClick?.(e);
        };

        const handleArrowKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === ENTER_KEY) {
                e.stopPropagation();
                onArrowClick?.(e);
            }
        };

        return (
            <div ref={ref} {...rest} {...block({ isFocused, disabled, ...rest })}>
                <div {...elem('content')}>{children}</div>

                {showClearButton && (
                    <Button
                        size="small"
                        variant="ghost"
                        onClick={handleClear}
                        title={clearTooltipLabel}
                        {...elem('clearButton', { rightIndent: showArrow })}
                    >
                        <MdClear size={16} role="img" aria-label={clearTooltipLabel} />
                    </Button>
                )}

                {showArrow &&
                    (isArrowUp ? (
                        <IoMdArrowDropup
                            tabIndex={0}
                            {...elem('dropdownIcon')}
                            onClick={handleArrowClick}
                            onKeyDown={handleArrowKeyDown}
                            role="button"
                            aria-label={upArrowLabel}
                        />
                    ) : (
                        <IoMdArrowDropdown
                            tabIndex={0}
                            {...elem('dropdownIcon')}
                            onClick={handleArrowClick}
                            onKeyDown={handleArrowKeyDown}
                            role="button"
                            aria-label={downArrowLabel}
                        />
                    ))}
            </div>
        );
    }
);

FieldWrapper.displayName = 'FieldWrapper';
