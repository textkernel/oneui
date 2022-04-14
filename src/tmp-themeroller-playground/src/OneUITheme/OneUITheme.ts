import Color from 'color';

export function OneUITheme(customVariables: Record<string, string> = {}) {
    const baseVariables = {
        '--color-background': '#FEFEFE',
        '--color-foreground': '#333333',
        '--offset-base': '10px',
    };
    const vars = {
        ...baseVariables,
        ...customVariables,
    };
    return `
        --text-color-light: ${Color(vars['--color-background']).mix(Color(vars['--color-foreground']), 0.25)},
        --text-color: ${Color(vars['--color-background']).mix(Color(vars['--color-foreground']), 0.5)},
        --text-color-dark: ${Color(vars['--color-background']).mix(Color(vars['--color-foreground']), 0.75)},

        --offset-tiny: calc(${vars['--offset-base']}   * 0.5);
        --offset-normal: calc(${vars['--offset-base']} * 1);
        --offset-large: calc(${vars['--offset-base']}  * 2);
    `;
};
