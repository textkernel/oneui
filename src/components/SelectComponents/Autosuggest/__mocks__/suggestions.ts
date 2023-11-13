export const SUGGESTIONS = [
    { name: 'Sun' },
    { name: 'Moon' },
    { name: 'Mercury' },
    { name: 'Venus' },
    { name: 'Earth' },
    { name: 'Mars' },
    { name: 'Jupiter' },
    { name: 'Saturn' },
    { name: 'Neptune' },
    { name: 'Pluto', disabled: true },
];

export type SuggestionsType = (typeof SUGGESTIONS)[number];

export const COMPLEX_SUGGESTIONS = [
    { name: 'Sun', type: 'star' },
    { name: 'Moon', type: 'star' },
    { name: 'Mercury', type: 'planet' },
    { name: 'Venus', type: 'planet' },
    { name: 'Earth', type: 'planet' },
    { name: 'Mars', type: 'planet' },
    { name: 'Jupiter', type: 'planet' },
    { name: 'Saturn', type: 'planet' },
    { name: 'Neptune', type: 'planet' },
];

export const SUGGESTION_TO_STRING = (item) => (item ? item.name : '');
