import React from 'react';
import { storiesOf } from '@storybook/react';
import Dummy from '../src/components/Dummy';

storiesOf('Dummy', module)
    .add('with emojis', () => (
        <Dummy> 😀 😎 👍 💯 </Dummy>
    ));
