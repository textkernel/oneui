import * as React from 'react';
import bem from '../../../utils/bem';
import { BlockWidthRestrictor } from '../../WidthRestrictor';
import styles from './NavBar.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered as navigation */
    children?: OptionalChildren;
}

const { block, elem } = bem('NavBar', styles);

const NavBar: React.FC<Props> = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <BlockWidthRestrictor As="nav" {...elem('wrapper', props)}>
                {children}
            </BlockWidthRestrictor>
        </div>
    );
};

NavBar.displayName = 'NavBar';

export default NavBar;
