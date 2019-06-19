import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Multiselect } from '@textkernel/oneui';

storiesOf('Multiselect', module)
    .addDecorator(withKnobs)
    .add('Multiselect', () => {
        const mockArray = [
            'Sun',
            'Mercury',
            'Venus',
            'Earth',
            'Mars',
            'Jupiter',
            'Saturn',
            'Neptun',
            'Uranus',
            'Stars'
        ];
        return (
            <Multiselect
                getItems={(value, selectedItems) =>
                    mockArray
                        .filter(item => !selectedItems.includes(item))
                        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
                }
                onFinished={selectedItems => {
                    console.log(selectedItems);
                }}
            />
        );
    });
