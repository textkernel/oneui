import * as React from 'react';
import { bem } from '../../utils';
import styles from './Link.scss';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children: NotEmptyReactNode;
    /** Color context */
    context?: 'brand' | 'muted';
}

const { block } = bem('Link', styles);

export const Link: React.FC<Props> = (props) => {
    const { children, context, ...rest } = props;
    return (
        <a {...rest} {...block(props)}>
            {children}
        </a>
    );
};

Link.displayName = 'Link';

Link.defaultProps = {
    context: 'brand',
};
