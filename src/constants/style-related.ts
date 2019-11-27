export const CONTEXTS = [
    'neutral',
    'brand',
    'primary',
    'accent',
    'info',
    'good',
    'warning',
    'bad',
] as const;

export const SIZES = ['small', 'normal', 'large'] as const;
export const HEADING_SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const CHECKBOX_VIEWBOX = [0, 0, 10, 10] as const;

export type Context = typeof CONTEXTS[number];
export type Size = typeof SIZES[number];
