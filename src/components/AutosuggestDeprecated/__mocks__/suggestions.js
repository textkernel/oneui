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

export const SUGGESTION_TO_STRING = (item) => (item ? item.name : '');
