import React from 'react';
import { render } from '@testing-library/react';
import { IconSourcebox } from '../IconSourcebox';

describe('<IconSourcebox>', () => {
    it('should render an Sourcebox icon', () => {
        const view = render(<IconSourcebox />);
        expect(view.asFragment()).toMatchSnapshot();
    });
});
