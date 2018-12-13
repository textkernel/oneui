import React from 'react';
import './ButtonContainer.css'

const ButtonContainer = ({ children }) => (
    <div className="button-container">
        {children}
    </div>
);

export default ButtonContainer;
