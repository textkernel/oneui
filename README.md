# Textkernel OneUI

[![npm version](https://img.shields.io/npm/v/@textkernel/oneui.svg)](https://www.npmjs.com/package/@textkernel/oneui)
![check](https://github.com/textkernel/oneui/actions/workflows/check.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/textkernel/oneui/badge.svg?branch=master)](https://coveralls.io/github/textkernel/oneui?branch=master)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/textkernel/oneui.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/textkernel/oneui/context:javascript)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/textkernel/oneui)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@textkernel/oneui.svg)

> Library of reusable React components with theming support

# Getting started

For live examples of all OneUI components, [click here](https://textkernel.github.io/oneui/).

## Install with npm

Within your project’s frontend root, install the package from NPM. Make sure it’s marked as production dependency.

```bash
$ npm i '@textkernel/oneui'
```

## Set up boilerplate

### Import OneUI base stylesheet

In your application main Javascript, make sure to import the OneUI base stylesheet. The base stylesheet includes the default OneUI theme.

```javascript
import '@textkernel/oneui/dist/oneui.min.css';
```

### Assign base class to <body>

Assign the base class that has all font definitions to <body> or to <html>

```html
<body class="OneUI-body-text">
    ...
</body>
```

### Custom themes and browser support

To enable support for older browsers that don’t support CSS variables natively and to apply custom a theme, OneUI comes with a utility that takes on all of these responsibilities. See [Theming](#theming) for more on custom themes.

To apply a specific theme on top of the library components, the OneUI utility can be used to parse the provided theme file:

```javascript
import OneUI from '@textkernel/oneui';

OneUI.init({
    themeURL: 'http://theme-cdn.com/my-theme.css',
}).then(() => ReactDOM.render(<MyApp />, document.getElementById('root')));
```

The utility can take three optional arguments:

-   `themeURL`: URL that provides the file containing the CSS variables that will be used instead of the default ones.
-   `maxTime`: The maximum amount of time in milliseconds that the loader will wait to parse the external theme, otherwise it will fallback to the default library theme. By default, the timeout is set to 2000 milliseconds.
-   `ponyfillOptions`: Allow the developer to override the default [css-vars-ponyfill](https://www.npmjs.com/package/css-vars-ponyfill) configuration.

#### IE11 support

OneUI relies on browser support for CSS variables. Support for older browsers such as IE11 can be enabled by using a polyfill. Using the previously mentioned utility will take care of it automatically.

## Using components

1. Import the desired UI component(s) from the library, e.g.:

```javascript
import { Button } from '@textkernel/oneui';
```

2. Include the component on your page:

```jsx
<Button isPrimary type="submit">
    This is a button
</Button>
```

### Undocumented props

Please note that any properties that are not documented in the component prop types definition are applied to the top level HTML element unless mentioned otherwise. These undocumented props are also not described in Storybook.

# Storybook

OneUI comes with a Storybook of examples for all components. [Click here](https://textkernel.github.io/oneui/) to check it out.

In order to run it yourself locally...

1. Make sure you have Storybook installed (globally):

```bash
$ npm i -g @storybook/cli
```

2. Within the OneUI root, run `npm run storybook`
3. Go to http://localhost:9001 to check out examples of all OneUI components

# Theming

All CSS variables (‘[custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)’) exposed by OneUI can be customized. A theme file is an additional stylesheet that consists of a reassignment of all variables with values that are different from their defaults. Theme files should not contain any CSS selectors or properties - only CSS variables and values, e.g.:

```css
--color-brand-50: red;
--font-size-base: 12px;
```

# Contributing

-   Did you find a bug or do you have a feature proposal? Please open a new issue.
-   If your IDE does not support [EditorConfig](https://editorconfig.org/), please install a plugin (e.g. for VS Code).
-   Please make sure to read the [developer guidelines](CONTRIBUTING.md) before contributing.

# Copyright

Code and documentation © 2020 Textkernel B.V.
