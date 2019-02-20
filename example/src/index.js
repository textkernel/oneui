import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeLoader from '@textkernel/oneui';
import '@textkernel/oneui/dist/oneui.css';

const renderApplication = () => ReactDOM.render(<App />, document.getElementById('root'));

ThemeLoader.init()
    .then(() => renderApplication())
    .catch((err) => {
        console.warn(err);
        renderApplication();
    });
