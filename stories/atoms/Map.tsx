import * as React from 'react';
import { MapWithGoogleLoader, Map } from '@textkernel/oneui';
import { ensureApiKey } from '../utils/ensureApiKey';
import NL_PATHS from '../static/gadm36_NLD_0.json';
import FR_FRIESLAND from '../static/FR_Friesland.json';

const apiKey = ensureApiKey();
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
const pointMarker = {
    center: {
        lat: 52.5112671,
        lng: 7.2535521,
    },
};

export default {
    title: 'Atoms/Map',
    // component: MapWithGoogleLoader, // TODO
    subcomponents: { Map },
    argTypes: {
        defaultArea: {
            options: ['address', 'centre'],
            mapping: {
                address: {
                    address: 'Netherlands',
                },
                centre: {
                    center: {
                        lat: 52.3922288,
                        lng: 4.9338793,
                    },
                    zoom: 7,
                },
            },
            control: {
                type: 'inline-radio',
                labels: {
                    address: 'Address',
                    centre: 'Centre and zoom',
                },
            },
        },
        defaultHighlight: {
            options: ['NL', 'none'],
            mapping: { NL: NL_PATHS, none: null },
            control: {
                type: 'inline-radio',
                labels: {
                    NL: 'Netherlands',
                    none: 'None',
                },
            },
        },
        markers: {
            options: ['none', 'marker1', 'marker2', 'multiple', 'point', 'area', 'mixed'],
            mapping: {
                marker1: [defaultMarker],
                marker2: [addedMarker],
                multiple: [defaultMarker, addedMarker],
                none: [],
                point: [pointMarker],
                area: [FR_FRIESLAND],
                mixed: [defaultMarker, addedMarker, FR_FRIESLAND],
            },
            control: {
                type: 'select',
                labels: {
                    marker1: 'Circular marker 1',
                    marker2: 'Circular marker 2',
                    multiple: '2 circular markers',
                    none: 'No markers',
                    point: 'Point marker',
                    area: 'Friesland - region marker',
                    mixed: 'Region and circular markers',
                },
            },
        },
    },
};

export const _Map = ({ width, height, ...args }) => (
    <div
        style={{
            width,
            height,
        }}
    >
        <MapWithGoogleLoader {...args} apiKey={apiKey} />
    </div>
);

_Map.args = {
    markers: 'none',
    defaultArea: 'address',
    defaultHighlight: 'NL',
    width: '800px',
    height: '400px',
};
