import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconBase } from '../IconBase';

describe('<IconBase> that renders an SVG wrapper with all options included', () => {
    it('should render a default icon', () => {
        const wrapper = render(
            <IconBase viewBox="0 0 100 100" title="Icon base" size={15} margin="right" isPrimary>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );

        expect(wrapper.asFragment()).toMatchSnapshot();
    });
    it('should correct negative sizes', () => {
        const wrapper = render(
            <IconBase viewBox="0 0 100 100" size={-1}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.asFragment()).toMatchSnapshot();
        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img).not.toHaveAttribute('title');
        expect(img).toHaveAttribute('style', 'width: 0px; height: 0px;');
    });
    it('should not apply proportional styles if no size provided', () => {
        const wrapper = render(
            <IconBase viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.asFragment()).toMatchSnapshot();

        expect(screen.getByRole('img')).toHaveAttribute('style', 'width: 1em;');
    });
    it('should apply proportional styles if size is provided', () => {
        const mockSize = 48;
        const wrapper = render(
            <IconBase viewBox="0 0 100 100" size={mockSize}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.asFragment()).toMatchSnapshot();

        expect(screen.getByRole('img')).toHaveAttribute('style', 'width: 48px; height: 48px;');
    });
    it('should apply hight only to styles if size is provided with preserveAspectRatio', () => {
        const mockSize = 48;
        const wrapper = render(
            <IconBase viewBox="0 0 100 100" size={mockSize} preserveAspectRatio>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.asFragment()).toMatchSnapshot();

        expect(screen.getByRole('img')).toHaveAttribute('style', 'width: auto; height: 48px;');
    });
});
