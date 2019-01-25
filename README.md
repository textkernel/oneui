# Nice 2

[![Build Status](https://travis-ci.com/textkernel/oneui.svg?branch=master)](https://travis-ci.com/textkernel/oneui)

React Nice UI kit with theme support

## Integrating Nice in your Application
### Installing

```npm i ...```
### Boilerplate
In your application's `<head>` import the nice stylesheet followed by the stylesheet of the theme you want to apply (if different from default)
```
<link data-nice-level="nice" rel="stylesheet" href="./nice2.css">
<link data-nice-level="theme" rel="stylesheet" href="./theme-custom.css">
```
Make sure all other dependencies, such as fonts are also loaded. See details in the [example app](example/public/index.html)

#### IE 11 support
Nice themes use css variables. To support IE11 and other browsers that don't support css variables you need add a [polyfill: css-vars-ponyfill](https://www.npmjs.com/package/css-vars-ponyfill). 

Best to ensure that only the polyfills you need in the `<head>` of your application are inserted, based on the current environment. E.g. should not add IE11 polifills in Chrome. To achive this, add:
```
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```
For details see: [Polyfill.io](https://polyfill.io/v2/docs/)

You can load the polyfill via the html `<head>` as in the example app: 
```
<script src="https://unpkg.com/css-vars-ponyfill@1"></script>
<script type="text/javascript" src="/css-vars-config.js"></script>
```

or via npm and load the config programmatically. See details in the [package documentation page](https://www.npmjs.com/package/css-vars-ponyfill).

See [cofig file](example/public/css-vars-config) in example app.

## Usage
In your React app you can import any of the available components
```
import { Button } from 'nice2';
(...)
<Button>Click me</Button>
```
_Note_: in all components all "other properties" (that are not documented in that component) are applied to the rendered HTML.

## Creating themes
A theme for Nice is a simple css file that overrides css variables.

## Documentation
For available components and their usage see storybook (`npm run storybook`)

## Contribution

* If yor IDE doesn't support [editor config](https://editorconfig.org/), please install a plugin for your IDE (e.g. [plugin for VS Code](https://github.com/editorconfig/editorconfig-vscode)).
* Please make sure to read the [implementation guidelines](src/README.md) before contributing

## Development

See `package.json -> scripts` section for available tasks.
