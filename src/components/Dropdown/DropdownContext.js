import React from 'react';

const DropdownContext = React.createContext({});

export const DropdownProvider = DropdownContext.Provider;
export const DropdownConsumer = DropdownContext.Consumer;
