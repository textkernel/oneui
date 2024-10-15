import * as React from 'react';
import classnames from './Separators.scss';
import { bem } from '../../../utils/bem';

export interface Props<> {
    /** title of the section: optional */
    title?: string;
}

const titleBlock = bem('SectionTitle', classnames);
const noTitleBlock = bem('Divider', classnames);

const Separator = React.forwardRef<HTMLLIElement, Props>(({ title }, ref) => {
    let block;
    if (title) {
        block = titleBlock.block;
    } else {
        block = noTitleBlock.block;
    }
    return (
        <li ref={ref} {...block()}>
            {title}
        </li>
    );
});

Separator.displayName = 'Separator';

export { Separator };
