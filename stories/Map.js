import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { Map } from '@textkernel/oneui';

storiesOf('Map', module)
    .addDecorator(withKnobs)
    .add('Map', () => {
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
                    apiKey={text('Google API key', 'AIzaSyA61aDjG48kvpwLhP-uE0sFSuHQ_j3EIwM')}
                    markers={select('Markers', markers, [defaultMarker])}
                    loadErrorMessage="Map failed to load"
                />
            </div>
        );
    });
