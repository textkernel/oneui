# Textkernel OneUI Developer Guide

When contributing to the OneUI library, please consider the following developer guidelines.

## Definition of Done Checklist

Any new implementation is expected to meet the following standards before it can be merged.

-   The component has been manually tested and complies with the Textkernel [browser support guidelines](https://textkernel.com/browser-support/).
-   The component has a [**displayName**](#display-names) defined.
-   The implementation complies with [**accessibility**](#accessibility) standards.
-   The component is **properly exported** in `src/index.js` (maintain alphabetical order).
-   The implementation is thoroughly [**covered by tests**](#testing) (Jest / Enzyme, preferably 100%), not only with snapshots.
-   The component [**comes with a story**](#component-showcases) in Storybook that allows props to be changed with knobs.
-   The implementation is **reviewed** by another contributor.
-   The complete **build is passing** (including tests and code linting).

## Component Design

In general: OneUI tries to adhere to the principles prescribed by [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/). This means we intend to work from the smallest possible units (molecules) towards larger compounds (organisms).

### Functional vs. Class Components

Simple functional components have the preference over class / stateful components. Only use class components if it needs to have lifecycle methods or a state of its own.

### Display Names

Every component should have a [display name](https://reactjs.org/docs/react-component.html#displayname) defined. This is because component names will get minified in the production build process, causing them to be mangled and unidentifiable.
For consistency, file name, component name and displayName should be the same.

### Component Props

#### Use of Props and `...rest`

Props that are very specific to a component should be explicitly destructed and applied accordingly. Any remaining props should be applied to the top-level DOM element using `...rest` syntax, before all attributes that should not be overridden. Considering the following example of a component that renders a simple checkbox:

```javascriptdefaultValues
const { disabled, ...rest } = props;

return (
    <input {...rest} type=”checkbox” disabled={disabled} />
);
```

Using the `...rest` syntax we allow any (undocumented) prop to be applied to the element, while never overriding required or specific attributes. This makes the component API less opinionated while still enforcing its minimum requirements (e.g. not allowing it to render a text input instead of checkbox).

### TypeScript

### Imports

Always use explicit imports instead of default ones. This will prevent bugs, e.g. props types not showing up in Storybook. For example:

```javascript
// GOOD:
import * as React from 'react';
```

```javascript
// BAD:
import React from 'react';
```

### Export

Always add export for prop types and types related to component.

### Type definitions for Props and States

-   Always use `interface` when defining types for props and states. Interfaces are more "extendable" because of support for declaration merging. This is useful when components support native HTML props, for example:

```javascript
interface Props extends <HTMLInputElement> {
    /** Description of this props  */
    context: string;
}
```

-   Define **optional params** in `defaultValues` only if they have a meaningful value. In FunctionalComponents also mark them with `?` as in `propName?: type`. Without setting the prop to optional with `?` we have 2 problems:

    -   TS will think it is required when the component is used (_last updated: TS 3.7_).

    -   It will show us as required in storybook even if its type can be undefined.

    _Note_: this can lead to annoying situations where you have to add additional type checking in the code, if you really have to make sure that a prop is not null, but it seems we will have to live with that for now.

-   For **children and other node params** use types from `src/types/types.d.ts`

### Using Type

Types are useful for union types, meaning they are more "composable":

```javascript
type MyType = TypeA | TypeB;
```

### Accessibility

We strive for a high level of accessibility for all components that come with OneUI. An overview of best practices specific to React [can be found here](https://reactjs.org/docs/accessibility.html). At least consider the points below.

#### Semantic HTML

Always try to use as much semantic HTML as possible. Do not just use div or span if there is a semantic alternative that makes more sense. Moreover, make sure that proper attributes are used (e.g. `input type=”search”` rather than `input type=”text”`) and elements are properly labeled and referenced when applicable (e.g. `<label htmlFor=”myInput”>Some label</label><input type=”search” id=”myInput” />`).

#### WAI-ARIA Compliance

Try to make components as descriptive as possible to increase accessibility for e.g. screen readers. Especially when using elements that are less semantic (e.g. div), consider application of [WAI-ARIA roles, properties and states](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) to improve accessibility.

### Forwarding Refs

[Ref forwarding](https://reactjs.org/docs/forwarding-refs.html) is a method to expose the component's DOM node, the rendered output, to a parent component. This may be useful when the outer component needs to know about e.g. size or position of the child, or programmatically set focus on it.

### Component Showcases

Each distinct component should come with an example, for which we use [Storybook](https://textkernel.github.io/oneui/). When creating new component stories, use [addon knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs) to allow users to try out different prop values. Prop descriptions should appear automatically when properly defined in the code.

## CSS classes naming convention

OneUI uses [@textkernel/bem library](https://github.com/textkernel/bem) that auto-generates and applies CSS classes on the basis of component name and its props. @textkernel/bem requires CSS written in the BEM paradigm. Detailed instructions with regard to how to use the utility [can be found here](https://github.com/textkernel/bem/blob/master/README.md).

## Theming Compatibility

OneUI components must be themeable. The most important rule is that any CSS property values that should be affected by themes need to be defined as CSS variables. Each CSS variable should come with a default value, defined by the base theme. Any static CSS property values _will not be affected_ when using custom themes.
There are two places where CSS variables must be defined:

1. `themes/oneui` - used for generating CSS properties in building bundles phase.
2. `themes/OneUITheme` - used for generating CSS properties in browser.
3. `themes/themerollerConfig` - used for building Themeroller component interface.

The CSS property values must be the same for `themes` and `themes/OneUITheme`.

## Testing

Each implementation should be thoroughly covered with tests. DOM structure can in general be covered using Jest snapshots while additional interactivity / behaviour needs to be explicitly tested through assertions - don’t overdo on snapshot tests. Always strive for 100% code coverage. Component tests are to be put close to the implementation in a `__tests__` folder. Before rounding up your implementation make sure that the complete test suite is passing. In short:

1. Place tests close to implementation, in `__tests__` subdirectory within component directory
2. Start with simple component rendering tests, possibly using a snapshot
3. Test additional interactivity / behaviour with explicit assertions
4. Strive for 100% code coverage

## Committing and Merging

### Commit Messages

OneUI's [release procedure](RELEASING.md) and [changelog](CHANGELOG.md) automation heavily relies on commit messages. Commit messages should follow the [Conventional Commit](https://www.conventionalcommits.org/en/) specifications. This is critical for the release script to determine a correct new version number. An updated changelog is generated automatically on the basis of commit messages. The commit message structure should be as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Commit types (required) include:

-   `feat`: A new feature (equivalent to `MINOR`)
-   `fix`: A bug fix (equivalent to `PATCH`)
-   `docs`: Changes to documentation
-   `test`: Changes to tests
-   `chore`: Other changes that dont affect source files, tests or documentation
-   `revert`: Reverted previous commit
-   `style`: Code style change (indentation, semicolons, ...)
-   `perf`: Performance enhancements
-   `refactor`: Code refactoring without changes to public API
-   `build`: Changes that affect the build system or external dependencies

Use imperative, present tense in your commit description ("change", not "changed" or "changes") without uppercases or period (.) at the end.

**Breaking changes** should be explicitly marked (singular, with uppercase) in the message footer, e.g. `BREAKING CHANGE: <note>`. This will result in a new `MAJOR` package version.

### Merging

When merging a branch, squash its commits for the changelog to be nice and tidy. Each pull request / squashed commit should eventually equal one fix / feature / change in docs or tests.

## Releasing

The procedure for making a new release is [described here](RELEASING.md).
