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
    children: NotEmptyReactNode;
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
}

export const FieldWrapper = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            showArrow = false,
            isArrowUp = false,
            onArrowClick,
            clearTooltipLabel = '',
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
                        isInline
                        isLink
                        onClick={handleClear}
                        title={clearTooltipLabel}
                        {...elem('clearButton', { rightIndent: showArrow })}
                    >
                        <MdClear size={16} />
                    </Button>
                )}

                {showArrow &&
                    (isArrowUp ? (
                        <IoMdArrowDropup
                            tabIndex={0}
                            {...elem('dropdownIcon')}
                            onClick={handleArrowClick}
                            onKeyDown={handleArrowKeyDown}
                        />
                    ) : (
                        <IoMdArrowDropdown
                            tabIndex={0}
                            {...elem('dropdownIcon')}
                            onClick={handleArrowClick}
                            onKeyDown={handleArrowKeyDown}
                        />
                    ))}
            </div>
        );
    }
);

FieldWrapper.displayName = 'FieldWrapper';
