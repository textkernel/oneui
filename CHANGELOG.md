# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [28.2.1](https://github.com/textkernel/oneui/compare/28.2.0...28.2.1) (2024-12-17)


### Bug Fixes

* **deps:** update dependency @radix-ui/react-dropdown-menu to v2.1.3 ([#1350](https://github.com/textkernel/oneui/issues/1350)) ([1bad4c3](https://github.com/textkernel/oneui/commit/1bad4c3bfbc19c4a844ccec326c2ff04df4e3cf1))
* **SelectedItemBadge:** width and scrolling of the dropdown ([#1351](https://github.com/textkernel/oneui/issues/1351)) ([d80823f](https://github.com/textkernel/oneui/commit/d80823fcefaecd087fb52a93e3642af8419e775a))

## [28.2.0](https://github.com/textkernel/oneui/compare/28.1.0...28.2.0) (2024-12-10)


### Features

* **CounterBadge:** new component ([#1339](https://github.com/textkernel/oneui/issues/1339)) ([bfe5e10](https://github.com/textkernel/oneui/commit/bfe5e1082aebc0d3fc30b5fa1baa3e7118d59393))


### Bug Fixes

* **Changelog:** add breaking changes ([#1340](https://github.com/textkernel/oneui/issues/1340)) ([0c2aae4](https://github.com/textkernel/oneui/commit/0c2aae42a5578178f3e3cdf3ab0a1259417c405c))
* issues after latest releases ([#1343](https://github.com/textkernel/oneui/issues/1343)) ([32c2933](https://github.com/textkernel/oneui/commit/32c293300f88b49acb974a4da22fe7d24963b981))

## [28.1.0](https://github.com/textkernel/oneui/compare/28.0.0...28.1.0) (2024-11-29)

### ⚠ BREAKING CHANGES (due to error, the version number is not representative of these)

* **Dialog** Component Props API change. Introduction of closeButton. If title defined, closeButton should be defined as well.
* **PillDropdown** Done button was removed from the dropdown
* **PillDropdown** Remove the close function
* **PillDropdown** Change children type to ReactNode

### Features

* **Breadcrumb:** new component ([#1331](https://github.com/textkernel/oneui/issues/1331)) ([7202695](https://github.com/textkernel/oneui/commit/72026952ea0df31cf3bfc5e78dbb08a2d5a645ff))
* **Dialog:** update dialog design specs ([#1288](https://github.com/textkernel/oneui/issues/1288)) ([f20c1fa](https://github.com/textkernel/oneui/commit/f20c1fa023997bd4c1f09af56255644a44ca1b08))
* **PillButtonEnhance:** update component ([#1337](https://github.com/textkernel/oneui/issues/1337)) ([d379470](https://github.com/textkernel/oneui/commit/d3794700e784ec95c698632a77a18520d9cc8a07))
* **PillDropdown:** updated pill dropdown ([#1300](https://github.com/textkernel/oneui/issues/1300)) ([2d6e619](https://github.com/textkernel/oneui/commit/2d6e6194276d4026c1321af48211d78aaf5fc834))
* **StatusBadge:** new component ([#1309](https://github.com/textkernel/oneui/issues/1309)) ([a4ce342](https://github.com/textkernel/oneui/commit/a4ce342cb1a85685966468bfffddb70bc4d36c1f))


### Bug Fixes

* add teaser and checkbox breaking change to changelog ([#1332](https://github.com/textkernel/oneui/issues/1332)) ([18ac712](https://github.com/textkernel/oneui/commit/18ac712c83b6ed2c85237d671a5ee92d11c2c98b))
* change fonts ([#1289](https://github.com/textkernel/oneui/issues/1289)) ([b1446e0](https://github.com/textkernel/oneui/commit/b1446e0a346c46284b84d43a3237931931bb3068))
* **deps:** update dependency rc-slider to v10.6.2 ([#1318](https://github.com/textkernel/oneui/issues/1318)) ([c8f1c03](https://github.com/textkernel/oneui/commit/c8f1c030cf6ab2ab09f13860ef8b62c6b621872e))
* **deps:** update dependency remove-accents to v0.5.0 ([#1320](https://github.com/textkernel/oneui/issues/1320)) ([4d20be8](https://github.com/textkernel/oneui/commit/4d20be89d2470a79d5de57055184bf63decc2b6d))
* **different components:** fix small layout bugs ([#1338](https://github.com/textkernel/oneui/issues/1338)) ([56e7cc3](https://github.com/textkernel/oneui/commit/56e7cc32eae0beb769b2e75468d5fc40ff455328))
* sass deprecation warnings ([#1292](https://github.com/textkernel/oneui/issues/1292)) ([91316ee](https://github.com/textkernel/oneui/commit/91316ee88419bb9ac8fcb5feb52eb4e430f8650c))

## [28.0.0](https://github.com/textkernel/oneui/compare/27.0.0...28.0.0) (2024-11-18)


### ⚠ BREAKING CHANGES

* **Pill:** PillButton props toggleDropdown removed
* **Pill:** Pill uses RadixDropdown under the hood.

### Bug Fixes

* **deps:** update dependency core-js to v3.39.0 ([#1315](https://github.com/textkernel/oneui/issues/1315)) ([146eaf9](https://github.com/textkernel/oneui/commit/146eaf904d89995e837d47c9486c4830ab92333d))
* **Pill:** bugs in Pill with Enhanced options ([#1316](https://github.com/textkernel/oneui/issues/1316)) ([8e2ed49](https://github.com/textkernel/oneui/commit/8e2ed49fec0a602cd5fde34aad1c93780a1167a0))

## [27.0.0](https://github.com/textkernel/oneui/compare/26.1.0...27.0.0) (2024-11-11)


### ⚠ BREAKING CHANGES

* **Tag:** 'size' is no longer a prop
* **Dropdown:** Dropdown component API and structure changed
* **Teaser:** Teaser component API and structure changed

### Features

* **Dropdown:** refactor component based on Radix primitives ([#1281](https://github.com/textkernel/oneui/issues/1281)) ([2cf2846](https://github.com/textkernel/oneui/commit/2cf28469c834c7c0239886541dc94f0f7da3e16f))
* **Pill:** add new PillButton variant ([#1303](https://github.com/textkernel/oneui/issues/1303)) ([80b7c21](https://github.com/textkernel/oneui/commit/80b7c21991a73afa95e3d057326748959d548237))
* **PrioritySelector:** new component ([#1308](https://github.com/textkernel/oneui/issues/1308)) ([5b5e09b](https://github.com/textkernel/oneui/commit/5b5e09ba26477d1f8d58474152dbb1d323e9972b))
* **SearchInput:** create new component ([#1286](https://github.com/textkernel/oneui/issues/1286)) ([fa65305](https://github.com/textkernel/oneui/commit/fa65305f5c9fecb9ea4d4b76f72486f1efa1ef9e))
* **Teaser:** redesign Teaser ([#1266](https://github.com/textkernel/oneui/issues/1266)) ([815d29b](https://github.com/textkernel/oneui/commit/815d29bf3cc0436a33ca50a3646c1947862b6ebd))
* **Tooltip:** implement new design ([07410ed](https://github.com/textkernel/oneui/commit/07410edbaee18cc83154ad20646da39568d6a4de))


### Bug Fixes

* border full width and jumping ([#1311](https://github.com/textkernel/oneui/issues/1311)) ([11313dd](https://github.com/textkernel/oneui/commit/11313dd8c9b8e24b89e2c9c0dcb7382bbceaa78d))
* **deps:** update dependency @popperjs/core to v2.11.8 ([cc14555](https://github.com/textkernel/oneui/commit/cc14555eaa65fb027c66e72fb86de936b4a3caf8))
* **deps:** update dependency @react-google-maps/api to v2.20.3 ([7b54149](https://github.com/textkernel/oneui/commit/7b54149bc2f75ae0b71a44d01d2755e9447d3ccf))
* **deps:** update dependency ajv to v8.17.1 ([#1314](https://github.com/textkernel/oneui/issues/1314)) ([d6fe419](https://github.com/textkernel/oneui/commit/d6fe41937df427239b17038fe2c59f2168146ead))
* don't render space for title when no title ([#1310](https://github.com/textkernel/oneui/issues/1310)) ([9dc399d](https://github.com/textkernel/oneui/commit/9dc399d2f3d10d45820ba6ec87c7727cce438b49))
* **MultiSelectItem:** use correct background color for the group-title variant ([#1287](https://github.com/textkernel/oneui/issues/1287)) ([963ea61](https://github.com/textkernel/oneui/commit/963ea61db022c19e85b92d2136ac292610c4569e))


* **Tag:** migrate Tag component ([#1302](https://github.com/textkernel/oneui/issues/1302)) ([ef88a31](https://github.com/textkernel/oneui/commit/ef88a319442047fba63c033ca2c0ca84d0a697c4))

## [26.1.0](https://github.com/textkernel/oneui/compare/26.0.0...26.1.0) (2024-10-14)


### Features

* **IconButton:** new component ([#1263](https://github.com/textkernel/oneui/issues/1263)) ([ef5ab11](https://github.com/textkernel/oneui/commit/ef5ab115acd26254e706329376a38f59ead544bb))
* **MultiSelectItem:** new component ([#1256](https://github.com/textkernel/oneui/issues/1256)) ([ab8175d](https://github.com/textkernel/oneui/commit/ab8175d3139996c34e9f16448acddf854867ed23))
* **Separators:** new components ([83c7724](https://github.com/textkernel/oneui/commit/83c7724e67a93517fa0368a327fad242f29dd794))
* **SingleSelectItem:** new atom ([#1239](https://github.com/textkernel/oneui/issues/1239)) ([f33a072](https://github.com/textkernel/oneui/commit/f33a0724022b6d63995300be4e8d0e1372ac9b11))


### Bug Fixes

* **deps:** update dependency @googlemaps/js-api-loader to v1.16.8 ([261172c](https://github.com/textkernel/oneui/commit/261172cbb51da4892a69527169cb1b9bd9e11962))

## [26.0.0](https://github.com/textkernel/oneui/compare/25.0.0...26.0.0) (2024-09-19)


### ⚠ BREAKING CHANGES

* **SelectedItemBadge:** rename `SelectBadge` to `SelectedItemBadge`, update all references to `SelectBadge` with `SelectedItemBadge`
* **SelectedItemBadge:** move previously passed `children` text to the `label` prop
* **SelectedItemBadge:** use `children` to pass items to the main dropdown content
* **SelectedItemBadge:** remove separate handler `option.onChange` for option change, use generalized `onChange` to handle changes in the main dropdown
* **SelectedItemBadge:** rename `deleteButtonAriaLabel` to `deleteButtonLabel`
* **SelectedItemBadge:** remove all option-related props and the usage of the Option type
* **SelectedItemBadge:** ensure that `priority.selectedItem` is always provided, as it is now mandatory
* **SelectedItemBadge:** use new `additionalLabel` prop to aria label on the main button
* **Input:** `size` prop is limited to `small` or `medium`, with `medium` as the default, replace size="large" or omitting size (previously defaulting to `normal`) with size="medium", or use size="small" as needed
* **Input:** `context` prop only accepts `critical`. Remove any usage of `brand` or `success` context. Provide `errorMessage` if critical context is expected
* **Input:** replace any custom methods for setting inputs as non-editable with new prop `readOnly`
* **Input:** replace existing approaches for displaying helper text with the new `helperText` prop
* **Input:** use the `label` prop for input labels, replacing any previous label handling
* **Input:** use the `reserveErrorMessageSpace` prop to determine whether space should be reserved for error message under the input field when validation is expected, especially if no helper text is present
* **Link:** `context` and `doNotDecorateOnHover` props are no longer supported for Link component
* **Text:** `size='normal'` is renamed `size='medium'` for `Text` and `Tag` components
* **Button:** button props `isLink` & `isInline` & `isPrimary` are removed
* **Button:** button prop `isInline` button should be replaced by `size="small"`
* **Button:** button prop `isLink` should be replaced by `variant="ghost"`
* **Button:** button prop `isPrimary` should be replaced with `variant="filled"` (default) or removed
* **Button:** button prop `size: "normal"` is replaced with `size: "medium"`

### Features

* **Button:** button redesign ([#1234](https://github.com/textkernel/oneui/issues/1234)) ([d365559](https://github.com/textkernel/oneui/commit/d36555903c953f39f9af2950b15babe6f5459361))
* **Input:** migrate to new design ([#1248](https://github.com/textkernel/oneui/issues/1248)) ([#1255](https://github.com/textkernel/oneui/issues/1255)) ([34640e5](https://github.com/textkernel/oneui/commit/34640e524e1d9867f0231744d13f746f9e7b0a72))
* **Link:** implement new design ([#1249](https://github.com/textkernel/oneui/issues/1249)) ([3749df3](https://github.com/textkernel/oneui/commit/3749df340d31bbfa6b221d43216ee55f186a953d))
* **SelectedItemBadge:** update the component ([#1257](https://github.com/textkernel/oneui/issues/1257)) ([90d07a8](https://github.com/textkernel/oneui/commit/90d07a833c6195f946a76f2cffe7f14ef792714c))
* **Text:** migrate to new design ([#1250](https://github.com/textkernel/oneui/issues/1250)) ([1e7cb2d](https://github.com/textkernel/oneui/commit/1e7cb2d30ef7d6f802b170c9082f4e6112f1860a))
* **Toast:** New Component ([#1214](https://github.com/textkernel/oneui/issues/1214)) ([ad4fcd3](https://github.com/textkernel/oneui/commit/ad4fcd314040fb6dc4d7fdc68da895d1c7c97f19))

## [25.0.0](https://github.com/textkernel/oneui/compare/24.0.0...25.0.0) (2024-08-23)


### ⚠ BREAKING CHANGES

* **Heading:** `h4`, `h5` and `h6` are no longer supported by the library, please use `h3` instead

### Features

* **Heading:** migrate to new design ([#1229](https://github.com/textkernel/oneui/issues/1229)) ([2885354](https://github.com/textkernel/oneui/commit/2885354284a1f71982ee55cf3e0ea30fcf45b0eb))
* **SelectBadge:** Components improvements ([#1238](https://github.com/textkernel/oneui/issues/1238)) ([a936732](https://github.com/textkernel/oneui/commit/a936732b941247f913d30e2d49ed9de8e3c1c746))
* **TabsBar:** migrate to new design ([#1225](https://github.com/textkernel/oneui/issues/1225)) ([01096e3](https://github.com/textkernel/oneui/commit/01096e3cef62284f44877c04f9429677c29e7cbd))
* **Toggle:** migrate to new design ([#1231](https://github.com/textkernel/oneui/issues/1231)) ([a6da7f5](https://github.com/textkernel/oneui/commit/a6da7f5bfdfea9f34dd0eb2468e7550eff393162))

## [24.0.0](https://github.com/textkernel/oneui/compare/23.0.0...24.0.0) (2024-08-06)


### ⚠ BREAKING CHANGES

* **css variables:** some unused CSS variables removed: `--line-medium`, `--line-thick`, `--outline-size`
* **fonts:** `--font-weight-light` and `--font-wight-medium` were removed from the library
* **typography:** changes to how basic text styles are applied to consuming applications see [README](/README.md#assign-base-class-to-body)
* **checkbox** `indeterminate` state needs to be used in combination with `checked`. Before it was also showing when the checkbox was not checked. 

### Features

* **Checkbox:** migrate to new design ([#1213](https://github.com/textkernel/oneui/issues/1213)) ([13ed96a](https://github.com/textkernel/oneui/commit/13ed96a8f7650894d750911aaec5a8ab194ae84a))
* create SelectBadge component ([#1228](https://github.com/textkernel/oneui/issues/1228)) ([f1b4fb6](https://github.com/textkernel/oneui/commit/f1b4fb6b7f6313d772a3f4517de4f5021608eae7))
* **ExpandableText:** new component ([#1192](https://github.com/textkernel/oneui/issues/1192)) ([4d78c38](https://github.com/textkernel/oneui/commit/4d78c381082dd20a6695b23a179d17f83eb53048))
* **fonts:** use Noto Sans as main font ([#1209](https://github.com/textkernel/oneui/issues/1209)) ([33266f6](https://github.com/textkernel/oneui/commit/33266f6e5cf05e274b0c4fd025396c2c222f2ea2))
* **RadioButton:** migrate to new design ([#1217](https://github.com/textkernel/oneui/issues/1217)) ([1263f9d](https://github.com/textkernel/oneui/commit/1263f9d15ddb04994987fd1e1b932376deffd00e))
* **typography:** Global classes added to manage typography ([#1212](https://github.com/textkernel/oneui/issues/1212)) ([5dd4713](https://github.com/textkernel/oneui/commit/5dd4713096ffd0e3ba5e8bed10cfc13320824ff2))


* **css variables:** define them directly not via SCSS ([#1204](https://github.com/textkernel/oneui/issues/1204)) ([70e9478](https://github.com/textkernel/oneui/commit/70e947859f51c544d17fa7f952e8620805a413f0))

## [23.0.0](https://github.com/textkernel/oneui/compare/22.1.2...23.0.0) (2024-07-03)


### ⚠ BREAKING CHANGES

* **css-variables:** CSS variables related to colors and spacing have been moved/deprecated to a new set. See details in Jira (https://textkernel.atlassian.net/browse/ONEUI-439) and documents attached there
* **css-variables:** Color related Context props have been renamed to be similar to color tokens. See details in Jira (https://textkernel.atlassian.net/browse/ONEUI-439).
* **css-variables:** Theme roller doesn't work as expected with new (not calculated) color values, hence it was disabled. Currently used theme will partially work only, due to mismatch of variable names.

### Features

* **css-variables:** Add/migrate to new primitive tokens ([#1186](https://github.com/textkernel/oneui/issues/1186)) ([b90a80a](https://github.com/textkernel/oneui/commit/b90a80a9058c9f33977bc7c5e5fbc68f177e305a))
* **Table:** new opinionated component to render HTML semantic tables ([#1191](https://github.com/textkernel/oneui/issues/1191)) ([6772ea9](https://github.com/textkernel/oneui/commit/6772ea9b59acd3cb63d9cdd64632f6713c42e0c8))


### Bug Fixes

* **deps:** update dependency @react-google-maps/api to v2.19.3 ([e1d4077](https://github.com/textkernel/oneui/commit/e1d4077e20745c24dc9dd2951edc94cb8a2e54d3))
* **deps:** update dependency @storybook/addon-styling-webpack to v0.0.6 ([cb79d53](https://github.com/textkernel/oneui/commit/cb79d53c382b47af097bc1c815a780f1506954bb))
* **deps:** update dependency css-vars-ponyfill to v2.4.9 ([ca828b4](https://github.com/textkernel/oneui/commit/ca828b4a84c02544e4dbc60cc59ab0e2cf78e8cd))
* IosClose icon have lots of padding arround, changed to MdClose ([#1205](https://github.com/textkernel/oneui/issues/1205)) ([7defce8](https://github.com/textkernel/oneui/commit/7defce8248d56b3fefbb0c72db73c99a50f1c181))

### [22.1.2](https://github.com/textkernel/oneui/compare/22.1.1...22.1.2) (2024-01-30)


### Bug Fixes

* **LabelPicker:** Delete 'Done' button ([9dad853](https://github.com/textkernel/oneui/commit/9dad853e66daf884c3574af28bffb76b1ed9b558))

### [22.1.1](https://github.com/textkernel/oneui/compare/22.1.0...22.1.1) (2024-01-23)


### Bug Fixes

* **Autosuggest:** change autosuggest focused input height ([6e088e9](https://github.com/textkernel/oneui/commit/6e088e9850f0f76747038059e5a8a2a7234e190a))

## [22.1.0](https://github.com/textkernel/oneui/compare/22.0.4...22.1.0) (2023-12-21)


### Features

* migrated stories to new format v7 ([#1103](https://github.com/textkernel/oneui/issues/1103)) ([2022d55](https://github.com/textkernel/oneui/commit/2022d5505d8563e396a0f6904ece9de10f2784a3))

### [22.0.4](https://github.com/textkernel/oneui/compare/22.0.3...22.0.4) (2023-12-18)


### Bug Fixes

* **deps:** update dependency @types/react-modal to v3.16.3 ([8dfc962](https://github.com/textkernel/oneui/commit/8dfc96237896fd9ed61e767b3edb2b54c3c2b6e2))
* **deps:** update dependency downshift to v8.2.3 ([12be6b9](https://github.com/textkernel/oneui/commit/12be6b9f69fa1b22d59613a7da11ffea67f2ad26))

### [22.0.3](https://github.com/textkernel/oneui/compare/22.0.2...22.0.3) (2023-11-17)


### Bug Fixes

* **bundle:** add empty publicPath to webpack config ([#1091](https://github.com/textkernel/oneui/issues/1091)) ([3fbb205](https://github.com/textkernel/oneui/commit/3fbb20589c2812a3f0c03edd46102fa0e3f88903))

### [22.0.2](https://github.com/textkernel/oneui/compare/22.0.0...22.0.2) (2023-11-13)


### Bug Fixes

* **deps:** update dependency @types/react-modal to v3.16.2 ([dd75bd3](https://github.com/textkernel/oneui/commit/dd75bd316bdd7dd3679937b3ff9b77dadf6aacf0))
* **TS:** extend Prop interfaces where base element props were not included ([#1086](https://github.com/textkernel/oneui/issues/1086)) ([3a87b57](https://github.com/textkernel/oneui/commit/3a87b5780e9b33b5cea21737b98bbd8a3dd8f89d))

### [22.0.1](https://github.com/textkernel/oneui/compare/22.0.0...22.0.1) (2023-11-13)


### Bug Fixes

* **deps:** update dependency @types/react-modal to v3.16.2 ([dd75bd3](https://github.com/textkernel/oneui/commit/dd75bd316bdd7dd3679937b3ff9b77dadf6aacf0))
* **TS:** extend Prop interfaces where base element props were not included ([#1086](https://github.com/textkernel/oneui/issues/1086)) ([3a87b57](https://github.com/textkernel/oneui/commit/3a87b5780e9b33b5cea21737b98bbd8a3dd8f89d))

## [22.0.0](https://github.com/textkernel/oneui/compare/20.0.1...22.0.0) (2023-11-03)


### ⚠ BREAKING CHANGES

* component AutosuggestDeprecated was deleted
* component AutosuggestDeprecated was deleted

### Features

* add props which exist in autosuggest deprecated to autosuggest ([dea3ac8](https://github.com/textkernel/oneui/commit/dea3ac81ea899110e0c081eb6f81bb0b7602458c))
* revert update selectbase, autosuggest components ([6291759](https://github.com/textkernel/oneui/commit/62917596c78afa956eed9b423297f4e065c8ea27))
* update selectbase, autosuggest components ([1b4414e](https://github.com/textkernel/oneui/commit/1b4414e5a719a1d4f5e03720c39e58a13be1a3a3))


### Bug Fixes

* **deps:** update dependency @react-google-maps/api to v2.19.2 ([eae0f4b](https://github.com/textkernel/oneui/commit/eae0f4b2193d275599754cc543552a95feedeb0b))
* **deps:** update dependency @types/react-modal to v3.16.1 ([a454e76](https://github.com/textkernel/oneui/commit/a454e767ebd5181d0d0a2f9cd874f6e8e5c8cd19))
* **deps:** update dependency css-vars-ponyfill to v2.4.8 ([b731d45](https://github.com/textkernel/oneui/commit/b731d4584f6c61c0c57e686d4e270f3f0c7f582f))
* LocationSelector component text color ([239fa6e](https://github.com/textkernel/oneui/commit/239fa6eb270a4d8b7983b8411fc03e91d7c00aea))
* **Pill:** extend Pill props to include all PillButton props ([#1080](https://github.com/textkernel/oneui/issues/1080)) ([a7f9a1a](https://github.com/textkernel/oneui/commit/a7f9a1a5e2728ec03ed31d9891d9d30e4b664107))

## [21.0.0](https://github.com/textkernel/oneui/compare/20.0.1...21.0.0) (2023-10-26)


### ⚠ BREAKING CHANGES

* component AutosuggestDeprecated was deleted
* component AutosuggestDeprecated was deleted

### Features

* add props which exist in autosuggest deprecated to autosuggest ([dea3ac8](https://github.com/textkernel/oneui/commit/dea3ac81ea899110e0c081eb6f81bb0b7602458c))
* revert update selectbase, autosuggest components ([6291759](https://github.com/textkernel/oneui/commit/62917596c78afa956eed9b423297f4e065c8ea27))
* update selectbase, autosuggest components ([1b4414e](https://github.com/textkernel/oneui/commit/1b4414e5a719a1d4f5e03720c39e58a13be1a3a3))


### Bug Fixes

* **deps:** update dependency @react-google-maps/api to v2.19.2 ([eae0f4b](https://github.com/textkernel/oneui/commit/eae0f4b2193d275599754cc543552a95feedeb0b))
* **deps:** update dependency @types/react-modal to v3.16.1 ([a454e76](https://github.com/textkernel/oneui/commit/a454e767ebd5181d0d0a2f9cd874f6e8e5c8cd19))
* **deps:** update dependency css-vars-ponyfill to v2.4.8 ([b731d45](https://github.com/textkernel/oneui/commit/b731d4584f6c61c0c57e686d4e270f3f0c7f582f))
* LocationSelector component text color ([239fa6e](https://github.com/textkernel/oneui/commit/239fa6eb270a4d8b7983b8411fc03e91d7c00aea))

### [20.0.1](https://github.com/textkernel/oneui/compare/20.0.0...20.0.1) (2023-07-10)


### Bug Fixes

* **PaginationButton:** isActive class wasn't being applied ([#1015](https://github.com/textkernel/oneui/issues/1015)) ([9ea8515](https://github.com/textkernel/oneui/commit/9ea85153635cfd3cc78f9c378cfae53fa5f9c617))

## [20.0.0](https://github.com/textkernel/oneui/compare/19.5.0...20.0.0) (2023-07-06)


### ⚠ BREAKING CHANGES

* Change target of forward ref. New inputRef prop added
* ProductTour was removed

### Features

* **Pill:** add accessibility label props; migrate tests ([#975](https://github.com/textkernel/oneui/issues/975)) ([eae9cb4](https://github.com/textkernel/oneui/commit/eae9cb465f569ce5a3686a54148c7f774131ee57))
* remove ProductTour component ([675cc5e](https://github.com/textkernel/oneui/commit/675cc5e7c435bdc7cfb02b953417505f2a13cb6b))


### Bug Fixes

* checkbox forward ref ([#1009](https://github.com/textkernel/oneui/issues/1009)) ([7d575cb](https://github.com/textkernel/oneui/commit/7d575cb196d7ecf75767958b83c6750464d222ff))
* **deps:** update dependency @types/enzyme to v3.10.13 ([a280ed9](https://github.com/textkernel/oneui/commit/a280ed9fc14171766349e8d06419c4953052ebeb))
* **deps:** update dependency react-virtualized to v9.22.5 ([32a6aea](https://github.com/textkernel/oneui/commit/32a6aead409ac0eb1302ccf3bacb9329236389ec))
* **PageWidthRestrictor:** improve semantic HTML | test: migrate WeightedResultBar, BlockWidthRestrictor and PageWidthRestrictor ([#987](https://github.com/textkernel/oneui/issues/987)) ([569f635](https://github.com/textkernel/oneui/commit/569f63592d5fde7d7684680553218db7fc44341c))

## [19.5.0](https://github.com/textkernel/oneui/compare/19.4.0...19.5.0) (2023-05-26)


### Features

* **Slider:** update rc-slider version to "10.1.1" ([#983](https://github.com/textkernel/oneui/issues/983)) ([a6ae667](https://github.com/textkernel/oneui/commit/a6ae667f4bb1d1791b956670414c036aaba1a3e7))

## [19.4.0](https://github.com/textkernel/oneui/compare/19.3.1...19.4.0) (2023-05-17)


### Features

* **Select components:** add ARIA labels and props for toggle button; migrate Select tests ([#964](https://github.com/textkernel/oneui/issues/964)) ([4d04d5e](https://github.com/textkernel/oneui/commit/4d04d5ef335577d158696370f6f7c57444af00c7))


### Bug Fixes

* **List, ListItem:** Improve accessibility for List and migrate tests ([#949](https://github.com/textkernel/oneui/issues/949)) ([08d7ffe](https://github.com/textkernel/oneui/commit/08d7ffe5107a6a2a2f622f397260759cc6095b0c))
* **Select:** don't show Clear button if onClear isn't defined ([#963](https://github.com/textkernel/oneui/issues/963)) ([0a5bd20](https://github.com/textkernel/oneui/commit/0a5bd200a71f06afb26ee5462095d0adfdf2b05f))

### [19.3.1](https://github.com/textkernel/oneui/compare/19.3.0...19.3.1) (2023-04-28)


### Bug Fixes

* unintentional breaking changes where components don't render with children 0 ([#958](https://github.com/textkernel/oneui/issues/958)) ([aaec5b9](https://github.com/textkernel/oneui/commit/aaec5b91a1da141949a3f9f4a9e66af3d595de8d))

## [19.3.0](https://github.com/textkernel/oneui/compare/19.2.0...19.3.0) (2023-04-27)


### Features

* simplify custom TS types ([#954](https://github.com/textkernel/oneui/issues/954)) ([f7634af](https://github.com/textkernel/oneui/commit/f7634af182589404757df28a2d10a6506542c55f))


### Bug Fixes

* Teaser title attributes ([#956](https://github.com/textkernel/oneui/issues/956)) ([7c0afa8](https://github.com/textkernel/oneui/commit/7c0afa8875bcd1487b67306e540a84693fb06fe6))

## [19.2.0](https://github.com/textkernel/oneui/compare/19.1.0...19.2.0) (2023-04-21)


### Features

* rtl tests refactoring ([#933](https://github.com/textkernel/oneui/issues/933)) ([ef7921b](https://github.com/textkernel/oneui/commit/ef7921bfd26a954593fbe4531e84997effb0ec19))
* Text children accept undefined ([#945](https://github.com/textkernel/oneui/issues/945)) ([23b69c5](https://github.com/textkernel/oneui/commit/23b69c5d33041deaeadf9b7b9d15f32a10a33cca))


### Bug Fixes

* RadioButton Props extends ([#946](https://github.com/textkernel/oneui/issues/946)) ([c603300](https://github.com/textkernel/oneui/commit/c603300b31acafac2dbd62d9c71b0f84f6756a10))

## [19.1.0](https://github.com/textkernel/oneui/compare/19.0.0...19.1.0) (2023-04-18)


### Features

* Pill icon doesn't indicate open/closed state correctly ([#939](https://github.com/textkernel/oneui/issues/939)) ([b476a0d](https://github.com/textkernel/oneui/commit/b476a0dc52c856ad791548d03c1f8b34abf528a9)), closes [#936](https://github.com/textkernel/oneui/issues/936)
* update jest config ([#934](https://github.com/textkernel/oneui/issues/934)) ([410d4e5](https://github.com/textkernel/oneui/commit/410d4e55e0aa89f28e7492add0a4f60a9cdcae26))


### Bug Fixes

* remove context ([#936](https://github.com/textkernel/oneui/issues/936)) ([85b4fb5](https://github.com/textkernel/oneui/commit/85b4fb5c5f19f54729ea2327318638a3a382849a))
* **Scss:** deprecation errors after color changes ([#935](https://github.com/textkernel/oneui/issues/935)) ([8b2eac5](https://github.com/textkernel/oneui/commit/8b2eac53bf2e5939ed9ebcb55b79740e9eec21e4))

## [19.0.0](https://github.com/textkernel/oneui/compare/18.11.3...19.0.0) (2023-03-30)


### ⚠ BREAKING CHANGES

* **simplification of color scheme:** Properties changes in components might break certain implementations that were not as intended by the original API

Co-authored-by: renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>

### Features

* add custom types ([bcf0dfb](https://github.com/textkernel/oneui/commit/bcf0dfb1261a3f02136ed8d6ff5265fea19a818a))
* add plan RTL migration ([#906](https://github.com/textkernel/oneui/issues/906)) ([eeeea33](https://github.com/textkernel/oneui/commit/eeeea33f9f529eb42015dbb9e5f3555a437e99ac))
* migrate Field tests ([b6be2d4](https://github.com/textkernel/oneui/commit/b6be2d4a49d13fff8846506de254ad08aa97f9dd))
* set up process to measure migration progress ([#907](https://github.com/textkernel/oneui/issues/907)) ([ff495a3](https://github.com/textkernel/oneui/commit/ff495a37dcb977fc7d6643ab7b9da0df900bad2a))
* set up RTL ([#910](https://github.com/textkernel/oneui/issues/910)) ([f1f3b4c](https://github.com/textkernel/oneui/commit/f1f3b4c2407b829ee2374905682371d6edaafc59))
* **simplification of color scheme:** new design ([#878](https://github.com/textkernel/oneui/issues/878)) ([4909a24](https://github.com/textkernel/oneui/commit/4909a24e977c2938c4fb94ebff63b8f9b702bdbb))
* update rtl script ([3f33e75](https://github.com/textkernel/oneui/commit/3f33e757425b4c8047a8738e622f01995bef4df6))

### [18.11.3](https://github.com/textkernel/oneui/compare/18.11.2...18.11.3) (2022-12-26)


### Bug Fixes

* children type for radio button component ([e8e7be1](https://github.com/textkernel/oneui/commit/e8e7be1e355b2508ca52213072ceec444afdd313))

### [18.11.2](https://github.com/textkernel/oneui/compare/18.11.1...18.11.2) (2022-12-23)


### Bug Fixes

* **TextArea:** component types to be specific ([#872](https://github.com/textkernel/oneui/issues/872)) ([466f61c](https://github.com/textkernel/oneui/commit/466f61cfb4539143c6806ac4fef8e56df826f7aa))

### [18.11.1](https://github.com/textkernel/oneui/compare/18.11.0...18.11.1) (2022-12-22)


### Bug Fixes

* **RadioButton:** wrongly styled when disabled ([#870](https://github.com/textkernel/oneui/issues/870)) ([7d55f6f](https://github.com/textkernel/oneui/commit/7d55f6f42f5dfd726587607b041155131e769e74))

## [18.11.0](https://github.com/textkernel/oneui/compare/18.10.2...18.11.0) (2022-12-21)


### Features

* **Combobox:** new component ([#867](https://github.com/textkernel/oneui/issues/867)) ([e9227a7](https://github.com/textkernel/oneui/commit/e9227a76420cb575c4c2f20379d135d757ab056d))


### Bug Fixes

* buttongroup context isn't passed to the button ([#864](https://github.com/textkernel/oneui/issues/864)) ([a80c532](https://github.com/textkernel/oneui/commit/a80c532680023fdb92175b9673c45bafbe98032b))
* type content for pill and pillButton components ([#865](https://github.com/textkernel/oneui/issues/865)) ([2a10d78](https://github.com/textkernel/oneui/commit/2a10d78707a966ae7fbc8e94cbcfa63eb2d81a21))

### [18.10.2](https://github.com/textkernel/oneui/compare/18.10.1...18.10.2) (2022-11-18)


### Bug Fixes

* Autosuggest default value and PopupBase not working correctly ([#858](https://github.com/textkernel/oneui/issues/858)) ([233d9f9](https://github.com/textkernel/oneui/commit/233d9f98d32dfd89c3a9324cd63c6b7b50aaf7bb))

### [18.10.1](https://github.com/textkernel/oneui/compare/18.10.0...18.10.1) (2022-11-16)


### Bug Fixes

* **typescript:** fixed Pill typescript props ([#857](https://github.com/textkernel/oneui/issues/857)) ([137625a](https://github.com/textkernel/oneui/commit/137625afbb710063377c054ae81650f50c608417))

## [18.10.0](https://github.com/textkernel/oneui/compare/18.9.2...18.10.0) (2022-11-15)


### Features

* **NavItem:** support react-router v6 ([#846](https://github.com/textkernel/oneui/issues/846)) ([fcc4d19](https://github.com/textkernel/oneui/commit/fcc4d19a474a8233082b118bc2515653a561f784))
* replace defaultProps with defaultValues ([#840](https://github.com/textkernel/oneui/issues/840)) ([47fc008](https://github.com/textkernel/oneui/commit/47fc0083af7234c76b3c045fd5210029b9a421a0))

### [18.9.2](https://github.com/textkernel/oneui/compare/18.9.1...18.9.2) (2022-10-12)


### Bug Fixes

* class name issue ([#836](https://github.com/textkernel/oneui/issues/836)) ([2275827](https://github.com/textkernel/oneui/commit/2275827c317c343bb4e53de8df1880f8bea5cc8c))

### [18.9.1](https://github.com/textkernel/oneui/compare/18.9.0...18.9.1) (2022-10-07)


### Bug Fixes

* forwardRef type errors ([#833](https://github.com/textkernel/oneui/issues/833)) ([8aad981](https://github.com/textkernel/oneui/commit/8aad981b467a36d0ea9d014ab801da797d0a3da8))

## [18.9.0](https://github.com/textkernel/oneui/compare/18.8.1...18.9.0) (2022-10-06)


### Features

* add new color for shadow in background ([#832](https://github.com/textkernel/oneui/issues/832)) ([67b092e](https://github.com/textkernel/oneui/commit/67b092e7bfe10df768c7c11cbdb4cc74c5b67242))
* **Checkbox:** Add indeterminate state to the Checkbox component ([#831](https://github.com/textkernel/oneui/issues/831)) ([b923857](https://github.com/textkernel/oneui/commit/b923857a00f07c74b5ab69c89e417e04926c4faa))
* replace defaultProps with defaultValues and update typescript ([#818](https://github.com/textkernel/oneui/issues/818)) ([f51b120](https://github.com/textkernel/oneui/commit/f51b120626cc47ae821cb82a5af07c251e75828c))

### [18.8.1](https://github.com/textkernel/oneui/compare/18.8.0...18.8.1) (2022-10-03)


### Bug Fixes

* **Tag:** pass event to handlers in Tag ([#828](https://github.com/textkernel/oneui/issues/828)) ([a8eb924](https://github.com/textkernel/oneui/commit/a8eb924973ed5af6d708dfe1fb51f6ac85adc8b4))

## [18.8.0](https://github.com/textkernel/oneui/compare/18.7.2...18.8.0) (2022-09-30)


### Features

* add title attribute to components ([#802](https://github.com/textkernel/oneui/issues/802)) ([201edea](https://github.com/textkernel/oneui/commit/201edea5f2ace284fe09eee3f3323393c876938a))
* **Button:** added loading state ([fa46bef](https://github.com/textkernel/oneui/commit/fa46befa3346bd8060230719e81cf028162e9723))
* **Tag:** extend API with styling options and ForwardRef ([#824](https://github.com/textkernel/oneui/issues/824)) ([bb5412a](https://github.com/textkernel/oneui/commit/bb5412a0dd40b0ca9415931935dd187f8879bbf2))


### Bug Fixes

* **ButtonGroup:** styling when only has 1 child ([#806](https://github.com/textkernel/oneui/issues/806)) ([fb3babb](https://github.com/textkernel/oneui/commit/fb3babbf701706f878afd79fd021fcaedaeee3c4))
* highlighter highlight terms in with special characters correctly ([#795](https://github.com/textkernel/oneui/issues/795)) ([09c92b8](https://github.com/textkernel/oneui/commit/09c92b8d4691807d40fc33a60f6ec4a8e87874e5))
* **LabelPicker:** change spacing of elements ([#805](https://github.com/textkernel/oneui/issues/805)) ([6e57524](https://github.com/textkernel/oneui/commit/6e575248f652e53d7da9f1dc385fcbebc5e4ea4c))

### [18.7.2](https://github.com/textkernel/oneui/compare/18.7.1...18.7.2) (2022-07-27)


### Bug Fixes

* **Map:** Fix doesn't zoom correctly when there is a single point marker ([#796](https://github.com/textkernel/oneui/issues/796)) ([7a20f44](https://github.com/textkernel/oneui/commit/7a20f444a171c621fb75093cf66874a0fa72e23e))

### [18.7.1](https://github.com/textkernel/oneui/compare/18.7.0...18.7.1) (2022-07-26)


### Bug Fixes

* **Map:** zoom map to reasonable view when using a single point marker ([#794](https://github.com/textkernel/oneui/issues/794)) ([7e61522](https://github.com/textkernel/oneui/commit/7e61522f183e59258b58d1d4948fc97d5b4ea566))

## [18.7.0](https://github.com/textkernel/oneui/compare/18.6.2...18.7.0) (2022-07-20)


### Features

* make boolean query tokenizer support lowercased bool operators ([#785](https://github.com/textkernel/oneui/issues/785)) ([c86cc56](https://github.com/textkernel/oneui/commit/c86cc5687168f135382c02964a927c5b12c5d0bb))


### Bug Fixes

* heading font color ([4bef6e9](https://github.com/textkernel/oneui/commit/4bef6e9b3d2540dccc9b68ce5f8a8fee419c5423))

### [18.6.2](https://github.com/textkernel/oneui/compare/18.6.1...18.6.2) (2022-06-23)

### [18.6.1](https://github.com/textkernel/oneui/compare/18.6.0...18.6.1) (2022-06-23)


### Bug Fixes

* **Map:** doesn't zoom on initial addition of marker ([#774](https://github.com/textkernel/oneui/issues/774)) ([a99b937](https://github.com/textkernel/oneui/commit/a99b9370ca727ced4b4056822813cc6364bed8e9))

## [18.6.0](https://github.com/textkernel/oneui/compare/18.5.0...18.6.0) (2022-06-21)


### Features

* added possibilities to change theme ([#766](https://github.com/textkernel/oneui/issues/766)) ([34fb92e](https://github.com/textkernel/oneui/commit/34fb92e70b35a22cc0b367f8307c5fc41cc56dfc))
* make components themeable ([181987f](https://github.com/textkernel/oneui/commit/181987f30394db86d94144e781d82ca358ca3fc6))
* make components themeable ([c60fa75](https://github.com/textkernel/oneui/commit/c60fa7522fe578ed4394d2fff2bb304d38662896))
* make components themeable ([a74345a](https://github.com/textkernel/oneui/commit/a74345ac1a11f4b4ad2844b2b4e16cf7e68626a1))

## [18.5.0](https://github.com/textkernel/oneui/compare/18.4.1...18.5.0) (2022-06-17)


### Features

* **Teaser:** add prop for disabled styling ([#770](https://github.com/textkernel/oneui/issues/770)) ([8247aeb](https://github.com/textkernel/oneui/commit/8247aeb7132bba3533e6d5dd1c806a97f29dbaa5))


### Bug Fixes

* fix ts-jest version ([#768](https://github.com/textkernel/oneui/issues/768)) ([467f418](https://github.com/textkernel/oneui/commit/467f418a2cc5f7413ac898e83da3a661163c69af))

### [18.4.1](https://github.com/textkernel/oneui/compare/18.4.0...18.4.1) (2022-06-01)

## [18.4.0](https://github.com/textkernel/oneui/compare/18.3.0...18.4.0) (2022-05-25)


### Features

* **themeroller:** Implemented Themeroller component ([#752](https://github.com/textkernel/oneui/issues/752)) ([b94db43](https://github.com/textkernel/oneui/commit/b94db432b2dd7e7fe56f42acd88981d3bea97456))

## [18.3.0](https://github.com/textkernel/oneui/compare/18.1.0...18.3.0) (2022-05-24)


### Features

* address review points ([e2a1122](https://github.com/textkernel/oneui/commit/e2a1122dbde50350b281fed857971cfa555626d9))
* change colors generation in Highlighter component ([fe1d811](https://github.com/textkernel/oneui/commit/fe1d81121f0d24f12bac6aa04fbd42445a80fdda))
* change colors generation in Highlighter component ([bfd4f86](https://github.com/textkernel/oneui/commit/bfd4f865107dc35b45f462b4a6741ca5b1f54160))
* **component:** improving clear button for selectBase ([7e4b3a2](https://github.com/textkernel/oneui/commit/7e4b3a2ea1c959f6254c228982686d37d4546dab))

## [18.2.0](https://github.com/textkernel/oneui/compare/18.1.0...18.2.0) (2022-05-20)


### Features

* **component:** improving clear button for selectBase ([7e4b3a2](https://github.com/textkernel/oneui/commit/7e4b3a2ea1c959f6254c228982686d37d4546dab))

## [18.1.0](https://github.com/textkernel/oneui/compare/18.0.0...18.1.0) (2022-05-11)


### Features

* **Checkbox:** add `asFlexbox` prop to allow for different layout styles ([#756](https://github.com/textkernel/oneui/issues/756)) ([5e39cf7](https://github.com/textkernel/oneui/commit/5e39cf7ca607da998f373420f861ef4a3abe5224))
* **Select:** added option for no default selection ([#749](https://github.com/textkernel/oneui/issues/749)) ([3152153](https://github.com/textkernel/oneui/commit/31521530cd64cced01307b1b8ef604f970291e95))


### Bug Fixes

* added missed px unit in font-size-large ([#755](https://github.com/textkernel/oneui/issues/755)) ([eb8f1b2](https://github.com/textkernel/oneui/commit/eb8f1b2960ef592b5be2a9284e3b54e8fda21377))

## [18.0.0](https://github.com/textkernel/oneui/compare/17.4.0...18.0.0) (2022-05-02)


### ⚠ BREAKING CHANGES

* **LabelPicker:** Type checking for Checkbox moved to TS and might break certain implementations that were not as intended by the original API

### Features

* **LabelPicker:** new component ([960261f](https://github.com/textkernel/oneui/commit/960261fd581f879cf3c45cf8ec2bfe1eaee1f01c))

## [17.4.0](https://github.com/textkernel/oneui/compare/17.3.2...17.4.0) (2022-04-25)


### Features

* **component:** added ThemeGenerator ([#746](https://github.com/textkernel/oneui/issues/746)) ([e1a5ba3](https://github.com/textkernel/oneui/commit/e1a5ba318ce3f492dd2a88899435d4a718b816ba))

### [17.3.2](https://github.com/textkernel/oneui/compare/17.3.1...17.3.2) (2022-04-22)

### [17.3.1](https://github.com/textkernel/oneui/compare/17.3.0...17.3.1) (2022-04-19)

## [17.3.0](https://github.com/textkernel/oneui/compare/17.2.1...17.3.0) (2022-04-12)


### Features

* **component:** fix comments ([d863a23](https://github.com/textkernel/oneui/commit/d863a235206bff72b935361920334c5c9f08d472))
* **component:** update BulkActionsToolbar component ([0a647e1](https://github.com/textkernel/oneui/commit/0a647e1529fdb30c8197da3253295bb388bc5509))

### [17.2.1](https://github.com/textkernel/oneui/compare/17.2.0...17.2.1) (2022-03-29)

## [17.2.0](https://github.com/textkernel/oneui/compare/17.1.0...17.2.0) (2022-03-28)


### Features

* **Link:** Add prop to disable text decoration on hover ([#731](https://github.com/textkernel/oneui/issues/731)) ([684e64a](https://github.com/textkernel/oneui/commit/684e64a891289fbe747988a83b6894eaf6b71d0b))


### Bug Fixes

* **Sliders:** vertically align handles in tin middle of the rail ([#709](https://github.com/textkernel/oneui/issues/709)) ([97db7eb](https://github.com/textkernel/oneui/commit/97db7eb2af0edc17b48d961e4735b68ca166efa8))
* **Toggle:** do not allow Toggle to shrink ([#708](https://github.com/textkernel/oneui/issues/708)) ([8d14c2c](https://github.com/textkernel/oneui/commit/8d14c2c05abc384f57b84a63a5068b8419e8a08b))

## [17.1.0](https://github.com/textkernel/oneui/compare/17.0.1...17.1.0) (2022-02-09)


### Features

* **Map:** Extend Map component to support geoJson files as markers ([#703](https://github.com/textkernel/oneui/issues/703)) ([21a29bd](https://github.com/textkernel/oneui/commit/21a29bd8faf4a1aeaabce3126a82f368f74d2e7c))


### Bug Fixes

* **Footer:** add year prop to Footer component to make it deterministic ([#210](https://github.com/textkernel/oneui/issues/210)) ([f317524](https://github.com/textkernel/oneui/commit/f317524e7ee8a86e63294486f770e8c76a3372ac))
* update footer snapshot ([#677](https://github.com/textkernel/oneui/issues/677)) ([4204ff4](https://github.com/textkernel/oneui/commit/4204ff453b8f51e49f8b122ef6ae4052fa40cb45))

### [17.0.1](https://github.com/textkernel/oneui/compare/17.0.0...17.0.1) (2021-12-22)


### Bug Fixes

* **Location:** extend prop typing with HTML element props ([#664](https://github.com/textkernel/oneui/issues/664)) ([a75aca0](https://github.com/textkernel/oneui/commit/a75aca0b4ab40b06353452abde82cc7fde723357))

## [17.0.0](https://github.com/textkernel/oneui/compare/16.0.0...17.0.0) (2021-12-21)


### ⚠ BREAKING CHANGES

* **location:** LocationSelector's hasRadius props now defaults to false (was true before)

### Features

* **DatePicker:** new component ([#655](https://github.com/textkernel/oneui/issues/655)) ([07a1098](https://github.com/textkernel/oneui/commit/07a109834c6c439809e4ca71cef661292ddf4ed0))


### Bug Fixes

* **deps:** update dependency @googlemaps/js-api-loader to v1.12.10 ([34cc110](https://github.com/textkernel/oneui/commit/34cc1105bf3d03c40076de17dd9bac27aceef116))
* **deps:** update dependency @googlemaps/js-api-loader to v1.12.11 ([a9af8c6](https://github.com/textkernel/oneui/commit/a9af8c616d09297f2ed84972eb494f02e4e62296))
* **deps:** update dependency @tippyjs/react to v4.2.6 ([bea6907](https://github.com/textkernel/oneui/commit/bea69073a1ab84eda546c4b22299a7bbb6dd9d9f))
* **deps:** update dependency tippy.js to v6.3.7 ([479b607](https://github.com/textkernel/oneui/commit/479b60768ac7599b152e46c0e5a2425911c7ec0f))


* **location:** type location components; expose additional location utilities ([#661](https://github.com/textkernel/oneui/issues/661)) ([723923c](https://github.com/textkernel/oneui/commit/723923cdf615c60a8146d6c65d9f085f886bc8d4))

## [16.0.0](https://github.com/textkernel/oneui/compare/15.5.0...16.0.0) (2021-11-15)


### ⚠ BREAKING CHANGES

* **SelectButtonGroup:** The API for these components is changed because of the improvements and changes in behavior that are implemented.

### Features

* **SelectButtonGroup:** add support for controlled behavior and improve API ([#624](https://github.com/textkernel/oneui/issues/624)) ([efa4a04](https://github.com/textkernel/oneui/commit/efa4a04a4ff94671dc390bc7f8547f5f033f6004))

## [15.5.0](https://github.com/textkernel/oneui/compare/15.4.2...15.5.0) (2021-11-12)


### Features

* **Tag:** add new Tag component ([#637](https://github.com/textkernel/oneui/issues/637)) ([5d293b4](https://github.com/textkernel/oneui/commit/5d293b4008c8bcfe9d0861472c85083397240320))


### Bug Fixes

* **Gauge:** Safari bug where gradient doesn't render ([#638](https://github.com/textkernel/oneui/issues/638)) ([f6165cf](https://github.com/textkernel/oneui/commit/f6165cf191c1ea96d78e7f7ab9c77dd40bdde486))

### [15.4.2](https://github.com/textkernel/oneui/compare/15.4.1...15.4.2) (2021-11-01)


### Bug Fixes

* **Gauge:** improve HTML to ensure correct rendering in all browsers ([#623](https://github.com/textkernel/oneui/issues/623)) ([6e22c78](https://github.com/textkernel/oneui/commit/6e22c788c49cc8000f4dcf059fd3a4c08a84e62c))

### [15.4.1](https://github.com/textkernel/oneui/compare/15.4.0...15.4.1) (2021-10-29)


### Bug Fixes

* **ButtonGroup, Dropdown, List, TabsBar:** improve TS definition of children to allow for conditional JSX ([#622](https://github.com/textkernel/oneui/issues/622)) ([7c90242](https://github.com/textkernel/oneui/commit/7c90242a64479f9584c1746d1f7ca3ce773ab52b))

## [15.4.0](https://github.com/textkernel/oneui/compare/15.3.0...15.4.0) (2021-10-27)


### Features

* **Dropdown:** Added new props for Dropdown - additionalSelectProps, popperClassName ([#621](https://github.com/textkernel/oneui/issues/621)) ([64c30d9](https://github.com/textkernel/oneui/commit/64c30d9e36988f4e230d881a5c63a3711ebfbdde))

## [15.3.0](https://github.com/textkernel/oneui/compare/15.2.0...15.3.0) (2021-10-22)


### Features

* **Dropdown:** Add possibility to bind callbacks to onFocus and onBlur events of dropdown menu ([#618](https://github.com/textkernel/oneui/issues/618)) ([1393851](https://github.com/textkernel/oneui/commit/13938514973b6b933fd6b20ea70007cfe76ad806))

## [15.2.0](https://github.com/textkernel/oneui/compare/15.1.0...15.2.0) (2021-10-21)


### Features

* **Dropdown:** add callback prop to listen to on-toggle-button click ([#616](https://github.com/textkernel/oneui/issues/616)) ([5b575f5](https://github.com/textkernel/oneui/commit/5b575f5717849bb4c70081833a88e3214c8cc0f4))

## [15.1.0](https://github.com/textkernel/oneui/compare/15.0.3...15.1.0) (2021-10-18)


### Features

* **Select, Combobox, Autosuggest:** add option to disable items ([#614](https://github.com/textkernel/oneui/issues/614)) ([9e8ac51](https://github.com/textkernel/oneui/commit/9e8ac51ea0718d5fcf46a056173bebbc34f023de))


### Bug Fixes

* **deps:** update dependency @googlemaps/js-api-loader to v1.12.5 ([f646367](https://github.com/textkernel/oneui/commit/f646367977c0af3f8c5b1dd406497bb18ea45ffc))
* **deps:** update dependency tippy.js to v6.3.2 ([81b599c](https://github.com/textkernel/oneui/commit/81b599caf4040fb480ae694652b0ae4857e58089))

### [15.0.3](https://github.com/textkernel/oneui/compare/15.0.2...15.0.3) (2021-10-01)


### Bug Fixes

* **react-modal:** Revert react modal upgrade ([#606](https://github.com/textkernel/oneui/issues/606)) ([e1368fc](https://github.com/textkernel/oneui/commit/e1368fcf3a9383915f69690beec05894c14cc566))

### [15.0.2](https://github.com/textkernel/oneui/compare/15.0.1...15.0.2) (2021-09-29)


### Bug Fixes

* **NumericStepper:** update component state if props change ([#604](https://github.com/textkernel/oneui/issues/604)) ([036c9d8](https://github.com/textkernel/oneui/commit/036c9d81e656bb2390e024395e4682747a5a0826))

### [15.0.1](https://github.com/textkernel/oneui/compare/15.0.0...15.0.1) (2021-09-28)


### Bug Fixes

* **deps:** update dependency @googlemaps/js-api-loader to v1.12.4 ([3c609d4](https://github.com/textkernel/oneui/commit/3c609d4be5d30bb78c738e1fd53325efa7260300))
* **deps:** update dependency react-modal to ~3.14.0 ([d86ba36](https://github.com/textkernel/oneui/commit/d86ba36aef622d9bfe1566c3643ae548816b0302))
* **Select:** correctly handle className prop; small css change ([#603](https://github.com/textkernel/oneui/issues/603)) ([7057289](https://github.com/textkernel/oneui/commit/70572892c3f9517e2042ac5e66f0c67cd70b30d2))

## [15.0.0](https://github.com/textkernel/oneui/compare/14.1.0...15.0.0) (2021-09-17)


### ⚠ BREAKING CHANGES

* **Alert:** Alert dialog API has been completely revised.

### Features

* **Alert:** reimplement Alert and add Confirm dialog ([#595](https://github.com/textkernel/oneui/issues/595)) ([a781aaa](https://github.com/textkernel/oneui/commit/a781aaa1e3cd65bed47463f6d913ec520a65d8e2))
* **NumericStepper:** add NumericStepper component ([#589](https://github.com/textkernel/oneui/issues/589)) ([43b318c](https://github.com/textkernel/oneui/commit/43b318ce716b13745102c6ac580f14e284d02f85))
* **Tabs:** allow passing custom TS types ([#596](https://github.com/textkernel/oneui/issues/596)) ([be28713](https://github.com/textkernel/oneui/commit/be28713c483552f0c0fe8fbc513e7e574503406f))

## [14.1.0](https://github.com/textkernel/oneui/compare/14.0.0...14.1.0) (2021-08-16)


### Features

* **Autosuggest:** add prop to select first suggestion on outer click ([#491](https://github.com/textkernel/oneui/issues/491)) ([b44bf55](https://github.com/textkernel/oneui/commit/b44bf55c3cb46da442855b1015935bb21b2d38c9))
* **BulkActionsToolbar:** enable actions custom button context ([#581](https://github.com/textkernel/oneui/issues/581)) ([1f0a623](https://github.com/textkernel/oneui/commit/1f0a62300a0c73b7ca22ccfa6293f66cf5123b1c))


### Bug Fixes

* **deps:** update dependency tippy.js to v6.3.1 ([46096b7](https://github.com/textkernel/oneui/commit/46096b7114588713593e402df640bf38b5ae3e75))

## [14.0.0](https://github.com/textkernel/oneui/compare/13.10.0...14.0.0) (2021-06-30)


### ⚠ BREAKING CHANGES

* **WeightedResultBar:** The WeightedResultBarLoader component is removed. Use the prop isLoading on WeightedResultBar instead.

### Features

* **WeightedResultBar:** merge WeightedResultBarLoader ([#553](https://github.com/textkernel/oneui/issues/553)) ([72fab67](https://github.com/textkernel/oneui/commit/72fab679469d65e6be5a21ddeacfa18ef7813858))


### Bug Fixes

* **deps:** update dependency css-vars-ponyfill to ~2.4.0 ([e88f980](https://github.com/textkernel/oneui/commit/e88f9807bdba832ba3e5cfbac27a7b7e67c9b6ef))
* **deps:** update dependency downshift to ~6.1.0 ([ea2f8a8](https://github.com/textkernel/oneui/commit/ea2f8a8d5ac4f88790bb3d40af2d660438b37ada))

## [13.10.0](https://github.com/textkernel/oneui/compare/13.9.0...13.10.0) (2021-06-08)


### Features

* **component:** make onComplete optional in ReactElementHighlighter ([#539](https://github.com/textkernel/oneui/issues/539)) ([ebb84b2](https://github.com/textkernel/oneui/commit/ebb84b285f737705b1f95bcd19b3ec808d750176))

## [13.9.0](https://github.com/textkernel/oneui/compare/13.8.0...13.9.0) (2021-06-07)


### Features

* **Highlighter:** add highlightStyles to find method ([#532](https://github.com/textkernel/oneui/issues/532)) ([a4c559b](https://github.com/textkernel/oneui/commit/a4c559b862e64d10e4d98ba9b06827dbdb5eccf4))

## [13.8.0](https://github.com/textkernel/oneui/compare/13.7.0...13.8.0) (2021-05-17)


### Features

* **LocationSelector:** add prop to set different input placeholder inside the modal ([#501](https://github.com/textkernel/oneui/issues/501)) ([6fb6b26](https://github.com/textkernel/oneui/commit/6fb6b267aa64afa2fef9c1992bb0ad3b87899675))
* **Map, LocationSelector:** add option to have a default highlighted area on the map ([#500](https://github.com/textkernel/oneui/issues/500)) ([8092854](https://github.com/textkernel/oneui/commit/80928544c2bf606976d9e08c96a58fbbdf77a288))


### Bug Fixes

* **deps:** update dependency @googlemaps/js-api-loader to v1.11.4 ([46c1f5e](https://github.com/textkernel/oneui/commit/46c1f5e7801d49747dd02681487044ca7c788928))
* **deps:** update dependency @tippyjs/react to v4.2.5 ([906da9f](https://github.com/textkernel/oneui/commit/906da9f329851df33ceae5dbc56d61e67f07d626))
* **deps:** update dependency react-popper to v2.2.5 ([e866561](https://github.com/textkernel/oneui/commit/e866561e183545d4bc7ccbac7e139f315634a9cd))

## [13.7.0](https://github.com/textkernel/oneui/compare/13.6.2...13.7.0) (2021-05-04)


### Features

* **Autosuggest, Combobox:** add prop to set HTML attributes on input element ([#495](https://github.com/textkernel/oneui/issues/495)) ([87e3bad](https://github.com/textkernel/oneui/commit/87e3bad28b8e42a3a0cdf114dabf434aadb7236e))

### [13.6.2](https://github.com/textkernel/oneui/compare/13.6.1...13.6.2) (2021-04-19)


### Bug Fixes

* **Dropdown:** children type ([#478](https://github.com/textkernel/oneui/issues/478)) ([fd6be4a](https://github.com/textkernel/oneui/commit/fd6be4ac6dbd0c4857e1d95ff808f7b99a92d1ea))
* **MarkedText:** fix issue with escaping of 's' character ([#481](https://github.com/textkernel/oneui/issues/481)) ([787cd19](https://github.com/textkernel/oneui/commit/787cd196d673e68e03611c14dc802391c0342571))

### [13.6.1](https://github.com/textkernel/oneui/compare/13.6.0...13.6.1) (2021-03-31)


### Bug Fixes

* **Gauge:** use bem for linear gradient stops ([#469](https://github.com/textkernel/oneui/issues/469)) ([ef4dd07](https://github.com/textkernel/oneui/commit/ef4dd0725fd96838debe36ba94161a8d99636503))

## [13.6.0](https://github.com/textkernel/oneui/compare/13.5.1...13.6.0) (2021-03-23)


### Features

* **Gauge:** add new component ([#466](https://github.com/textkernel/oneui/issues/466)) ([557b979](https://github.com/textkernel/oneui/commit/557b9798b94445d86359f33082f5f5a524b8b01a))


### Bug Fixes

* **deps:** update dependency @popperjs/core to ~2.9.0 ([#412](https://github.com/textkernel/oneui/issues/412)) ([2fd5fec](https://github.com/textkernel/oneui/commit/2fd5fec923d216f14332bd12c6afc79631591fa3))
* **deps:** update dependency @react-google-maps/api to ~1.13.0 ([70752b9](https://github.com/textkernel/oneui/commit/70752b9f7559385c5512b9ee986125ca8f75f1d6))
* **deps:** update dependency react-virtualized to ~9.22.0 ([#376](https://github.com/textkernel/oneui/issues/376)) ([c52a72d](https://github.com/textkernel/oneui/commit/c52a72da1cfcf5cdd6143c99536211ed2625be77))
* **TwoPaneView:** right pane doesn't jump too much on scroll ([#456](https://github.com/textkernel/oneui/issues/456)) ([83e2cc2](https://github.com/textkernel/oneui/commit/83e2cc26043fac5a941a20f017654557e92465c6))

### [13.5.1](https://github.com/textkernel/oneui/compare/13.5.0...13.5.1) (2021-03-04)


### Bug Fixes

* **Toggle:** add styles for disabled checked state ([#454](https://github.com/textkernel/oneui/issues/454)) ([454425d](https://github.com/textkernel/oneui/commit/454425de62cada288f8064e143579611b04deaf7))

## [13.5.0](https://github.com/textkernel/oneui/compare/13.4.0...13.5.0) (2021-03-01)


### Features

* **Toggle:** new component ([#450](https://github.com/textkernel/oneui/issues/450)) ([dc20ca2](https://github.com/textkernel/oneui/commit/dc20ca2ad3e37f08740ef542e40f3b62bc3b9201))
* expose google maps utils ([#451](https://github.com/textkernel/oneui/issues/451)) ([1a09329](https://github.com/textkernel/oneui/commit/1a09329483936fe9d539d874318ffa49f6f009d0))
* **ProductTour:** new component ([#449](https://github.com/textkernel/oneui/issues/449)) ([143ef95](https://github.com/textkernel/oneui/commit/143ef95da265110a85f9c58da1d01035fc9b8bfc))

## [13.4.0](https://github.com/textkernel/oneui/compare/13.3.0...13.4.0) (2021-02-11)


### Features

* **NavLink:** extend the component with ref prop ([#448](https://github.com/textkernel/oneui/issues/448)) ([de29e12](https://github.com/textkernel/oneui/commit/de29e1282dae29588b8cd96d79663119791b006e))

## [13.3.0](https://github.com/textkernel/oneui/compare/13.2.0...13.3.0) (2021-02-10)


### Features

* **Heading:** add new context prop ([#447](https://github.com/textkernel/oneui/issues/447)) ([74c84e8](https://github.com/textkernel/oneui/commit/74c84e8ce9eb05cde9ca5a39b6fa0c566ee6cbe8))
* **WeightedResultBar:** extend a component with a custom count ([#445](https://github.com/textkernel/oneui/issues/445)) ([4255874](https://github.com/textkernel/oneui/commit/42558749bfb03f542ad360f9254e18ea460ebb2e))

## [13.2.0](https://github.com/textkernel/oneui/compare/13.1.0...13.2.0) (2021-01-28)


### Features

* **BooleanQueryTokenizer:** make BooleanQueryTokenizer exclude negations from the result ([cfdf975](https://github.com/textkernel/oneui/commit/cfdf975b78b0673743add4f4853ae38c8a971007))


### Bug Fixes

* **Autosuggest:** fix showing suggestions on focus input ([#440](https://github.com/textkernel/oneui/issues/440)) ([9145878](https://github.com/textkernel/oneui/commit/9145878132d30b81dbd8b2e320677c04bcab895a))

## [13.1.0](https://github.com/textkernel/oneui/compare/13.0.0...13.1.0) (2021-01-25)


### Features

* **Dropdown:** new component ([#437](https://github.com/textkernel/oneui/issues/437)) ([c226593](https://github.com/textkernel/oneui/commit/c226593637ecdbc36373910c1cdcd85995b9d5e9))

## [13.0.0](https://github.com/textkernel/oneui/compare/12.6.2...13.0.0) (2021-01-21)


### ⚠ BREAKING CHANGES

* older Autosuggest component has been renamed to AutosuggestDeprecated;
AutosuggestMulti has been renamed to Autosuggest;
isFirstItemAlwaysVisible prop has been renamed to allowMixingSuggestionsAndLoading and will now display all suggestion before rendering loading placeholders;
isProminent prop has been removed
* **LocationSelector:** changing attributes of the Location type

Co-authored-by: Oleksii Mukiienko <mukiienko@textkernel.nl>

### Features

* refactor Autosuggest(Multi) so it can behave as single select as well ([#436](https://github.com/textkernel/oneui/issues/436)) ([fa68407](https://github.com/textkernel/oneui/commit/fa68407351df1b6297d253f479d01bdf67e7decb))
* **LocationSelector:** expose Location type ([#434](https://github.com/textkernel/oneui/issues/434)) ([de31106](https://github.com/textkernel/oneui/commit/de31106233d32d13bac699969df6b4df93d40df4))
* WeightedResultBar component ([#432](https://github.com/textkernel/oneui/issues/432)) ([73f3ebc](https://github.com/textkernel/oneui/commit/73f3ebcf11ee6d83cb148af29b934e6d8818200d))


### Bug Fixes

* **Callout:** stretch content on full width ([#438](https://github.com/textkernel/oneui/issues/438)) ([b1b12e6](https://github.com/textkernel/oneui/commit/b1b12e665ec3b2b1649e1b08188406636adc590b))
* **ProgressBar:** remove fill minimum width ([#433](https://github.com/textkernel/oneui/issues/433)) ([8945119](https://github.com/textkernel/oneui/commit/8945119b5042f62fc54b9088a15abb66cec9c960))

### [12.6.2](https://github.com/textkernel/oneui/compare/12.6.1...12.6.2) (2020-11-25)


### Bug Fixes

* **Pagination:** fixed ability to set maxPageButtons=0 ([#431](https://github.com/textkernel/oneui/issues/431)) ([98d73f3](https://github.com/textkernel/oneui/commit/98d73f3901a69e7e6fd39ccc58a37eb5e46d4427))

### [12.6.1](https://github.com/textkernel/oneui/compare/12.6.0...12.6.1) (2020-11-18)


### Bug Fixes

* **Heading:** Remove static font color ([#429](https://github.com/textkernel/oneui/issues/429)) ([19ba1f2](https://github.com/textkernel/oneui/commit/19ba1f262a69e90ec8886188e0845b32cc322af1))

## [12.6.0](https://github.com/textkernel/oneui/compare/12.5.0...12.6.0) (2020-10-26)


### Features

* add statuses to Teaser ([d9de975](https://github.com/textkernel/oneui/commit/d9de975f63e46d74d3751c9d4800357a2284cfbe))


### Bug Fixes

* **BulkActionsToolbar:** fix paddings for BulkActionsToolbar counter ([fd28bb7](https://github.com/textkernel/oneui/commit/fd28bb7318c814dafb3d2463d7ed823663d82953))

## [12.5.0](https://github.com/textkernel/oneui/compare/12.4.0...12.5.0) (2020-10-23)


### Features

* **BulkActionsToolbar:** implement BulkActionsToolbar component ([3416ebc](https://github.com/textkernel/oneui/commit/3416ebc50b981c56ed32ff7922fe3dfb416d388c))
* **SelectButtonGroup:** restyled component ([#414](https://github.com/textkernel/oneui/issues/414)) ([fc1a561](https://github.com/textkernel/oneui/commit/fc1a5617f27ef588e2638af2ee7261d47e2f7d03))
* **StickyHeader:** implement StickyHeader component ([7fe9fcc](https://github.com/textkernel/oneui/commit/7fe9fcc79e0912c1e24ea3c4ad422dd12c9321c6))


### Bug Fixes

* **Tooltip:** tooltip is automatically disabled if content is empty ([3c4603c](https://github.com/textkernel/oneui/commit/3c4603c34bbfc840d9aacdb60fd4012246749141))

## [12.4.0](https://github.com/textkernel/oneui/compare/12.3.1...12.4.0) (2020-09-18)


### Features

* **Select:** Implement 'disabled' behaviour for ComboboxMulti ([#398](https://github.com/textkernel/oneui/issues/398)) ([bd092c2](https://github.com/textkernel/oneui/commit/bd092c2fce739c2fea94144a54c54207ceb31625))
* implemented BooleanQueryTokenizer package ([fe78a8d](https://github.com/textkernel/oneui/commit/fe78a8d2975ea80f633379381c35fb9159d98eeb))

### [12.3.1](https://github.com/textkernel/oneui/compare/12.3.0...12.3.1) (2020-09-10)


### Bug Fixes

* **AutosuggestMulti:** only show noSuggestions if user already started to search ([#389](https://github.com/textkernel/oneui/issues/389)) ([1d40bbe](https://github.com/textkernel/oneui/commit/1d40bbee6d865f7fdecdfd2f42dd39c21b2dc826))
* **Drawer:** eliminated two callbacks on expand button click ([#388](https://github.com/textkernel/oneui/issues/388)) ([078b7a2](https://github.com/textkernel/oneui/commit/078b7a2f77781bece5467230ae7f7df82a20cccf))
* **PopupBase:** made PopupBase#wasPopupClicked() work in FF ([1adeada](https://github.com/textkernel/oneui/commit/1adeada6a7bc66dae70f927a321dbb77f814acf5))

## [12.3.0](https://github.com/textkernel/oneui/compare/12.2.0...12.3.0) (2020-09-01)


### Features

* **Modal:** add prop to toggle modal position to scrollable/fixed ([#377](https://github.com/textkernel/oneui/issues/377)) ([d9e4a8e](https://github.com/textkernel/oneui/commit/d9e4a8ecf0ad2817dcbb2d1d7e1d1eabf56dc815))

## [12.2.0](https://github.com/textkernel/oneui/compare/12.1.2...12.2.0) (2020-08-21)


### Features

* **RangeSlider:** new component ([#360](https://github.com/textkernel/oneui/issues/360)) ([a849aca](https://github.com/textkernel/oneui/commit/a849aca789aa09d08336abb23bcd413d1f7d79aa))
* **Select:** new component ([#370](https://github.com/textkernel/oneui/issues/370)) ([c0a2d27](https://github.com/textkernel/oneui/commit/c0a2d27b4c45d8573199fe6ee09458203aa62c28))


### Bug Fixes

* **ComboboxMulti:** fix dropdown expanding and minimising by clicking on the icon ([#361](https://github.com/textkernel/oneui/issues/361)) ([73045ec](https://github.com/textkernel/oneui/commit/73045ec5617e17c360028aaf9466e16c0eac140e))

### [12.1.2](https://github.com/textkernel/oneui/compare/12.1.0...12.1.2) (2020-08-03)


### Bug Fixes

* **Button:** add HTMLAnchorElement to Button props ([#348](https://github.com/textkernel/oneui/issues/348)) ([a10020b](https://github.com/textkernel/oneui/commit/a10020b9713eab9c1c4f346cc0a0761d68763e61))
* **deps:** update dependency randomcolor to ~0.6.0 ([#345](https://github.com/textkernel/oneui/issues/345)) ([fc77554](https://github.com/textkernel/oneui/commit/fc7755432b132afcf830c5ed04f0f634b35708da))
* **LocationSelector:** fix multiselect mode, fix input field focusing, fix single mode field resetting ([#350](https://github.com/textkernel/oneui/issues/350)) ([19b9385](https://github.com/textkernel/oneui/commit/19b93858e0bf1d069cf9ab42678da5caa87174da))

### [12.1.1](https://github.com/textkernel/oneui/compare/12.1.0...12.1.1) (2020-08-03)


### Bug Fixes

* **Button:** add HTMLAnchorElement to Button props ([#348](https://github.com/textkernel/oneui/issues/348)) ([a10020b](https://github.com/textkernel/oneui/commit/a10020b9713eab9c1c4f346cc0a0761d68763e61))
* **deps:** update dependency randomcolor to ~0.6.0 ([#345](https://github.com/textkernel/oneui/issues/345)) ([fc77554](https://github.com/textkernel/oneui/commit/fc7755432b132afcf830c5ed04f0f634b35708da))
* **LocationSelector:** fix multiselect mode, fix input field focusing, fix single mode field resetting ([#350](https://github.com/textkernel/oneui/issues/350)) ([19b9385](https://github.com/textkernel/oneui/commit/19b93858e0bf1d069cf9ab42678da5caa87174da))

## [12.1.0](https://github.com/textkernel/oneui/compare/12.0.2...12.1.0) (2020-07-28)


### Features

* **LocationAutocomplete:** add an optional Clear button, update snapshots ([#347](https://github.com/textkernel/oneui/issues/347)) ([f02a0d3](https://github.com/textkernel/oneui/commit/f02a0d38c3ea26db3d510cf619df142ea74d209e))

### [12.0.2](https://github.com/textkernel/oneui/compare/12.0.1...12.0.2) (2020-07-27)


### Bug Fixes

* **Tooltip:** allow most of our components to be wrapped in Tooltip ([#340](https://github.com/textkernel/oneui/issues/340)) ([26900cd](https://github.com/textkernel/oneui/commit/26900cd5ead2f99489a7989a9d4ae8a92da67b1a))

### [12.0.1](https://github.com/textkernel/oneui/compare/12.0.0...12.0.1) (2020-07-22)


### Bug Fixes

* downgrade TS version to 3.8 ([#338](https://github.com/textkernel/oneui/issues/338)) ([7bddc39](https://github.com/textkernel/oneui/commit/7bddc39807f5e0cafa7bdf566da48106b9e48555))

## [12.0.0](https://github.com/textkernel/oneui/compare/11.3.0...12.0.0) (2020-07-17)


### ⚠ BREAKING CHANGES

* **Select:** * deprecate `onSuggestionChange` in favour of `onSuggestionAdd` in AutosuggestMulti and ComboboxMulti

### Features

* **Chip:** increased Chip font size ([#332](https://github.com/textkernel/oneui/issues/332)) ([8fcebe8](https://github.com/textkernel/oneui/commit/8fcebe8e70667f1676de828d07ecff8fc58ae48f))
* **Link:** add context muted option ([#333](https://github.com/textkernel/oneui/issues/333)) ([77db9d0](https://github.com/textkernel/oneui/commit/77db9d02da6a22176cb27e6feae91417c258039a))
* **LocationSelector:** fixed focus issues and map rendering ([#322](https://github.com/textkernel/oneui/issues/322)) ([4668525](https://github.com/textkernel/oneui/commit/4668525926062161d48b24b51973938867780c39))
* **Select:** make props clearer ([#331](https://github.com/textkernel/oneui/issues/331)) ([219f4e0](https://github.com/textkernel/oneui/commit/219f4e0036b2c9da181ad512f5432e340e7e0924))
* changed ListItem highlight styles ([#314](https://github.com/textkernel/oneui/issues/314)) ([a1aaa3a](https://github.com/textkernel/oneui/commit/a1aaa3aae26f067745604920788a2f8517020113))


### Bug Fixes

* **deps:** update dependency @popperjs/core to ~2.4.0 ([#292](https://github.com/textkernel/oneui/issues/292)) ([6b5e6f1](https://github.com/textkernel/oneui/commit/6b5e6f1f34ce2774ec612da703add84b115bf1cc))
* **deps:** update dependency @react-google-maps/api to ~1.9.0 ([#293](https://github.com/textkernel/oneui/issues/293)) ([3a1ded9](https://github.com/textkernel/oneui/commit/3a1ded943861eacb91a4db3dc5c4f89c2f4e131f))
* **deps:** update dependency css-vars-ponyfill to ~2.3.0 ([#294](https://github.com/textkernel/oneui/issues/294)) ([65ed76e](https://github.com/textkernel/oneui/commit/65ed76ed08f33d993c2201aeebfcc70f30d46c21))
* **deps:** update dependency downshift to ~5.4.0 ([#295](https://github.com/textkernel/oneui/issues/295)) ([7b0cae7](https://github.com/textkernel/oneui/commit/7b0cae77776676b97a0583d97e7ade11d21d962d))
* **deps:** update dependency rc-slider to ~9.3.0 ([#319](https://github.com/textkernel/oneui/issues/319)) ([08c6ddc](https://github.com/textkernel/oneui/commit/08c6ddc3fa2b4cc645d2a2f229a95fb58e7a4a05))
* **deps:** update dependency react-scripts to v2.1.8 ([#320](https://github.com/textkernel/oneui/issues/320)) ([cf1b3ad](https://github.com/textkernel/oneui/commit/cf1b3ad900f3a75f8a7e613a42bc9c692efa619a))
* **deps:** update react monorepo to v16.13.1 ([#321](https://github.com/textkernel/oneui/issues/321)) ([7af7fa3](https://github.com/textkernel/oneui/commit/7af7fa3e2827f48cf6c2292561606a7c4b4d0f04))

## [11.3.0](https://github.com/textkernel/oneui/compare/11.2.1...11.3.0) (2020-06-22)


### Features

* **AutosuggestMulti:** usability of the component was improved ([#304](https://github.com/textkernel/oneui/issues/304)) ([bd5b2dc](https://github.com/textkernel/oneui/commit/bd5b2dc716d68df25b11009dd388222f6f0c224c))
* **SelectBase:** aligned spaces between input and Autossugest ([#306](https://github.com/textkernel/oneui/issues/306)) ([061e148](https://github.com/textkernel/oneui/commit/061e1483face2ece251f70e83a8062d4b14d193d))


### Bug Fixes

* fixed input focusing after the tab was switched ([#307](https://github.com/textkernel/oneui/issues/307)) ([d723e30](https://github.com/textkernel/oneui/commit/d723e3042a5e6f2f8160f1931537792708bc052e))
* **LocationSelector:** fixed a bug where a modal got opened during tab switching ([#305](https://github.com/textkernel/oneui/issues/305)) ([35e2153](https://github.com/textkernel/oneui/commit/35e2153d0376f3ebb059cd7eaf9b460af7433f57))

### [11.2.1](https://github.com/textkernel/oneui/compare/11.2.0...11.2.1) (2020-06-15)


### Bug Fixes

* **LocationSelector:** fix modal opening on form submitting ([#299](https://github.com/textkernel/oneui/issues/299)) ([1159942](https://github.com/textkernel/oneui/commit/11599422461add300872f4ff40aa471e8e9993f9))

## [11.2.0](https://github.com/textkernel/oneui/compare/11.1.0...11.2.0) (2020-06-08)


### Features

* **AutosuggestMulti:** improved component to autosuggest requirements ([#296](https://github.com/textkernel/oneui/issues/296)) ([0529198](https://github.com/textkernel/oneui/commit/0529198b662bac597c0318fcc35c71c3c2612add))

## [11.1.0](https://github.com/textkernel/oneui/compare/11.0.0...11.1.0) (2020-05-29)


### Features

* **LocationSelector:** Added an option of fetching postal code of selected location ([#258](https://github.com/textkernel/oneui/issues/258)) ([3008bb9](https://github.com/textkernel/oneui/commit/3008bb946eb992fd0d289b35e97eeb510242f873))
* **LocationSelector:** Added supporting of single selection, updated radius changing interactions ([#255](https://github.com/textkernel/oneui/issues/255)) ([240c54a](https://github.com/textkernel/oneui/commit/240c54a053edba4f41f423814eded655421be29f))
* **LocationSelector:** tab navigation ([#261](https://github.com/textkernel/oneui/issues/261)) ([03f302a](https://github.com/textkernel/oneui/commit/03f302a6aba175ec5118b5c283fc1fac8a3f753e))
* **slider:** add slider handle focus styling ([#260](https://github.com/textkernel/oneui/issues/260)) ([2b63793](https://github.com/textkernel/oneui/commit/2b63793b18267fec08ff9ab63ff7697000d12d02))


### Bug Fixes

* **deps:** pin dependencies ([#262](https://github.com/textkernel/oneui/issues/262)) ([9a1ca45](https://github.com/textkernel/oneui/commit/9a1ca45a8a518c1451379358b3d4df56ae06bdd6))

## [11.0.0](https://github.com/textkernel/oneui/compare/10.2.0...11.0.0) (2020-05-15)


### ⚠ BREAKING CHANGES

* **component:** logic with deleting selection was moved to onSelectionRemove callback in AutosuggestMulti
* **highlight:** changed HighlighterCore API

### Features

* **component:** polishing autocompletemulti ([#256](https://github.com/textkernel/oneui/issues/256)) ([f5127f7](https://github.com/textkernel/oneui/commit/f5127f70525fc37d483776e8e8d785691699cadf))
* **highlight:** reduced exposed interface of Highlighter module ([#254](https://github.com/textkernel/oneui/issues/254)) ([82f5b4b](https://github.com/textkernel/oneui/commit/82f5b4b5b9ca86dab8255df4a6360896b65a5384))

## [10.2.0](https://github.com/textkernel/oneui/compare/10.1.0...10.2.0) (2020-05-08)


### Features

* **component:** added highlighter packages ([#253](https://github.com/textkernel/oneui/issues/253)) ([dc0435f](https://github.com/textkernel/oneui/commit/dc0435f5739aaeda2839253bbe01cc658b40ef5b))


### Bug Fixes

* fixed z-index of autosuggest input ([#252](https://github.com/textkernel/oneui/issues/252)) ([5eb2a92](https://github.com/textkernel/oneui/commit/5eb2a9237f73b2e291c20703f7c07f17bc1410ab))

## [10.1.0](https://github.com/textkernel/oneui/compare/10.0.0...10.1.0) (2020-04-15)


### Features

* **component:** added HighlighterCore and StringHighlighter ([#249](https://github.com/textkernel/oneui/issues/249)) ([bedbc05](https://github.com/textkernel/oneui/commit/bedbc05bac8d08558c6d96f1157ec6486fa07299))


### Bug Fixes

* fixed all console errors and warnings when running tests ([#242](https://github.com/textkernel/oneui/issues/242)) ([b8c91e1](https://github.com/textkernel/oneui/commit/b8c91e1925b3023c62ed25b55b3763b0c0dd0eb5))

## [10.0.0](https://github.com/textkernel/oneui/compare/9.6.0...10.0.0) (2020-03-27)


### Bug Fixes

* **Field:** Add rest parameter ([#240](https://github.com/textkernel/oneui/issues/240)) ([d67a405](https://github.com/textkernel/oneui/commit/d67a405))
* **Input:** Disable LastPass suggesting for Input components ([#244](https://github.com/textkernel/oneui/issues/244)) ([c40d65c](https://github.com/textkernel/oneui/commit/c40d65c))
* **popup:** changed close detection logic ([#236](https://github.com/textkernel/oneui/issues/236)) ([1a014e7](https://github.com/textkernel/oneui/commit/1a014e7))
* **styles:** adjusted styles for input, textarea, select ([#237](https://github.com/textkernel/oneui/issues/237)) ([0679624](https://github.com/textkernel/oneui/commit/0679624))


### Features

* **component:** added listoptimizer component ([10c84af](https://github.com/textkernel/oneui/commit/10c84af))
* **component:** added new AutosuggestMulti component ([#241](https://github.com/textkernel/oneui/issues/241)) ([41db267](https://github.com/textkernel/oneui/commit/41db267))
* **component:** listoptimizer component ([#239](https://github.com/textkernel/oneui/issues/239)) ([ccc9b88](https://github.com/textkernel/oneui/commit/ccc9b88))
* **Tooltip:** Migrate component to tippy.js library ([#233](https://github.com/textkernel/oneui/issues/233)) ([13543e7](https://github.com/textkernel/oneui/commit/13543e7))


### BREAKING CHANGES

* **Tooltip:** prop `alwaysVisible` was renamed to `visible`



## [9.7.0](https://github.com/textkernel/oneui/compare/9.6.0...9.7.0) (2020-02-28)


### Bug Fixes

* **popup:** changed close detection logic ([#236](https://github.com/textkernel/oneui/issues/236)) ([1a014e7](https://github.com/textkernel/oneui/commit/1a014e7))
* **styles:** adjusted styles for input, textarea, select ([#237](https://github.com/textkernel/oneui/issues/237)) ([0679624](https://github.com/textkernel/oneui/commit/0679624))


### Features

* **component:** added listoptimizer component ([10c84af](https://github.com/textkernel/oneui/commit/10c84af))
* **component:** listoptimizer component ([#239](https://github.com/textkernel/oneui/issues/239)) ([ccc9b88](https://github.com/textkernel/oneui/commit/ccc9b88))



## [9.6.0](https://github.com/textkernel/oneui/compare/9.5.0...9.6.0) (2020-02-26)


### Features

* **Field:** Add new component ([#235](https://github.com/textkernel/oneui/issues/235)) ([1572e4f](https://github.com/textkernel/oneui/commit/1572e4f))



## [9.5.0](https://github.com/textkernel/oneui/compare/9.4.0...9.5.0) (2020-02-25)


### Bug Fixes

* put onClose invocation before closing the dropdown for PopupBase component ([6801656](https://github.com/textkernel/oneui/commit/6801656)), closes [#ONEUI-164](https://github.com/textkernel/oneui/issues/ONEUI-164)


### Features

* **Input:** Add an optional label ([1b31281](https://github.com/textkernel/oneui/commit/1b31281))



## [9.4.0](https://github.com/textkernel/oneui/compare/9.3.2...9.4.0) (2020-02-14)


### Bug Fixes

* **Input:** remove z-index when focused ([#229](https://github.com/textkernel/oneui/issues/229)) ([90e7d7e](https://github.com/textkernel/oneui/commit/90e7d7e))
* **pill:** run pill callback before close dropdown ([#231](https://github.com/textkernel/oneui/issues/231)) ([7a96032](https://github.com/textkernel/oneui/commit/7a96032))


### Build System

* **deps:** migrate popper.js to v2 ([#230](https://github.com/textkernel/oneui/issues/230)) ([6c06bef](https://github.com/textkernel/oneui/commit/6c06bef))
* **storybook:** update to latest version ([#228](https://github.com/textkernel/oneui/issues/228)) ([1c289dd](https://github.com/textkernel/oneui/commit/1c289dd))


### Features

* **ComboboxMulti:** Add new component ([#226](https://github.com/textkernel/oneui/issues/226)) ([1741223](https://github.com/textkernel/oneui/commit/1741223))



### [9.3.2](https://github.com/textkernel/oneui/compare/9.3.1...9.3.2) (2020-01-31)


### Bug Fixes

* **FieldWithValidation:** change logic when using tooltip ([#227](https://github.com/textkernel/oneui/issues/227)) ([b564256](https://github.com/textkernel/oneui/commit/b564256))



### [9.3.1](https://github.com/textkernel/oneui/compare/9.3.0...9.3.1) (2020-01-28)



## [9.3.0](https://github.com/textkernel/oneui/compare/9.2.0...9.3.0) (2020-01-28)


### Bug Fixes

* **Autosuggest:** allow selection of same item twice in a row ([#221](https://github.com/textkernel/oneui/issues/221)) ([8a7d2b7](https://github.com/textkernel/oneui/commit/8a7d2b7))


### Features

* **FieldWithValidation:** new component ([#225](https://github.com/textkernel/oneui/issues/225)) ([803980c](https://github.com/textkernel/oneui/commit/803980c))



## [9.2.0](https://github.com/textkernel/oneui/compare/9.1.0...9.2.0) (2020-01-16)


### Features

* **SelectButtonGroup:** improve API ([#220](https://github.com/textkernel/oneui/issues/220)) ([691a474](https://github.com/textkernel/oneui/commit/691a474))



## [9.1.0](https://github.com/textkernel/oneui/compare/9.0.2...9.1.0) (2020-01-15)


### Bug Fixes

* **SelectButtonGroup:** remove knob that doesn't work from story ([#219](https://github.com/textkernel/oneui/issues/219)) ([5e1e386](https://github.com/textkernel/oneui/commit/5e1e386))


### Build System

* **linting:** update prettier ([#217](https://github.com/textkernel/oneui/issues/217)) ([f848691](https://github.com/textkernel/oneui/commit/f848691))


### Features

* **SelectButtonGroup:** new components ([#213](https://github.com/textkernel/oneui/issues/213)) ([0367577](https://github.com/textkernel/oneui/commit/0367577))



### [9.0.2](https://github.com/textkernel/oneui/compare/9.0.1...9.0.2) (2020-01-13)


### Bug Fixes

* **Autosuggest:** make sure it blurs when needed ([#215](https://github.com/textkernel/oneui/issues/215)) ([5adaf90](https://github.com/textkernel/oneui/commit/5adaf90))
* **Slider:** Fix slider appearing ([#216](https://github.com/textkernel/oneui/issues/216)) ([243ae11](https://github.com/textkernel/oneui/commit/243ae11))



### [9.0.1](https://github.com/textkernel/oneui/compare/9.0.0...9.0.1) (2020-01-03)


### Bug Fixes

* **storybook:** added ts docgen rule to storybook webpack config ([#211](https://github.com/textkernel/oneui/issues/211)) ([f260081](https://github.com/textkernel/oneui/commit/f260081))
* **storybook:** moved storybook on commonjs module ([#209](https://github.com/textkernel/oneui/issues/209)) ([2af04db](https://github.com/textkernel/oneui/commit/2af04db))
* **TypeScript:** declaration of forward ref components ([#212](https://github.com/textkernel/oneui/issues/212)) ([0afea09](https://github.com/textkernel/oneui/commit/0afea09))


### Build System

* **deps:** bump handlebars from 4.1.2 to 4.5.3 in /example ([9620e09](https://github.com/textkernel/oneui/commit/9620e09))



## [9.0.0](https://github.com/textkernel/oneui/compare/8.4.0...9.0.0) (2019-12-27)


### Bug Fixes

* **Autosuggest:** cannot delete item tags by clicking them ([#206](https://github.com/textkernel/oneui/issues/206)) ([b9ae2f7](https://github.com/textkernel/oneui/commit/b9ae2f7))
* **Callout:** add HTML attributes to props ([#207](https://github.com/textkernel/oneui/issues/207)) ([6b90459](https://github.com/textkernel/oneui/commit/6b90459))


### Build System

* bundle size improvements ([#203](https://github.com/textkernel/oneui/issues/203)) ([81a6e26](https://github.com/textkernel/oneui/commit/81a6e26))


### Features

* **Callout:** changed `<p>` to `<div>` for content element, removed `lineHeightStyle` ([d0685da](https://github.com/textkernel/oneui/commit/d0685da))
* **Tabs:** Rewrite Tabs API ([#204](https://github.com/textkernel/oneui/issues/204)) ([558d46f](https://github.com/textkernel/oneui/commit/558d46f))


### BREAKING CHANGES

* **Tabs:** Tabs, Tab, TabMenu, TabContent were deprecated along with some of their features in favour of TabsBar and TabItem
* **Callout:** `lineHeightStyle` removed. This property was
  redundant. Styling must be handled by passing a className.



## [8.4.0](https://github.com/textkernel/oneui/compare/8.3.0...8.4.0) (2019-12-11)


### Bug Fixes

* **LocationSelector:** fix input focus ([#190](https://github.com/textkernel/oneui/issues/190)) ([f57e27c](https://github.com/textkernel/oneui/commit/f57e27c))
* **Modal:** ensure that classNames from props are applied as intended ([#193](https://github.com/textkernel/oneui/issues/193)) ([eada768](https://github.com/textkernel/oneui/commit/eada768))
* **storybook:** fix error in Autosuggest story ([#187](https://github.com/textkernel/oneui/issues/187)) ([0b36343](https://github.com/textkernel/oneui/commit/0b36343))


### Build System

* **typescript:** migrated build pipeline to typescript ([#186](https://github.com/textkernel/oneui/issues/186)) ([79aa25d](https://github.com/textkernel/oneui/commit/79aa25d))


### Features

* **fonts:** change default font-family to use system fonts ([#192](https://github.com/textkernel/oneui/issues/192)) ([6c2cf4b](https://github.com/textkernel/oneui/commit/6c2cf4b))
* **Pill:** add onClose prop ([#198](https://github.com/textkernel/oneui/issues/198)) ([ccd928e](https://github.com/textkernel/oneui/commit/ccd928e))
* **Tooltip:** add tooltip component ([#196](https://github.com/textkernel/oneui/issues/196)) ([38f01d8](https://github.com/textkernel/oneui/commit/38f01d8))
* new SelectedOption component ([#197](https://github.com/textkernel/oneui/issues/197)) ([77bdf1c](https://github.com/textkernel/oneui/commit/77bdf1c))



## [8.3.0](https://github.com/textkernel/oneui/compare/8.2.1...8.3.0) (2019-11-13)


### Build System

* implemented script that checks npm access before publishing the package ([a847cb8](https://github.com/textkernel/oneui/commit/a847cb8))


### Features

* **SearchButton:** Extend SearchButton with an optional label ([#189](https://github.com/textkernel/oneui/issues/189)) ([a831b8d](https://github.com/textkernel/oneui/commit/a831b8d))



### [8.2.1](https://github.com/textkernel/oneui/compare/8.2.0...8.2.1) (2019-11-04)


### Bug Fixes

* **PillDropdown:** add z-index so that it always appears on top ([#184](https://github.com/textkernel/oneui/issues/184)) ([9f537bd](https://github.com/textkernel/oneui/commit/9f537bd))



## [8.2.0](https://github.com/textkernel/oneui/compare/8.1.1...8.2.0) (2019-10-31)


### Features

* **Pill:** extend PillDropdown with Done button and handle detault state in PillButton ([#183](https://github.com/textkernel/oneui/issues/183)) ([93d4884](https://github.com/textkernel/oneui/commit/93d4884))
* new RadioButtonGroup component ([#182](https://github.com/textkernel/oneui/issues/182)) ([557cd2f](https://github.com/textkernel/oneui/commit/557cd2f))



### [8.1.1](https://github.com/textkernel/oneui/compare/8.1.0...8.1.1) (2019-10-24)


### Bug Fixes

* **Drawer:** set fixed font size to Drawer's header ([fb46129](https://github.com/textkernel/oneui/commit/fb46129))



## [8.1.0](https://github.com/textkernel/oneui/compare/8.0.1...8.1.0) (2019-10-15)


### Bug Fixes

* refactor and arrange components z-index prop ([#177](https://github.com/textkernel/oneui/issues/177)) ([fe2addc](https://github.com/textkernel/oneui/commit/fe2addc))
* **List:** keyboard navigation bugs ([#180](https://github.com/textkernel/oneui/issues/180)) ([31189d9](https://github.com/textkernel/oneui/commit/31189d9))


### Features

* **Pill:** new component PillButton ([#174](https://github.com/textkernel/oneui/issues/174)) ([ee8d0ee](https://github.com/textkernel/oneui/commit/ee8d0ee))
* new Pill component ([#179](https://github.com/textkernel/oneui/issues/179)) ([8ea4a84](https://github.com/textkernel/oneui/commit/8ea4a84))
* new PopupBase component ([#178](https://github.com/textkernel/oneui/issues/178)) ([da5c077](https://github.com/textkernel/oneui/commit/da5c077))



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
