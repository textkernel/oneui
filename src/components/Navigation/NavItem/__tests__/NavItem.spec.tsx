/* eslint-disable no-console */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavLink, BrowserRouter } from 'react-router-dom';
import { NavItem } from '../NavItem';

describe('NavItem that renders a single navigation item', () => {
    let view;
    const rerenderView = (props) => {
        view.rerender(
            <NavItem {...props}>
                <a href="/">item</a>
            </NavItem>
        );
    };
    beforeEach(() => {
        view = render(
            <NavItem>
                <a href="/">item</a>
            </NavItem>
        );
    });

    it('should render correctly with default props', () => {
        expect(view.container).toMatchSnapshot();

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('NavItem');
    });

    it('should throw when more then 1 child is added', () => {
        // suppress expected console errors
        jest.spyOn(console, 'error').mockImplementation((err) => {
            if (
                err.includes('NavItem should have a single child only') ||
                err.includes('The above error occurred in the')
            ) {
                // return;
            }
            // console.error(err);
        });

        expect(() =>
            render(
                // because NavItem should contain single navigation item
                // @ts-ignore
                <NavItem>
                    <a href="/">item</a>
                    <a href="/">extra</a>
                </NavItem>
            )
        ).toThrow();
    });

    it('should add active class', () => {
        rerenderView({ active: true });
        expect(view.container).toMatchSnapshot();

        const link = view.getByRole('link');

        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('NavItem NavItem--active');
        expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('should add pullRight class', () => {
        rerenderView({ pullRight: true });

        expect(view.getByRole('link')).toHaveClass('NavItem NavItem--pullRight');
    });

    describe('when supporting React Router NavLink', () => {
        it('should add activeClassName class for react-router version 5', () => {
            // suppress error related to the test actually using version 6
            jest.spyOn(console, 'error').mockImplementation((err) => {
                if (err.includes('Warning: React does not recognize the')) {
                    // return;
                }
                // console.error(err);
            });

            view = render(
                <BrowserRouter>
                    <NavItem useActiveClass>
                        <NavLink to="/else">item</NavLink>
                    </NavItem>
                </BrowserRouter>
            );
            expect(view.container).toMatchSnapshot();
            const links = screen.getAllByRole('link');

            expect(links).toHaveLength(2);
            expect(links[0]).toHaveClass('NavItem');
            expect(links[1]).toHaveAttribute('activeclassname', 'NavItem__active');
        });

        it('should make className a function for react-router version 6', () => {
            view = render(
                <BrowserRouter>
                    <NavItem useActiveClass routerVersion={6}>
                        <NavLink to="/else">item</NavLink>
                    </NavItem>
                </BrowserRouter>
            );
            expect(view.container).toMatchSnapshot();
            const links = screen.getAllByRole('link');

            expect(links).toHaveLength(2);
            expect(links[0]).toHaveClass('NavItem');
            expect(typeof links[1].onclick).toBe('function');
        });
    });
});
