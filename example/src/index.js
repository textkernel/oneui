import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OneUI from '@textkernel/oneui';
import '@textkernel/oneui/dist/oneui.css';

const renderApplication = () => ReactDOM.render(<App />, document.getElementById('root'));

OneUI.init()
    .then(() => renderApplication())
    .catch((err) => {
        console.warn(err);
        renderApplication();
    });
