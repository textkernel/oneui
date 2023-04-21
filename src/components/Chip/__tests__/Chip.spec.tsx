import React from 'react';
import { render } from '@testing-library/react';
import { Chip } from '../Chip';

describe('<Chip> that renders a pill shaped chip', () => {
    it('should render correctly', () => {
        const { container } = render(<Chip>some text</Chip>);
        expect(container).toMatchSnapshot();
    });
});
