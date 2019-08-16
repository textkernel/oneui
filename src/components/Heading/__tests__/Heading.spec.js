import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../Heading';

describe('<Heading> that renders a heading', () => {
    it('should render default heading correctly', () => {
        const title = 'Some heading text';
        const { container } = render(<Heading>{title}</Heading>);
        expect(container.textContent).toBe(title);
        expect(container).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const title = 'Some heading text';
        const { container } = render(
            <Heading level="h3" align="right">
                {title}
            </Heading>
        );
        expect(container).toMatchSnapshot();
    });
});
