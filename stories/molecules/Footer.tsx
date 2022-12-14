import * as React from 'react';
import { Footer, Link } from '@textkernel/oneui';

export default {
    title: 'Molecules/Footer',
    component: Footer,
};

export const _Footer = ({ children, ...args }) => (
    <Footer {...args}>
        {children}
        <Link href="/"> and a link</Link>
    </Footer>
);
_Footer.args = {
    children: 'This is a placeholder for children',
};
