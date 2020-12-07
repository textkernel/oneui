export const geocodeResponse = {
    results: [
        {
            address_components: [
                {
                    long_name: 'Netherlands',
                    short_name: 'NL',
                    types: ['country', 'political'],
                },
            ],
            formatted_address: 'Netherlands',
            geometry: {
                bounds: {
                    northeast: {
                        lat: 53.6316,
                        lng: 7.227510199999999,
                    },
                    southwest: {
                        lat: 50.75038379999999,
                        lng: 3.3316001,
                    },
                },
                location: {
                    lat: () => 52.132633,
                    lng: () => 5.291265999999999,
                },
                location_type: 'APPROXIMATE',
                viewport: {
                    northeast: {
                        lat: 53.6756,
                        lng: 7.227140500000001,
                    },
                    southwest: {
                        lat: 50.7503837,
                        lng: 3.3316,
                    },
                },
            },
            place_id: 'ChIJu-SH28MJxkcRnwq9_851obM',
            types: ['country', 'political'],
        },
    ],
    status: 'OK',
};
