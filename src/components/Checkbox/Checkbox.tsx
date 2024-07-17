import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Checkbox.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /** A unique id to reference this checkbox */
    id: string;
    /** If the checkbox should be disabled */
    disabled?: boolean;
    /** The label for the checkbox */
    children?: string | React.ReactElement;
    /** Optionally render checkbox in a flexbox */
    asFlexbox?: boolean;
    /** Indeterminate status, show minus sign across checkbox. This property overrides the checked state visually  */
    indeterminate?: boolean;
    /** Checkbox input ref */
    inputRef?: React.RefObject<HTMLInputElement>;
    /** Line role */
    lineRole?: string;
    /** Polyline role */
    polylineRole?: string;
}

const { block, elem } = bem('Checkbox', styles);

export const Checkbox = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            id,
            children,
            disabled = false,
            asFlexbox = false,
            className,
            style,
            indeterminate = false,
            checked,
            inputRef,
            lineRole,
            polylineRole,
            ...rest
        },
        ref
    ) => {
        let text = children;
        if (children && typeof children === 'string') {
            text = (
                <Text {...elem('text')} inline context={disabled ? 'neutral' : 'default'}>
                    {children}
                </Text>
            );
        }

        return (
            <div ref={ref} style={style} {...block({ className, asFlexbox, disabled, ...rest })}>
                <input
                    {...rest}
                    {...elem('input', { asFlexbox, indeterminate })}
                    type="checkbox"
                    id={id}
                    disabled={disabled}
                    checked={checked}
                    ref={inputRef}
                />
                <label {...elem('label', { asFlexbox })} htmlFor={id}>
                    <span {...elem('box', { asFlexbox })}>
                        <svg
                            {...elem('svg', { asFlexbox })}
                            width="16px"
                            height="12px"
                            viewBox="0 0 12 9"
                            role="img"
                            aria-label={indeterminate ? lineRole : polylineRole}
                        >
                            {indeterminate && <line x1="3" y1="5" x2="9" y2="5" role={lineRole} />}
                            {!indeterminate && (checked === undefined || checked) && (
                                <polyline points="1.5 5 4 8 10.5 2" role={polylineRole} />
                            )}
                        </svg>
                    </span>
                    {text}
                </label>
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
