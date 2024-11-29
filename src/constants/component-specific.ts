/** Constants that are component specific but do not merit a separate file */

/** Autocomplete */
export const NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS = 5;

/** Button */
export const BUTTON_TYPES = ['submit', 'button', 'reset'] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];

export type ButtonContext = 'primary' | 'secondary' | 'critical';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

export type BadgeVariant = 'subtle' | 'bold';

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
    'color',
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

/** List */
export const LIST_NAVIGATION_DIRECTIONS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
};

/** PopupBase, MultiActionButton */
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
] as const;

export type PopupPlacement = (typeof POPUP_PLACEMENTS)[number];

/** Gauge */
export const GAUGE_RADIUS = 100;
