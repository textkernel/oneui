import React from 'react';
import { render } from '@testing-library/react';
import { Heading } from '../Heading';

describe('<Heading> that renders a heading', () => {
    it('should not render any HTML if no children are provided', () => {
        const view = render(<Heading>{null}</Heading>);

        expect(view.container.firstChild).toBeNull();
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
