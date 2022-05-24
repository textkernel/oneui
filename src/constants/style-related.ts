export const VALIDATION_CONTEXTS = ['good', 'warning', 'bad'] as const;

export const CONTEXTS = [
    'neutral',
    'brand',
    'primary',
    'accent',
    'info',
    ...VALIDATION_CONTEXTS,
] as const;

export const SIZES = ['small', 'normal', 'large'] as const;
export const HEADING_SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const CHECKBOX_VIEWBOX = [0, 0, 10, 10] as const;
export const COLORS = [
    '#00FFFF',
    '#90EE90',
    '#FFD700',
    '#FFA500',
    '#ad8a62',
    '#F699CD',
    '#CCCCFF',
    '#CD57FF',
    '#8A2BE2',
    '#ADD8E6',
    '#87CEEB',
];

export type ValidationContext = typeof VALIDATION_CONTEXTS[number];
export type Context = typeof CONTEXTS[number];
export type Size = typeof SIZES[number];
