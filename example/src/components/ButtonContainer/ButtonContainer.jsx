import React from 'react';
import './ButtonContainer.css'

/**
 * One custom component from a application that uses Nice!, like Search!
 *
 * This component is also customizable since its CSS uses variables from the
 * application theme ( ./public/default-app-theme.css).
 */
const ButtonContainer = ({ children }) => (
    <div className="button-container">
        {children}
    </div>
);

export default ButtonContainer;
