// import React from 'react';
// import { render, RenderResult, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { ThemerollerConfig } from '../../themes/themerollerConfig';
// import { CssVars, Themeroller } from '../Themeroller';
//
// export const ThemerollerConfig = [
//     {
//         fieldsetName: 'Colors',
//         items: [
//             {
//                 label: 'Background color',
//                 type: 'color',
//                 var: '--color-background',
//                 value: '#ffffff',
//             },
//             {
//                 label: 'Foreground color',
//                 type: 'color',
//                 var: '--color-neutral',
//                 value: '#1d1d1b',
//             },
//             {
//                 label: 'Border radius',
//                 type: 'unit',
//                 var: '--border-radius',
//                 value: '3',
//                 unit: 'px',
//             },
//             {
//                 label: 'Link decoration',
//                 type: 'string',
//                 var: '--link-decoration-normal',
//                 value: 'none',
//             },
//         ],
//     },
//     {
//         fieldsetName: 'Sizing',
//         items: [],
//     },
// ] as ThemerollerConfig;
//
// describe('Themeroller component', () => {
//     afterEach(() => {
//         jest.resetAllMocks();
//     });
//
//     it('should render component correctly', () => {
//         // @ts-ignore
//         const view = render(
//             <Themeroller
//                 config={ThemerollerConfig}
//                 cssVars={
//                     {
//                         '--color-neutral': '#000000',
//                     } as CssVars
//                 }
//                 onChange={() => {}}
//             />
//         );
//
//         expect(view.container).toMatchSnapshot();
//     });
// });
