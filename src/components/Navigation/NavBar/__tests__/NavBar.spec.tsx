import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavBar } from '../NavBar';

describe('NavBar that renders a container for navigation', () => {
    it('should render correctly', () => {
        const view = render(
            <NavBar>
                <a href="/">in item</a>
                <a href="/">other</a>
            </NavBar>
        );
        expect(view.container).toMatchSnapshot();

        const links = screen.getAllByRole('link');

        expect(links).toHaveLength(2);
        expect(links[0].innerHTML).toBe('in item');
        expect(links[1].innerHTML).toBe('other');
    });
});
