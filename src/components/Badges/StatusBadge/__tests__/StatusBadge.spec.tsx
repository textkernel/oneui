import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
    it('should render correctly', () => {
        const view = render(<StatusBadge>some text</StatusBadge>);

        expect(view.container).toMatchSnapshot();
    });

    it('should render correctly with children being a number', () => {
        render(<StatusBadge>{0}</StatusBadge>);

        expect(screen.getByTitle(0)).toBeInTheDocument();
    });

    it('renders with default props', () => {
        render(<StatusBadge>Default Badge</StatusBadge>);

        const text = screen.getByTitle('Default Badge');
        expect(text).toHaveClass('StatusBadge--context_info');
        expect(text).toHaveClass('StatusBadge--variant_bold');
    });

    it('should apply correctly cautious context', () => {
        render(<StatusBadge context="cautious">some text</StatusBadge>);

        const text = screen.getByTitle('some text');
        expect(text).toHaveClass('StatusBadge--context_cautious');
    });

    it('should apply correctly subtle variant', () => {
        render(<StatusBadge variant="subtle">some text</StatusBadge>);

        const text = screen.getByTitle('some text');
        expect(text).toHaveClass('StatusBadge--variant_subtle');
    });
});
