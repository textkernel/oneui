import React from 'react';

const DropdownContext = React.createContext({});

DropdownContext.Provider.displayName = 'DropdownProvider';
DropdownContext.Consumer.displayName = 'DropdownConsumer';

export const DropdownProvider = DropdownContext.Provider;
export const DropdownConsumer = DropdownContext.Consumer;
