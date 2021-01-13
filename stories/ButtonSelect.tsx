import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { Button, ButtonSelect } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

type ExampleType = { name: string };

storiesOf('Molecules|ButtonSelect', module)
    .addDecorator(withKnobs)
    .add('ButtonSelect', () => {
        const onChange = (item) => {
            console.log(`onChange was called with {name: ${item.name}}`);
        };
        const onClick = () => {
            console.log(`onClick button was called`);
        };

        return (
            <ButtonSelect<ExampleType>
                style={{ width: 'fit-content' }}
                button={(
                    <Button onClick={onClick}>
                        Copy from Stack Overflow
                    </Button>
                )}
                itemToString={item => item?.name || ''}
                itemsTitle={text('itemsTitle', 'Copy from another source')}
                items={[
                    { name: 'LinkedIn'},
                    { name: 'Monster'},
                    { name: 'GitHub'},
                ]}
                onChange={onChange}
                context={select('context', CONTEXTS, 'brand')}
            />
        );
    });
