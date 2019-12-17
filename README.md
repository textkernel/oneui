# Textkernel OneUI

[![npm version](https://img.shields.io/npm/v/@textkernel/oneui.svg)](https://www.npmjs.com/package/@textkernel/oneui)
[![Build Status](https://travis-ci.com/textkernel/oneui.svg?branch=master)](https://travis-ci.com/textkernel/oneui)
[![Coverage Status](https://coveralls.io/repos/github/textkernel/oneui/badge.svg?branch=master)](https://coveralls.io/github/textkernel/oneui?branch=master)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/textkernel/oneui.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/textkernel/oneui/context:javascript)
![](https://img.shields.io/david/textkernel/oneui.svg?style=flat)
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
import { Alert } from '@textkernel/oneui';
```

2. Include the component on your page:

```jsx
<Alert context="info" title="Hey there!">
    This is some information for you
</Alert>
```

### Undocumented props

Please note that any properties that are not documented in the component prop types definition are applied to the top level HTML element unless mentioned otherwise. These undocumented props are also not described in Storybook.

# Examples

## Storybook

OneUI comes with a Storybook of examples for all components. [Click here](https://textkernel.github.io/oneui/) to check it out.

In order to run it yourself locally...

1. Make sure you have Storybook installed (globally):

```bash
$ npm i -g @storybook/cli
```

2. Within the OneUI root, run `npm run storybook`
3. Go to http://localhost:9001 to check out examples of all OneUI components

## Example implementation

An implementation example can be found in the example directory, along with instructions on how to run it.

# Theming

All CSS variables (‘[custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)’) exposed by OneUI can be customized, except for color shades (e.g. `--color-primary-25`) which are computed when generating new themes. A theme file is an additional stylesheet that consists of a reassignment of all variables with values that are different from their defaults. Theme files should not contain any CSS selectors or properties - only CSS variables and values, e.g.:

```css
--color-primary: red;
--color-brand: blue;
--font-size-base: 12px;
```

# Testing your application when using OneUI

Currently OneUI exports only ES module bundle. This allows your bundle to tree-shake parts of this library that are not used by you. However it will create problems if you don't transform it to commonJS modules when it is used in e.g. NodeJS. For example if you are using Jest to test your application you will have to tell babel to compile OneUI along with the rest of your code into commonJS modules:

```js
// Jest configuration to recompile libraries
const librariesToRecompile = [
    '@textkernel/oneui',
    // other libraries you might need to recompile
].join('|');

const config = {
    transformIgnorePatterns: [`[\\\/]node_modules[\\\/](?!(${librariesToRecompile})).*$`],
};
```

The above RegEx will tell jest to exclude all node_modules (default behavior) but the ones listed in the array above.

# Contributing

-   Did you find a bug or do you have a feature proposal? Please open a new issue.
-   If your IDE does not support [EditorConfig](https://editorconfig.org/), please install a plugin (e.g. for VS Code).
-   Please make sure to read the [developer guidelines](CONTRIBUTING.md) before contributing.

# Copyright

Code and documentation © 2019 Textkernel B.V.
