import React from 'react';
import { DropdownMenuSubTrigger, DropdownMenuSubContentProps } from '@radix-ui/react-dropdown-menu';
import { MdChevronRight } from 'react-icons/md';
import { bem } from '../../../utils';
import styles from '../Items/Item.scss';

const { block } = bem('DropdownItem', styles);

interface Props extends DropdownMenuSubContentProps {
    /** String that will be displayed as text in the SubTrigger component */
    children: string;
}

export const DropdownSubTrigger = ({ children, ...rest }: Props) => (
    <DropdownMenuSubTrigger {...rest} {...block({ ...rest, withChevron: true })}>
        {children}
        <MdChevronRight size={20} role="img" />
    </DropdownMenuSubTrigger>
);
