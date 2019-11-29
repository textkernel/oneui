import * as React from 'react';
import bem from '../../utils/bem';
import styles from './IconBase.scss';
import { Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** The SVG content */
    children: React.ReactElement;
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
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

const IconBase: React.FC<Props> = props => {
    const { children, context, margin, size, preserveAspectRatio, title, viewBox, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <svg
                {...elem('svg', props)}
                aria-labelledby={title ? 'title' : null}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={adjustSize(preserveAspectRatio!, size)}
                role="img"
            >
                {!!title && <title>{title}</title>}
                {children}
            </svg>
        </div>
    );
};

IconBase.displayName = 'IconBase';

IconBase.defaultProps = {
    preserveAspectRatio: false,
};

export default IconBase;
