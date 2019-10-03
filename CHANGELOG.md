# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [8.0.1](https://github.com/textkernel/oneui/compare/8.0.0...8.0.1) (2019-10-03)


### Bug Fixes

* **LocationSelector:** move rest props to the main wrapper ([92fa259](https://github.com/textkernel/oneui/commit/92fa259))



## [8.0.0](https://github.com/textkernel/oneui/compare/7.0.0...8.0.0) (2019-09-26)


### Bug Fixes

* **LocationSelector:** rename components and fix unit tests ([#173](https://github.com/textkernel/oneui/issues/173)) ([c6f36db](https://github.com/textkernel/oneui/commit/c6f36db))


### BREAKING CHANGES

* **LocationSelector:** LocationSelector and related components has been renamed. For top level use LocationSelector (instead of LocationSelectorWithGoogleLoader which has been deprecated). There are no changes to the props. For sub components see documentation.



## [7.0.0](https://github.com/textkernel/oneui/compare/6.2.1...7.0.0) (2019-09-25)


### Bug Fixes

* escape button press doesn't reset the state of Autosuggest component ([#172](https://github.com/textkernel/oneui/issues/172)) ([a8b0377](https://github.com/textkernel/oneui/commit/a8b0377))


### Features

* **Drawer:** improvements Drawer component ([#171](https://github.com/textkernel/oneui/issues/171)) ([94a306f](https://github.com/textkernel/oneui/commit/94a306f))


### BREAKING CHANGES

* **Drawer:** changed Drawer API



### [6.2.1](https://github.com/textkernel/oneui/compare/6.2.0...6.2.1) (2019-09-12)


### Bug Fixes

* Add LocationSelector component files to the src/index.js ([#169](https://github.com/textkernel/oneui/issues/169)) ([40d0027](https://github.com/textkernel/oneui/commit/40d0027))


### Build System

* **deps:** bump eslint-utils from 1.3.1 to 1.4.2 in /example ([#166](https://github.com/textkernel/oneui/issues/166)) ([7b25096](https://github.com/textkernel/oneui/commit/7b25096))
* **deps:** bump lodash-es from 4.17.11 to 4.17.15 ([#168](https://github.com/textkernel/oneui/issues/168)) ([6ed6879](https://github.com/textkernel/oneui/commit/6ed6879))
* **deps:** bump lodash.template from 4.4.0 to 4.5.0 in /example ([#167](https://github.com/textkernel/oneui/issues/167)) ([14d2575](https://github.com/textkernel/oneui/commit/14d2575))



## [6.2.0](https://github.com/textkernel/oneui/compare/6.1.0...6.2.0) (2019-09-12)


### Bug Fixes

* **Slider:** update styling ([#163](https://github.com/textkernel/oneui/issues/163)) ([a0ba478](https://github.com/textkernel/oneui/commit/a0ba478))


### Features

* **component:** new Callout component ([#165](https://github.com/textkernel/oneui/issues/165)) ([810a81a](https://github.com/textkernel/oneui/commit/810a81a))
* **component:** New LocationSelector component ([#157](https://github.com/textkernel/oneui/issues/157)) ([e3c14d3](https://github.com/textkernel/oneui/commit/e3c14d3))



## [6.1.0](https://github.com/textkernel/oneui/compare/6.0.0...6.1.0) (2019-09-02)


### Features

* **component:** new Location Autocomplete component ([#154](https://github.com/textkernel/oneui/issues/154)) ([fd03816](https://github.com/textkernel/oneui/commit/fd03816))
* new TwoPaneView component ([#162](https://github.com/textkernel/oneui/issues/162)) ([d6bf5e4](https://github.com/textkernel/oneui/commit/d6bf5e4))



## [6.0.0](https://github.com/textkernel/oneui/compare/5.2.0...6.0.0) (2019-08-27)


*  feat(Map): add option to fit map to address as default view (#158) ([aefc9e7](https://github.com/textkernel/oneui/commit/aefc9e7)), closes [#158](https://github.com/textkernel/oneui/issues/158)
* feat:(Map): rename Map components to match LocationAutocomplete structure (#156) ([4741f9a](https://github.com/textkernel/oneui/commit/4741f9a)), closes [#156](https://github.com/textkernel/oneui/issues/156)


### Bug Fixes

* **bem:** add support to preserve existing classes in 'elem' ([#159](https://github.com/textkernel/oneui/issues/159)) ([f8f412b](https://github.com/textkernel/oneui/commit/f8f412b))


### Features

* **List:** Update item's onClick calling ([#150](https://github.com/textkernel/oneui/issues/150)) ([8609eaf](https://github.com/textkernel/oneui/commit/8609eaf))
* **LocationCard:** new LocationCard component ([#149](https://github.com/textkernel/oneui/issues/149)) ([5b70841](https://github.com/textkernel/oneui/commit/5b70841))
* **storybook:** added withStore decorator for Storybook ([#152](https://github.com/textkernel/oneui/issues/152)) ([f213823](https://github.com/textkernel/oneui/commit/f213823))
* new SearchButton component ([#160](https://github.com/textkernel/oneui/issues/160)) ([d4899cd](https://github.com/textkernel/oneui/commit/d4899cd))


### BREAKING CHANGES

* `center` and `zoom` props have been deprecated in favour of `defaultArea` that supports also fitting map boundaries based on address lookup
* Map component is renamed to MapWithGoogleLoader and MapRenderer to Map to better reflect their function and to match the LocationAutocomplete API



## [5.2.0](https://github.com/textkernel/oneui/compare/5.1.1...5.2.0) (2019-08-01)


### Bug Fixes

* **Autosuggest:** styles and behaviour adjustments ([#151](https://github.com/textkernel/oneui/issues/151)) ([e4c3946](https://github.com/textkernel/oneui/commit/e4c3946))


### Features

* **component:** new Map component ([#148](https://github.com/textkernel/oneui/issues/148)) ([3bf12d4](https://github.com/textkernel/oneui/commit/3bf12d4))



### [5.1.1](https://github.com/textkernel/oneui/compare/5.1.0...5.1.1) (2019-07-30)



## [5.1.0](https://github.com/textkernel/oneui/compare/5.0.0...5.1.0) (2019-07-25)


### Bug Fixes

* **List:** Fix scroll to highlighted component with keyboard navigation  ([#145](https://github.com/textkernel/oneui/issues/145)) ([165b025](https://github.com/textkernel/oneui/commit/165b025))


### Build System

* **deps:** bump lodash from 4.17.11 to 4.17.14 ([259c97b](https://github.com/textkernel/oneui/commit/259c97b))


### Features

* **component:** new Autosuggest, FieldWrapper and MarkedText components ([#137](https://github.com/textkernel/oneui/issues/137)) ([b7a8250](https://github.com/textkernel/oneui/commit/b7a8250))
* **component:** new Modal component ([#141](https://github.com/textkernel/oneui/issues/141)) ([fd5e379](https://github.com/textkernel/oneui/commit/fd5e379))
* **component:** new Slider component ([#144](https://github.com/textkernel/oneui/issues/144)) ([62ae1c5](https://github.com/textkernel/oneui/commit/62ae1c5))



## [5.0.0](https://github.com/textkernel/oneui/compare/4.0.1...5.0.0) (2019-07-23)

### Bug Fixes

-   **Header, Footer:** Adjust styling to match designs ([#138](https://github.com/textkernel/oneui/issues/138)) ([0851d4d](https://github.com/textkernel/oneui/commit/0851d4d))

### Features

-   **List:** added keyboard navigation ([#140](https://github.com/textkernel/oneui/issues/140)) ([46f7d87](https://github.com/textkernel/oneui/commit/46f7d87))
-   renamed OneUI.startCssVarsPonyfill to OneUI.applyCssVarsPonyfill() ([b8b3b61](https://github.com/textkernel/oneui/commit/b8b3b61))

### Tests

-   **WidthRestrictor:** add basic tests to components ([#139](https://github.com/textkernel/oneui/issues/139)) ([e45bacc](https://github.com/textkernel/oneui/commit/e45bacc))

### BREAKING CHANGES

-   if you used `OneUI.startCssVarsPonyfill()` directly in your app
    rename it to `OneUI.applyCssVarsPonyfill()`.

### [4.0.1](https://github.com/textkernel/oneui/compare/4.0.0...4.0.1) (2019-07-12)

### Bug Fixes

-   **BlockWidthRestrictor:** define box-sizing in css ([#136](https://github.com/textkernel/oneui/issues/136)) ([2c22106](https://github.com/textkernel/oneui/commit/2c22106))

## [4.0.0](https://github.com/textkernel/oneui/compare/3.0.0...4.0.0) (2019-07-11)

### Build System

-   **deps:** bump lodash.template from 4.4.0 to 4.5.0 ([#134](https://github.com/textkernel/oneui/issues/134)) ([dae7392](https://github.com/textkernel/oneui/commit/dae7392))

### Features

-   **ListItem:** Allow context highlighting in ListItem ([#132](https://github.com/textkernel/oneui/issues/132)) ([d8eec1e](https://github.com/textkernel/oneui/commit/d8eec1e))

### refactor

-   changed JobResult component name and props into more general ([2952e31](https://github.com/textkernel/oneui/commit/2952e31))

### BREAKING CHANGES

-   renamed JobResult component to Teaser

fix: updated test snapshot for Teaser

fix: added snapshot for Teaser

fix: fixed styles for trancate text in Teaser

fix: fixed styles for trancate text in Teaser

## [3.0.0](https://github.com/textkernel/oneui/compare/2.0.1...3.0.0) (2019-07-09)

### Bug Fixes

-   fixed ButtonGroup styles ([234849c](https://github.com/textkernel/oneui/commit/234849c))

### Build System

-   enhanced dev and prod build modes ([13bf249](https://github.com/textkernel/oneui/commit/13bf249)), closes [#ONEUI-53](https://github.com/textkernel/oneui/issues/ONEUI-53)

### Features

-   add container variables to make it a bit responsive ([#130](https://github.com/textkernel/oneui/issues/130)) ([39128ed](https://github.com/textkernel/oneui/commit/39128ed))
-   **component:** added WithResctroctor components ([0051627](https://github.com/textkernel/oneui/commit/0051627))

### BREAKING CHANGES

-   variable --site-container-size is deprecated in favor of --site-container-min-size, --site-container-max-size and --site-container-padding. Recommended new usage through <PageWidthRestrictor>.

### [2.0.1](https://github.com/textkernel/oneui/compare/2.0.0...2.0.1) (2019-06-26)

### Bug Fixes

-   **button:** include paddings / margins with box sizing; center-align button labels (notable when isBlock) ([8b17817](https://github.com/textkernel/oneui/commit/8b17817))

## [2.0.0](https://github.com/textkernel/oneui/compare/1.2.1...2.0.0) (2019-06-14)

### Bug Fixes

-   **buttongroup:** add separators, define context on group level, remove isInline prop ([#120](https://github.com/textkernel/oneui/issues/120)) ([2456b84](https://github.com/textkernel/oneui/commit/2456b84))

### Features

-   **workflow:** set up standard-version and update docs ([#118](https://github.com/textkernel/oneui/issues/118)) ([0953ec4](https://github.com/textkernel/oneui/commit/0953ec4))

### BREAKING CHANGES

-   **buttongroup:** ButtonGroup isInline prop is deprecated, ButtonGroup is now an inline element by default

## [1.2.1](https://github.com/textkernel/oneui/compare/1.2.0...1.2.1) (2019-06-11)

### Bug Fixes

-   **footer:** add styling to links ([#119](https://github.com/textkernel/oneui/issues/119)) ([3f0e8ad](https://github.com/textkernel/oneui/commit/3f0e8ad))
-   destruct props that should not be applied as html attributes ([#117](https://github.com/textkernel/oneui/issues/117)) ([bff61c3](https://github.com/textkernel/oneui/commit/bff61c3))

# [1.2.0](https://github.com/textkernel/oneui/compare/1.1.0...1.2.0) (2019-06-06)

### Bug Fixes

-   design adjustments ([#109](https://github.com/textkernel/oneui/issues/109)) ([f70fbbd](https://github.com/textkernel/oneui/commit/f70fbbd))
-   styling for buttongroup with single button ([#111](https://github.com/textkernel/oneui/issues/111)) ([16e0d9c](https://github.com/textkernel/oneui/commit/16e0d9c))
-   update default footer copyright ([#113](https://github.com/textkernel/oneui/issues/113)) ([a744bfa](https://github.com/textkernel/oneui/commit/a744bfa))

### Features

-   add textkernel full logo ([#110](https://github.com/textkernel/oneui/issues/110)) ([a0c856d](https://github.com/textkernel/oneui/commit/a0c856d))

# [1.1.0](https://github.com/textkernel/oneui/compare/1.0.0...1.1.0) (2019-05-21)

### Bug Fixes

-   **button:** fix height issues with anchor-buttons in safari ([#106](https://github.com/textkernel/oneui/issues/106)) ([cd9a281](https://github.com/textkernel/oneui/commit/cd9a281))
-   **storybook:** initialize oneui before loading stories ([#107](https://github.com/textkernel/oneui/issues/107)) ([cc2fa8d](https://github.com/textkernel/oneui/commit/cc2fa8d))
-   dont use relative paths for importing bem package ([#104](https://github.com/textkernel/oneui/issues/104)) ([87061b2](https://github.com/textkernel/oneui/commit/87061b2))
-   **storybook:** reinstate loadingspinner label knob ([5019185](https://github.com/textkernel/oneui/commit/5019185))

### Features

-   chip component ([#105](https://github.com/textkernel/oneui/issues/105)) ([b07eb08](https://github.com/textkernel/oneui/commit/b07eb08))

# [1.0.0](https://github.com/textkernel/oneui/compare/0.7.0...1.0.0) (2019-05-13)

### Bug Fixes

-   **a11y:** accessibility improvements ([#98](https://github.com/textkernel/oneui/issues/98)) ([eaa68d7](https://github.com/textkernel/oneui/commit/eaa68d7))
-   remove useCallback hook from pagination ([#100](https://github.com/textkernel/oneui/issues/100)) ([25e6188](https://github.com/textkernel/oneui/commit/25e6188))

# [0.7.0](https://github.com/textkernel/oneui/compare/0.6.1...0.7.0) (2019-05-10)

### Features

-   **component:** pagination components ([#83](https://github.com/textkernel/oneui/issues/83)) ([3081ddf](https://github.com/textkernel/oneui/commit/3081ddf))
-   forward refs in form components ([#85](https://github.com/textkernel/oneui/issues/85)) ([8df551a](https://github.com/textkernel/oneui/commit/8df551a))

### BREAKING CHANGES

-   Ref forwarding may introduce observably different behavior

## [0.6.1](https://github.com/textkernel/oneui/compare/0.6.0...0.6.1) (2019-05-07)

# [0.6.0](https://github.com/textkernel/oneui/compare/0.5.0...0.6.0) (2019-05-01)

### Bug Fixes

-   **icon:** inherit color by default ([#93](https://github.com/textkernel/oneui/issues/93)) ([2ea25b5](https://github.com/textkernel/oneui/commit/2ea25b5))
-   **storybook:** reinstate missing knobs for loadingspinner ([#91](https://github.com/textkernel/oneui/issues/91)) ([b9d029b](https://github.com/textkernel/oneui/commit/b9d029b))

# [0.5.0](https://github.com/textkernel/oneui/compare/0.4.0...0.5.0) (2019-04-24)

### Bug Fixes

-   **button:** do not apply context as element attribute ([#86](https://github.com/textkernel/oneui/issues/86)) ([73d3dc9](https://github.com/textkernel/oneui/commit/73d3dc9))

### Features

-   **theming:** oneui themeloader ([#63](https://github.com/textkernel/oneui/issues/63)) ([ff8d34c](https://github.com/textkernel/oneui/commit/ff8d34c))

# [0.4.0](https://github.com/textkernel/oneui/compare/0.3.1...0.4.0) (2019-04-18)

## [0.3.1](https://github.com/textkernel/oneui/compare/0.3.0...0.3.1) (2019-03-27)

# [0.3.0](https://github.com/textkernel/oneui/compare/0.2.1...0.3.0) (2019-03-22)

## [0.2.1](https://github.com/textkernel/oneui/compare/0.1.0...0.2.1) (2019-02-20)
