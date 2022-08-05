import * as React from 'react';
import { bem } from '../../utils';
import { BlockWidthRestrictor } from '../WidthRestrictor';
import styles from './Header.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** supply a logo ready to be rendered or attributes to build a simple one. */
    logo:
        | {
              /** path to the logo source file */
              src: string;
              /** path to where the logo should link to if clicked */
              link?: string;
              /** a name for the logo, it will used as alternative text to the img */
              title?: string;
          }
        | React.ReactElement;
    /** Node(s) to be rendered on the right side of the header */
    children?: ReactNode;
}

const { block, elem } = bem('Header', styles);

export const Header: React.FC<Props> = (props) => {
    const { logo, children, ...rest } = props;

    let renderedLogo: unknown = null;

    if (React.isValidElement(logo)) {
        renderedLogo = React.cloneElement(logo, { ...elem('logo', props) });
    } else if (logo.link) {
        renderedLogo = (
            <a href={logo.link}>
                <img src={logo.src} alt={logo.title} {...elem('logo', props)} />
            </a>
        );
    } else {
        renderedLogo = (
            <img src={logo.src} alt={logo.title || 'our logo'} {...elem('logo', props)} />
        );
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
