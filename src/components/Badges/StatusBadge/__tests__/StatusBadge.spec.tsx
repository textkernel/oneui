import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
    it('should render correctly', () => {
        const view = render(<StatusBadge>some text</StatusBadge>);

        expect(view.container).toMatchSnapshot();
    });

    it('should render children when it is 0', () => {
        const { container } = render(<StatusBadge>{0}</StatusBadge>);
        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders with default props', () => {
        const { container } = render(<StatusBadge>Default Badge</StatusBadge>);

        expect(container.firstChild).toHaveClass('StatusBadge--context_info');
        expect(container.firstChild).toHaveClass('StatusBadge--variant_bold');
    });

    it('should apply correctly cautious context', () => {
        const view = render(<StatusBadge context="cautious">some text</StatusBadge>);
        expect(view.container.firstChild).toHaveClass('StatusBadge--context_cautious');
    });

    it('should apply correctly subtle variant', () => {
        const view = render(<StatusBadge variant="subtle">some text</StatusBadge>);
        expect(view.container.firstChild).toHaveClass('StatusBadge--variant_subtle');
    });
});
