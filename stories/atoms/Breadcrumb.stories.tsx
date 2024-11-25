import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbPath, Button, Heading } from '@textkernel/oneui';
import { MemoryRouter, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Atoms/Breadcrumb',
    component: Breadcrumb,
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const _Breadcrumb: Story = {
    name: 'Breadcrumb',
    decorators: [
        (Story) => (
            <MemoryRouter initialIndex={0}>
                <Story />
            </MemoryRouter>
        ),
    ],
    render: () => {
        const location = useLocation();
        const pathnames = location.pathname.split('/').filter((p) => p);
        const paths: BreadcrumbPath[] = [
            { href: '/', label: 'Home', icon: <MdHome /> },
            ...pathnames.map((name, index) => ({
                href: `/${pathnames.slice(0, index + 1).join('/')}`,
                label: name.charAt(0).toUpperCase() + name.slice(1),
            })),
        ];

        return (
            <div>
                <Breadcrumb
                    paths={paths}
                    linkRenderer={(path) => <NavLink to={path.href}>{path.label}</NavLink>}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 48 }}>
                    <Heading level="h3">Navigation helpers</Heading>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <NavLink to="/">
                            <Button>Go to Home</Button>
                        </NavLink>
                        <NavLink to="/compare">
                            <Button>Go to Compare</Button>
                        </NavLink>
                        <NavLink to="/compare/details">
                            <Button>Go to Compare Details</Button>
                        </NavLink>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <span>Current route:</span>
                        <Routes>
                            <Route
                                path="/compare/details"
                                element={<span>/compare/details</span>}
                            />
                            <Route path="/compare" element={<span>/compare</span>} />
                            <Route path="/" element={<span>/</span>} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    },
};
