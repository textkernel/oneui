import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import styles from './IconBase.scss';
import { Context } from '../../constants';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The icon context (e.g. primary, secondary, danger, success etc. - defaults to primary) */
    context?: Context;
    /** Adds margin between a given side of the icon and other content */
    margin?: 'top' | 'right' | 'bottom' | 'left';
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size?: number;
    /** If true, width will set to be automatic */
    preserveAspectRatio?: boolean;
    /** Optional icon title */
    title?: string;
}

export interface Props extends IconProps {
    /** The SVG content */
    children: NotEmptyReactNode;
    /** The SVG viewbox */
    viewBox: string;
}

const { block, elem } = bem('IconBase', styles);

const adjustSize = (preserveAspectRatio: boolean, size?: number) => {
    if (!size) {
        if (!preserveAspectRatio) {
            return { width: '1em' };
        }
        return { width: 'auto' };
    }

    const adjustedSize = Math.max(0, size);

    return {
        top: 'auto',
        width: preserveAspectRatio ? 'auto' : adjustedSize,
        height: adjustedSize,
    };
};

export const IconBase = forwardRef<HTMLDivElement, Props>(
    (
        { children, context, margin, size, preserveAspectRatio = false, title, viewBox, ...rest },
        ref
    ) => {
        return (
            <div ref={ref} {...rest} {...block({ margin, context, ...rest })}>
                <svg
                    {...elem('svg')}
                    aria-labelledby={title ? 'title' : null}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={viewBox}
                    style={adjustSize(!!preserveAspectRatio, size)}
                    role="img"
                >
                    {!!title && <title>{title}</title>}
                    {children}
                </svg>
            </div>
        );
    }
);

IconBase.displayName = 'IconBase';
