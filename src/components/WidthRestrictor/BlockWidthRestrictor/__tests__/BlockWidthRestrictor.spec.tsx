import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockWidthRestrictor } from '../BlockWidthRestrictor';

describe('BlockWidthRestrictor', () => {
    let view: RenderResult;

    it('should render nothing if no children are provided', () => {
        view = render(<BlockWidthRestrictor />);

        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render correctly', () => {
        view = render(<BlockWidthRestrictor>Some children</BlockWidthRestrictor>);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('Some children');
        expect(view.container.children[0].tagName).toBe('DIV');
    });

    it('should render correctly when element type is defined', () => {
        view = render(<BlockWidthRestrictor As="nav">Some children</BlockWidthRestrictor>);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('Some children');
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
});
