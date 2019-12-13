import * as React from 'react';
import bem from '../../../utils/bem';
import styles from './BlockWidthRestrictor.scss';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Node(s) to be rendered inside the container */
    children: NotEmptyReactNode;
    /** HTML tag to be used to render the container */
    As?: string;
}

const { block } = bem('BlockWidthRestrictor', styles);

const BlockWidthRestrictor: React.FC<Props> = React.forwardRef(
    (props, ref?: React.Ref<HTMLElement>) => {
        const { children, As = 'div', ...rest } = props;

        return (
            <As {...rest} ref={ref} {...block(props)}>
                {children}
            </As>
        );
    }
);

BlockWidthRestrictor.displayName = 'BlockWidthRestrictor';

BlockWidthRestrictor.defaultProps = {
    As: 'div',
};

export default BlockWidthRestrictor;
