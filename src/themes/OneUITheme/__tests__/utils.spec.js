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
                    '--color-primary': '#0097d1',
                    '--color-background': '#fff',
                    '--color-neutral': '#1d1d1b',
                },
                '--color-primary'
            );
            expect(computedColors).toEqual({
                '--color-primary-10': '#CCEAF6',
                '--color-primary-25': '#80CBE8',
                '--color-primary-40': '#33ACDA',
                '--color-primary-60': '#0079A7',
                '--color-primary-75': '#004C69',
                '--color-primary-90': '#001E2A',
            });
        });
    });
});
