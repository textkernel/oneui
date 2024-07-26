import * as React from 'react';
import { Title, Subtitle, Description, Primary, ArgsTable, Stories } from '@storybook/blocks';
import '../src/themes/oneui/oneui.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Concepts', 'Theme', 'Atoms', 'Molecules', 'Organisms', 'Packages'],
        },
    },
    /**
     * Temporary solution for supporting deprecated `subcomponents`.
     * Since `subcomponents` are deprecated and `ArgsTable` was removed from generated story documentation,
     * the `subcomponents` props are not displayed in the documentation. This workaround addresses the issue.
     * More details: https://github.com/storybookjs/storybook/issues/20782
     */
    docs: {
        page: () => (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <ArgsTable />
            <Stories />
          </>
        ),
      },
};
