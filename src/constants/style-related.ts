export const VALIDATION_CONTEXTS = ['success', 'cautious', 'critical'] as const;

export const CONTEXTS = ['info', ...VALIDATION_CONTEXTS] as const;

export const SIZES = ['small', 'normal', 'large'] as const;
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

export type ValidationContext = (typeof VALIDATION_CONTEXTS)[number];
export type Context = (typeof CONTEXTS)[number];
export type Size = (typeof SIZES)[number];
