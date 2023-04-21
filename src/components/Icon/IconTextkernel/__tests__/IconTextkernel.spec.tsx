import React from 'react';
import { render } from '@testing-library/react';
import { IconTextkernel } from '../IconTextkernel';

describe('<IconTextkernel>', () => {
    it('should render an Textkernel icon', () => {
        const view = render(<IconTextkernel />);
        expect(view.container).toMatchSnapshot();
    });
});
