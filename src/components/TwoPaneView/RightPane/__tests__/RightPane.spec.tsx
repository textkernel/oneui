import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RightPane } from '../RightPane';

describe('<RightPane> that renders a right pane of a two pane view', () => {
    it('should render correctly', () => {
        const view = render(<RightPane>Some content</RightPane>);

        expect(view.container).toMatchSnapshot();
        expect(view.container.children[0].textContent).toBe('Some content');
    });
});
