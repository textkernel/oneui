import * as React from 'react';
import {
    Separator as DropdownMenuSeparator,
    DropdownMenuSeparatorProps,
} from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../utils/bem';
import classnames from './Separators.scss';

export interface Props extends DropdownMenuSeparatorProps {
    /** title of the section: optional */
    children?: string | React.ReactNode;
}

const titleBlock = bem('SectionTitle', classnames);
const noTitleBlock = bem('Divider', classnames);

const Separator = ({ children }: Props) => {
    const block = children ? titleBlock.block : noTitleBlock.block;
    return (
        <DropdownMenuSeparator {...block()} title={children}>
            {children}
        </DropdownMenuSeparator>
    );
};

export { Separator };
