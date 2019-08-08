import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { Map } from '@textkernel/oneui';

storiesOf('Atoms|Map', module)
    .addDecorator(withKnobs)
    .add(
        'Map',
        () => {
            const defaultMarker = {
                center: {
                    lat: 52.3922288,
                    lng: 4.9338793,
                },
                radius: 30000,
            };
            const addedMarker = {
                center: {
                    lat: 52.5112671,
                    lng: 7.2535521,
                },
                radius: 30000,
            };
            const markers = {
                marker1: [defaultMarker],
                marker2: [addedMarker],
                multiple: [defaultMarker, addedMarker],
                none: [],
            };

            return (
                <div
                    style={{
                        width: text('Container width', '800px'),
                        height: text('Container height', '400px'),
                    }}
                >
                    <Map apiKey="" markers={select('Markers', markers, [defaultMarker])} />
                </div>
            );
        },
        {
            info: {
                text: `
        ## Displaying Map in storybook

        To make this component work in none-dev mode, you need to provide your own Google API key. At the moment this is only possible via accessing the source code. Sorry for the inconvenience.

        ## Note about props

        'Map' is a wrapper around the 'MapRenderer' component, and it makes sure the Google API is loaded on the page. 
        
        You don't need to use 'MapRenderer' directly.
        'Map' __will pass props__ that are not needed for loading the API __to 'MapRenderer'__, so you can provide them all together. For list of props see below
        `,
            },
        }
    );
