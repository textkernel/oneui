/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { TopBar } from '@textkernel/oneui';

storiesOf('Molecules|TopBar', module)
    .addDecorator(withKnobs)
    .add('TopBar', () => {
        const isLoading = boolean('isLoading', false);

        return (
            <div style={{ width: 500 }}>
                <TopBar
                    percentage={number('Percentage', 100)}
                    count={number('Count', 123)}
                    isLoading={isLoading}
                    context="primary"
                >
                    Repair and Maintenance Technician
                </TopBar>
                <TopBar percentage={76} count={94} isLoading={isLoading}>
                    Sales Manager
                </TopBar>
                <TopBar percentage={64} count={79} isLoading={isLoading}>
                    Software Engineer
                </TopBar>
                <TopBar percentage={64} count={79} isLoading={isLoading}>
                    Operations Manager
                </TopBar>
                <TopBar percentage={58} count={72} isLoading={isLoading}>
                    Business Development Manager
                </TopBar>
            </div>
        );
    });
