import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeftPane } from '../LeftPane';

describe('<LeftPane> that renders a left pane of a two pane view', () => {
    it('should render correctly', () => {
        const view = render(<LeftPane>Some content</LeftPane>);

        expect(view.container).toMatchSnapshot();
        expect(view.container.children[0].textContent).toBe('Some content');
    });
});
