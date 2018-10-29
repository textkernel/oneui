import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Dummy from '../src/components/Dummy';

storiesOf('Dummy', module).add('with emojis', () => <Dummy> Hoi! </Dummy>);
