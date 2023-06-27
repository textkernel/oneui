import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageWidthRestrictor } from '../PageWidthRestrictor';

describe('PageWidthRestrictor', () => {
    let view: RenderResult;

    it('should render nothing if no children are provided', () => {
        view = render(<PageWidthRestrictor />);

        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render correctly', () => {
        view = render(
            <PageWidthRestrictor aria-label="some children">Some children</PageWidthRestrictor>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('Some children');
        expect(screen.getByRole('region')).toBeInTheDocument();
    });
});
