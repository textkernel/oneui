import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconBase } from '../IconBase';

describe('<IconBase> that renders an SVG wrapper with all options included', () => {
    it('should render nothing if no children are provided', () => {
        const { container } = render(<IconBase viewBox="0 0 100 100">{}</IconBase>);

        expect(container).toBeEmptyDOMElement();
    });
    it('should render children when it is 0', () => {
        const { container } = render(<IconBase viewBox="0 0 100 100">{0}</IconBase>);

        expect(container).not.toBeEmptyDOMElement();
    });
    it('should render a default icon', () => {
        const view = render(
            <IconBase viewBox="0 0 100 100" title="Icon base" size={15} margin="right" isPrimary>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(view.container).toMatchSnapshot();

        expect(screen.getByTitle('Icon base')).toBeInTheDocument();
    });
    it('should correct negative sizes', () => {
        const view = render(
            <IconBase viewBox="0 0 100 100" size={-1}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(view.container).toMatchSnapshot();
        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img.style.height).toBe('0px');
        expect(img.style.width).toBe('0px');
        expect(screen.queryByTitle('Icon base')).not.toBeInTheDocument();
    });
    it('should not apply proportional styles if no size provided', () => {
        const view = render(
            <IconBase viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(view.container).toMatchSnapshot();
        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img.style.height).toBe('');
        expect(img.style.width).toBe('1em');
    });
    it('should apply proportional styles if size is provided', () => {
        const mockSize = 48;
        const view = render(
            <IconBase viewBox="0 0 100 100" size={mockSize}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(view.container).toMatchSnapshot();
        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img.style.height).toBe('48px');
        expect(img.style.width).toBe('48px');
    });
    it('should apply height only to styles if size is provided with preserveAspectRatio', () => {
        const mockSize = 48;
        const view = render(
            <IconBase viewBox="0 0 100 100" size={mockSize} preserveAspectRatio>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(view.container).toMatchSnapshot();
        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img.style.height).toBe('48px');
        expect(img.style.width).toBe('auto');
    });
});
