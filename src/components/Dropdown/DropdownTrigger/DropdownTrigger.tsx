import React from 'react';
import { DropdownMenuTrigger, DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';

export const DropdownTrigger = (props: DropdownMenuTriggerProps) => (
    <DropdownMenuTrigger asChild {...props} />
);
