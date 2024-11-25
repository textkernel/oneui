import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { render, RenderResult, screen } from '@testing-library/react';
import { Breadcrumb } from '..';
import '@testing-library/jest-dom';

describe('Breadcrumb', () => {
    let view: RenderResult;

    it('should render correctly', () => {
        view = render(
            <MemoryRouter>
                <Breadcrumb
                    paths={[
                        { href: '/', icon: <MdHome aria-label="home-icon" /> },
                        { href: '/compare' },
                        { label: 'Details', href: '/compare/details' },
                    ]}
                />
            </MemoryRouter>
        );

        expect(screen.getAllByRole('link')).toHaveLength(3);
        expect(screen.queryByText('Compare')).not.toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
        expect(screen.getByLabelText('home-icon')).toBeInTheDocument();
        expect(screen.getAllByText('/')).toHaveLength(2);
        expect(screen.queryByLabelText('Details')).not.toBeInTheDocument();
        expect(view.container).toMatchSnapshot();
    });

    it('should render with a custom linkRenderer', () => {
        view = render(
            <MemoryRouter>
                <Breadcrumb
                    paths={[
                        { href: '/', icon: <MdHome aria-label="home-icon" /> },
                        { href: '/compare' },
                        { label: 'Details', href: '/compare/details' },
                    ]}
                    linkRenderer={(path) => <div aria-label={path.label}>{path.label}</div>}
                />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Details')).toBeInTheDocument();
        expect(view.container).toMatchSnapshot();
    });
});
