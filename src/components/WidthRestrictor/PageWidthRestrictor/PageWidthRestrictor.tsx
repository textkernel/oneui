import * as React from 'react';
import bem from '../../../utils/bem';
import styles from './PageWidthRestrictor.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered inside the container */
    children: React.ReactElement;
}

const { block } = bem('PageWidthRestrictor', styles);

const PageWidthRestrictor: React.FC<Props> = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

PageWidthRestrictor.displayName = 'PageWidthRestrictor';

export default PageWidthRestrictor;
