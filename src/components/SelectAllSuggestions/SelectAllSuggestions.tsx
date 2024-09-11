import React from 'react';
import { ListItemProps } from '../List';

export const SelectAllSuggestions = (props: ListItemProps) => {
    const { children } = props;

    return <li>{children}</li>;
};

SelectAllSuggestions.displayName = 'SelectAllSuggestions';
