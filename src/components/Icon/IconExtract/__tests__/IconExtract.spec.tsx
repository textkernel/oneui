import React from 'react';
import { render } from '@testing-library/react';
import { IconExtract } from '../IconExtract';

describe('<IconExtract>', () => {
    it('should render an Extract icon', () => {
        const view = render(<IconExtract />);
        expect(view.container).toMatchSnapshot();
    });
});
