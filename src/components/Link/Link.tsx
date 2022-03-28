import * as React from 'react';
import { bem } from '../../utils';
import styles from './Link.scss';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children: NotEmptyReactNode;
    /** Color context */
    context?: 'brand' | 'muted';
    /** Ref to access the anchor */
    ref?: React.RefObject<HTMLAnchorElement>;
    /** Do not underline text on hover */
    dontDecorateOnHover?: boolean;
}

const { block } = bem('Link', styles);

export const Link: React.FC<Props> = React.forwardRef((props, ref) => {
    const { children, context, dontDecorateOnHover, ...rest } = props;
    return (
        <a ref={ref} {...rest} {...block(props)}>
            {children}
        </a>
    );
});

Link.displayName = 'Link';

Link.defaultProps = {
    context: 'brand',
    dontDecorateOnHover: false,
};
