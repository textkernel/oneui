import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from '../Link';

describe('<Link> that renders a link', () => {
    let view: RenderResult;

    it('should render nothing if no children are provided', () => {
        view = render(<Link href="https://textkernel.com" />);

        expect(view.container).toMatchSnapshot();
        expect(view.container.children).toHaveLength(0);
    });

    it('should render children when it is 0', () => {
        view.rerender(<Link href="https://textkernel.com">{0}</Link>);

        const { children } = view.container;

        expect(children).toHaveLength(1);
        expect(children[0].textContent).toBe('0');
    });

    it('should render default link correctly', () => {
        view = render(<Link href="https://textkernel.com">Click me</Link>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://textkernel.com');
    });

    it('should add string html attributes correctly', () => {
        view = render(
            <Link href="https://textkernel.com" target="_blank">
                Click me
            </Link>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });
});
