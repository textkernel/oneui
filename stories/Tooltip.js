import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltip, IconSearch } from '@textkernel/oneui';

storiesOf('Molecules|Tooltip (Popup based)', module).add('Tooltip', () => (
    <Tooltip
        anchor={<IconSearch />}
        content="Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken."
    />
));
