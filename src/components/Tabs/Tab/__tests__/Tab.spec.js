import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Tab from '../Tab';

describe('<Tab> that renders tab content', () => {
    it('should render a tab', () => {
        const { container } = render(
            <Tab label="My tab" id="myTab">
                Some content
            </Tab>
        );
        expect(container).toMatchSnapshot();
    });
});
