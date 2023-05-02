import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Chip } from '../Chip';

describe('<Chip> that renders a pill shaped chip', () => {
    it('should render nothing if no children are provided', () => {
        const { container } = render(<Chip>{}</Chip>);

        expect(container).toBeEmptyDOMElement();
    });
    it('should render children when it is 0', () => {
        const { container } = render(<Chip>{0}</Chip>);

        expect(container).not.toBeEmptyDOMElement();
    });
    it('should render correctly', () => {
        const { container } = render(<Chip>some text</Chip>);

        expect(container).toMatchSnapshot();
    });
});
