export const VALIDATION_CONTEXTS = [
    'neutral',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
] as const;

export const CONTEXTS = ['info', ...VALIDATION_CONTEXTS] as const;

export const SIZES = ['small', 'normal', 'large'] as const;
export const HEADING_SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const CHECKBOX_VIEWBOX = [0, 0, 10, 10] as const;
export const COLORS = [
    '#AFF5E2',
    '#D6F481',
    '#FFF16B',
    '#FFD571',
    '#FFC4A6',
    '#E5DAC9',
    '#ECCBFF',
    '#FFC5EB',
    '#FCC1CF',
    '#C4D7FC',
    '#ADDDFF',
    '#75DFFB',
];

export type ValidationContext = typeof VALIDATION_CONTEXTS[number];
export type Context = typeof CONTEXTS[number];
export type Size = typeof SIZES[number];
