import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeLoader from './ThemeLoader';


import '@textkernel/oneui/dist/oneui.css';


ThemeLoader.load()
    .then(() => ReactDOM.render(<App />, document.getElementById('root')))
    .catch(err => console.error(err));

