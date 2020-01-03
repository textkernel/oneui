import * as React from 'react';
import bem from '../../../utils/bem';
import styles from './LeftPane.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered in the left pane */
    children?: ReactNode;
}

const { block } = bem('LeftPane', styles);

const LeftPane = React.forwardRef<HTMLDivElement, Props>(
    (props, ref): React.ReactElement => {
        const { children, ...rest } = props;

        return (
            <div {...rest} ref={ref} {...block(props)}>
                {children}
            </div>
        );
    }
);

LeftPane.displayName = 'LeftPane';

export default LeftPane;
