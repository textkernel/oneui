import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from '../Link';

describe('<Link> that renders a link', () => {
    const href = 'https://textkernel.com';
    let view: RenderResult;

    beforeEach(() => {
        view = render(<Link href={href} />);
    });

    it('should render nothing if no children are provided', () => {
        expect(view.container).toMatchSnapshot();
        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render children when it is 0', () => {
        view.rerender(<Link href={href}>{0}</Link>);

        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should render default link correctly', () => {
        view.rerender(<Link href={href}>Click me</Link>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('link')).toHaveAttribute('href', href);
    });

    it('should add string html attributes correctly', () => {
        view.rerender(
            <Link href={href} target="_blank">
                Click me
            </Link>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });

    it('should render correctly with external link', () => {
        const label = 'external link';
        view.rerender(
            <Link href={href} isExternal externalLinkIconLabel={label}>
                external link
            </Link>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
});
