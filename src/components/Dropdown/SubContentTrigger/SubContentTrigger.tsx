import React from 'react';
import { DropdownMenuSubTrigger, DropdownMenuSubContentProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../utils';
import styles from '../Items/Item.scss';

const { block } = bem('DropdownItem', styles);

export const SubContentTrigger = (props: DropdownMenuSubContentProps) => (
    // TODO: full implementation
    <DropdownMenuSubTrigger {...props} {...block(props)} />
);

SubContentTrigger.displayName = 'SubContentTrigger';
