import * as React from 'react';
import bem from '../../utils/bem';
import styles from './Link.scss';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children: React.ReactNode;
}

const { block } = bem('Link', styles);

const Link: React.FC<Props> = props => {
    const { children, ...rest } = props;
    return (
        <a {...rest} {...block(props)}>
            {children}
        </a>
    );
};

Link.displayName = 'Link';

export default Link;
