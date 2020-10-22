import * as React from 'react';
import { bem } from '../../utils';
import classnames from './StickyHeader.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node to be rendered as a sticky header */
    children: SingleReactNode;
}

const { block } = bem('StickyHeader', classnames);

export const StickyHeader: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    return (
        <div {...rest} {...block(rest)}>
            {children}
        </div>
    );
};

StickyHeader.displayName = 'StickyHeader';

StickyHeader.propTypes = {};

StickyHeader.defaultProps = {};
