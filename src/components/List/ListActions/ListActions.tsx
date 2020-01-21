import * as React from 'react';
import bem from '../../../utils/bem';
import styles from './ListActions.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Actions to be pushed to the left side of a List Item */
    children?: ReactNode;
}

const { block } = bem('ListActions', styles);

const ListActions: React.FC<Props> = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

ListActions.displayName = 'ListActions';

export default ListActions;
