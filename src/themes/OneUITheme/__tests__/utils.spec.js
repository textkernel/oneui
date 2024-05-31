import { mixTwoColors, generateColorShades } from '../utils';

describe('OneUITheme/utils', () => {
    describe('#mixTwoColors()', () => {
        it('should return correct mixed color', () => {
            const mixedColor = mixTwoColors('white', 'black', 20);
            expect(mixedColor).toEqual('#CCCCCC');
        });
    });
    describe('#generateColorShades()', () => {
        it('should generate color shades correctly', () => {
            const computedColors = generateColorShades(
                {
                    '--color-brand': '#0097d1',
                    '--color-background': '#fff',
                    '--color-neutral': '#1d1d1b',
                },
                '--color-brand'
            );
            expect(computedColors).toEqual({
                '--color-brand-10': '#CCEAF6',
                '--color-brand-25': '#80CBE8',
                '--color-brand-40': '#33ACDA',
                '--color-brand-60': '#0079A7',
                '--color-brand-75': '#004C69',
                '--color-brand-90': '#001E2A',
            });
        });
    });
});
