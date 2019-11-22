/** Constants that are component specific but do not merit a separate file */

/** Autocomplete */
export const NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS = 5;

/** Button */
export const BUTTON_TYPES = ['submit', 'button'] as const;

export type ButtonTypes = typeof BUTTON_TYPES[number];

/** Input */
export const INPUT_TYPES = [
    'text',
    'password',
    'email',
    'date',
    'datetime-local',
    'month',
    'tel',
    'number',
    'url',
    'search',
    'time',
    'week',
] as const;

export type InputTypes = typeof INPUT_TYPES[number];

/** List */
export const LIST_NAVIGATION_DIRECTIONS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
};

/** PopupBase */
export const POPUP_PLACEMENTS = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
];
