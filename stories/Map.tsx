import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean, number } from '@storybook/addon-knobs';
import { MapWithGoogleLoader } from '@textkernel/oneui';
import { ensureApiKey } from './utils/ensureApiKey';
import NL_PATHS from './static/gadm36_NLD_0.json';
import DR_DRENTHE from './static/nl_geo/DR_Drenthe.json';
import FL_FLEVOLAND from './static/nl_geo/FL_Flevoland.json';
import FR_FRIESLAND from './static/nl_geo/FR_Friesland.json';
import GE_GELDERLAND from './static/nl_geo/GE_Gelderland.json';

storiesOf('Atoms|Map', module)
    .addDecorator(withKnobs)
    .add(
        'Map',
        () => {
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
            const markers = {
                marker1: [defaultMarker],
                marker2: [addedMarker],
                multiple: [defaultMarker, addedMarker],
                none: [],
                'pointer marker': [pointMarker],
                areas: [DR_DRENTHE, FL_FLEVOLAND, FR_FRIESLAND, GE_GELDERLAND],
                'markers and areas': [
                    defaultMarker,
                    addedMarker,
                    DR_DRENTHE,
                    FL_FLEVOLAND,
                    FR_FRIESLAND,
                    GE_GELDERLAND,
                ],
            };

            const markerToShow = select('Markers', Object.keys(markers), 'none');

            return (
                <div
                    style={{
                        width: text('Container width', '800px'),
                        height: text('Container height', '400px'),
                    }}
                >
                    <MapWithGoogleLoader
                        apiKey={apiKey}
                        markers={markers[markerToShow]}
                        defaultArea={
                            boolean('Use address to set default area', false)
                                ? {
                                      address: text(
                                          'Address to fit map to when no markers are present',
                                          'Netherlands'
                                      ),
                                  }
                                : {
                                      center: {
                                          lat: number('Default center latitude', 52.3922288),
                                          lng: number('Default center longitude', 4.9338793),
                                      },
                                      zoom: number('Default zoom', 7),
                                  }
                        }
                        defaultHighlight={
                            boolean('Add default highlight area', true) ? NL_PATHS : null
                        }
                    />
                </div>
            );
        },
        {
            info: {
                text: `
        ## Displaying Map in storybook

        To make this component work in none-dev mode, you need to provide your own Google API key. At the moment this is only possible via accessing the source code. Sorry for the inconvenience.

        ## Note about props

        'MapWithGoogleLoader' is a wrapper around the 'Map' component, and it makes sure the Google API is loaded on the page. 
        
        You don't need to use 'Map' directly.
        'MapWithGoogleLoader' __will pass props__ that are not needed for loading the API __to 'Map'__, so you can provide them all together. For list of props see below
        `,
            },
        }
    );
