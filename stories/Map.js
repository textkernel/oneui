import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { Map } from '@textkernel/oneui';

storiesOf('Atoms|Map', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add(
        'Map',
        () => {
            const defaultMarker = {
                lat: number('Latitude 1', 52.3922288),
                lng: number('Longitude 1', 4.9338793),
                radius: number('Radius in meters 1', 30000),
            };
            const addedMarker = {
                lat: number('Latitude 2', 52.5112671),
                lng: number('Longitude 2', 7.2535521),
                radius: number('Radius in meters 2', 30000),
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
                    <Map
                        apiKey="Please provide a key"
                        markers={select('Markers', markers, [defaultMarker])}
                    />
                </div>
            );
        },
        {
            info: {
                text: `
        ## Displaying Map in storybook

        To make this component work you need to provide your own Google API key. At the moment this is only possible via accessing the source code. Sorry for the inconvenience.

        ## Note about props

        'Map' is a wrapper around the 'MapRenderer' component, that makes sure the Google API is loaded on the page. 
        You don't need to use 'MapRenderer' directly.
        'Map' will pass props that are not needed for loading the API to 'MapRenderer', so you can provide them all together.
        `,
            },
        }
    );
