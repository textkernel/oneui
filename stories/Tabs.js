import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Tabs from '../src/components/Tabs';
import Tab from '../src/components/Tab';

storiesOf('Tabs', module)
    .addDecorator(withKnobs)
    .add('Tabs', () => {
        return (
            <Tabs
                activeTabId="first"
            >
                <Tab
                  label="First tab"
                  id="first"
                >
                  Some content
                </Tab>
                <Tab
                  label="Second tab"
                  id="second"
                >
                  Some more content
                </Tab>
            </Tabs>
        );
    });
