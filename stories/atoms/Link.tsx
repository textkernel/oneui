import * as React from 'react';
import { Link } from '@textkernel/oneui';

export default {
    title: 'Atoms/Link',
    component: Link,
};

export const _Link = (args) => <Link {...args} />;
_Link.args = {
    target: '_blank',
    href: 'https://textkernel.com',
    children: 'Click me',
};
