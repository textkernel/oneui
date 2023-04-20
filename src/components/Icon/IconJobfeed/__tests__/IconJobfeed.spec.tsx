import React from 'react';
import { render } from '@testing-library/react';
import { IconJobfeed } from '../IconJobfeed';

describe('<IconJobfeed>', () => {
    it('should render an Jobfeed icon', () => {
        const view = render(<IconJobfeed />);
        expect(view.asFragment()).toMatchSnapshot();
    });
});
