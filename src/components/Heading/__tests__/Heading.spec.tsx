import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Heading } from '../Heading';

describe('<Heading> that renders a heading', () => {
    it('should not render any HTML if no children are provided', () => {
        const view = render(<Heading>{null}</Heading>);

        expect(view.container).toBeEmptyDOMElement();
    });
    it('should render children when it is 0', () => {
        const { container } = render(<Heading>{0}</Heading>);

        expect(container).not.toBeEmptyDOMElement();
    });

    it('should render default heading correctly', () => {
        const view = render(<Heading>Some heading text</Heading>);

        expect(view.container).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const view = render(
            <Heading level="h3" align="right" isNeutral>
                Some heading text
            </Heading>
        );

        expect(view.container).toMatchSnapshot();
    });
});
