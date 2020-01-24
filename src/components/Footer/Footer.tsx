import * as React from 'react';
import { bem } from '../../utils';
import { BlockWidthRestrictor } from '../WidthRestrictor';
import styles from './Footer.scss';
import { LogoTextkernel } from '../Icon';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** supply copyright text ready to be rendered instead of the default one */
    copyright?: ReactNode;
    /** Node(s) to be rendered on the right side of the header */
    children?: ReactNode;
}

const { block, elem } = bem('Footer', styles);

export const Footer: React.FC<Props> = props => {
    const { copyright, children, ...rest } = props;

    const tkCopyright = (
        <span>
            {`\u00a9 ${new Date().getFullYear()} `}
            <LogoTextkernel {...elem('logo', props)} margin="left" />
        </span>
    );

    return (
        <footer {...rest} {...block(props)}>
            <BlockWidthRestrictor {...elem('wrapper', props)}>
                {copyright || tkCopyright}
                <div {...elem('menu', props)}>{children}</div>
            </BlockWidthRestrictor>
        </footer>
    );
};

Footer.displayName = 'Footer';
