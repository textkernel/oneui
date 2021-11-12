import * as React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Tag } from '@textkernel/oneui';

storiesOf('Atoms|Tag', module)
    .addDecorator(withKnobs)
    .add('Tag', () => {
        const onDelete = () => {
            console.log('onDelete was called');
        };
        const onClick = () => {
            console.log('onClick was called');
        };

        return (
            <div
                style={{
                    padding: '5px',
                }}
            >
                <Tag
                    bgColor={select(
                        'bgColor',
                        ['#3eff2b', '#ffa139', 'var(--color-background)'],
                        'var(--color-background)'
                    )}
                    isSelected={boolean('isSelected', false)}
                    maxWidth={text('max-width', 'fit-content')}
                    onDelete={boolean('use onDelete callback', false) ? onDelete : undefined}
                    onClick={boolean('use onClick callback', false) ? onClick : undefined}
                    size={select('size', ['small', 'normal', 'large'], 'normal')}
                >
                    This is an extremely long long text!
                </Tag>
            </div>
        );
    });
