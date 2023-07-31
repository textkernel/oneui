import * as React from 'react';
import { bem } from '../../utils';
import { BlockWidthRestrictor } from '../WidthRestrictor';
import styles from './Header.scss';

type Logo = {
    /** path to the logo source file */
    src: string;
    /** path to where the logo should link to if clicked */
    link?: string;
    /** a name for the logo, it will used as alternative text to the img */
    title?: string;
};
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** supply a logo ready to be rendered or attributes to build a simple one. */
    logo: Logo | React.ReactElement;
    /** Node(s) to be rendered on the right side of the header */
    children?: React.ReactNode;
}

const { block, elem } = bem('Header', styles);

export const Header: React.FC<Props> = (props) => {
    const { logo, children, ...rest } = props;

    let renderedLogo: unknown;

    if (React.isValidElement(logo)) {
        renderedLogo = React.cloneElement(logo, { ...elem('logo', props) });
    } else {
        const logoType = logo as Logo;
        if (logoType.link) {
            renderedLogo = (
                <a href={logoType.link}>
                    <img src={logoType.src} alt={logoType.title} {...elem('logo', props)} />
                </a>
            );
        } else {
            renderedLogo = (
                <img
                    src={logoType.src}
                    alt={logoType.title || 'our logo'}
                    {...elem('logo', props)}
                />
            );
        }
    }

    return (
        <header {...rest} {...block(props)}>
            <BlockWidthRestrictor {...elem('wrapper', props)}>
                {renderedLogo}
                <div {...elem('menu', props)}>{children}</div>
            </BlockWidthRestrictor>
        </header>
    );
};

Header.displayName = 'Header';
