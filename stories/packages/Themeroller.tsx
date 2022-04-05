import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Themeroller } from '@textkernel/oneui';

storiesOf('packages|Themeroller', module).add('Themeroller client', () => {
    const initialCssVars = {
        '--color-background': '#fff',
        '--border-radius:': '1px',
    };
    const handleCssVarsChange = (cssVars) => console.log(cssVars);
    return <Themeroller cssVars={initialCssVars} onChange={handleCssVarsChange} />;
});
