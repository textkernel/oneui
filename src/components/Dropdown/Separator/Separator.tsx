import * as React from 'react';
import {
    Separator as DropdownMenuSeparator,
    DropdownMenuSeparatorProps,
} from '@radix-ui/react-dropdown-menu';
import classnames from './Separators.scss';
import { bem } from '../../../utils/bem';

export interface Props extends DropdownMenuSeparatorProps {
    /** title of the section: optional */
    children?: string;
}

const titleBlock = bem('SectionTitle', classnames);
const noTitleBlock = bem('Divider', classnames);

const Separator = ({ children }: Props) => {
    const block = children ? titleBlock.block : noTitleBlock.block;
    return <DropdownMenuSeparator {...block()}>{children}</DropdownMenuSeparator>;
};

Separator.displayName = 'Separator';

export { Separator };
