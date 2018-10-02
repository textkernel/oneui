/* eslint-disable react/no-unescaped-entities, no-undef */
import React from 'react';
import { render } from 'react-dom';
import Dummy from '../src/components/Dummy';

render(
    <div>
        <h2>Ugly Storybook :/</h2>
        <div style={{ padding: '10px' }}>
            <Dummy>I'm boring default Dummy thing...</Dummy>
        </div>
        <div style={{ padding: '10px' }}>
            <Dummy isActive>And I'm so active!</Dummy>
        </div>
    </div>,
    document.getElementById('storybook')
);
