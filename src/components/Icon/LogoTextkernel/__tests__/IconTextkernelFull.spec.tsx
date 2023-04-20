import React from 'react';
import { render } from '@testing-library/react';
import { LogoTextkernel } from '../LogoTextkernel';

describe('<LogoTextkernel>', () => {
    it('should render an Textkernel icon', () => {
        const view = render(<LogoTextkernel />);
        expect(view.asFragment()).toMatchSnapshot();
    });
});
