import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Checkbox.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';

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
    /** Line name for ARIA labelling */
    lineLabel?: string;
    /** Polyline name for ARIA labelling */
    polylineLabel?: string;
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
            lineLabel,
            polylineLabel,
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
            <div ref={ref} style={style} {...block({ className, asFlexbox, ...rest })}>
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
                            width="12px"
                            height="10px"
                            viewBox={CHECKBOX_VIEWBOX}
                            role="img"
                            aria-label={indeterminate ? lineLabel : polylineLabel}
                        >
                            {indeterminate && <line x1="2" y1="6" x2="8" y2="6" role={lineLabel} />}
                            {!indeterminate && (checked === undefined || checked) && (
                                <polyline points="1.5 6 3.5 9 8 3" role={polylineLabel} />
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
