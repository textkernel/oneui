import * as React from 'react';
import { bem } from '../../utils';
import { BlockWidthRestrictor } from '../WidthRestrictor';
import styles from './Footer.scss';
import { LogoTextkernel } from '../Icon';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** supply copyright text ready to be rendered instead of the default one */
    copyright?: ReactNode;
    /** Current year to be rendered as a part of copyright note */
    year?: number;
    /** Node(s) to be rendered on the right side of the header */
    children?: ReactNode;
}

const currentYear = new Date().getFullYear();
const { block, elem } = bem('Footer', styles);

export const Footer: React.FC<Props> = ({ copyright, year = currentYear, children, ...rest }) => {
    const tkCopyright = (
        <span>
            {year && `\u00a9 ${year} `}
            <LogoTextkernel {...elem('logo')} margin="left" />
        </span>
    );

    return (
        <footer {...rest} {...block()}>
            <BlockWidthRestrictor {...elem('wrapper')}>
                {copyright || tkCopyright}
                <div {...elem('menu')}>{children}</div>
            </BlockWidthRestrictor>
        </footer>
    );
};

Footer.displayName = 'Footer';
