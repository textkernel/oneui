import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Link from '../Link';

describe('<Link> that renders a link', () => {
    const hrefText = 'https://textkernel.com';
    const targetText = '_blank';

    it('should render default link correctly', () => {
        const { container } = render(<Link href={hrefText}>Click me</Link>);
        expect(container).toMatchSnapshot();
    });
    it('should add string html attributes correctly', () => {
        const { container } = render(
            <Link href={hrefText} target={targetText}>
                Click me
            </Link>
        );
        expect(container.querySelector('a')).toHaveAttribute('href', hrefText);
        expect(container.querySelector('a')).toHaveAttribute('target', targetText);
    });
});
