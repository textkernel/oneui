import * as React from 'react';
import OpenInNew from '@material-design-icons/svg/round/open_in_new.svg';
import { bem } from '../../utils';
import styles from './Link.scss';

export interface ExternalLinkProps {
    /** Indicate external links - an icon will be added */
    isExternal: true;
    /** aria label for the external link icon */
    externalLinkIconLabel: string;
}

export interface BaseProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children?: React.ReactNode;
}

export type Props = BaseProps &
    (ExternalLinkProps | { isExternal?: false; externalLinkIconLabel?: never });

const { block, elem } = bem('Link', styles);

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
    ({ children, isExternal = false, externalLinkIconLabel, ...rest }, ref) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        return (
            <a ref={ref} {...rest} {...block({ ...rest })}>
                {isExternal && <OpenInNew {...elem('icon')} aria-label={externalLinkIconLabel} />}
                {children}
            </a>
        );
    }
);

Link.displayName = 'Link';
