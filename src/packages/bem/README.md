# BEM

bem.js automatically produces a list of classnames for your component based on its props and state.

Classnames being generated based on BEM convention with the following assumptions:

-   As a block name we use React component name.
-   We can declare elements with `{ ...this.elem('elementName') }` construction
-   Modifier is a component's prop or state name and its value (if value is of boolean type, it is omitted).

As a separators we use:

-   element prefix: `__` (double underscore)
-   modifier prefix `--` (double dash)
-   modifier's value prefix is `_` (single underscore)

In terms of CSS classnames it looks like this:

```css
/* component's root node class name */
.ComponentName {}
/* component's root node class name with boolean modifier applied */
.ComponentName--modName {}
/* component's root node class name with string/number modifier applied */
.ComponentName--modName_modValue {}
/* component's sub node (element) class name */
.ComponentName__elem {}
/* component's root node class name with boolean modifier + value applied */
.ComponentName__elem--modName {}
/* component's root node class name with string/number modifier + value applied */
.ComponentName__elem--modName_modValue {}
```

## Example of usage

### Statefull component

Button.js

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 1. Don't forget to import `bem` decorator
import bem from 'bem';
// 2. Import classnames map (webpack's css loader should be configured in css-module mode)
import classnamesMap from './Button.scss';

class Button extends Component {

    state = { clicked: false };

    handleClick = () => {
        const { clicked } = this.state;
        this.setState({ clicked: !clicked });
    };

    almostRandomValue() {
        if (this.props.active) return 'foo';
        if (Math.random() > 0.5) return 'bar';
        return 'buz';
    }

    render() {
        return (
            {/*
            3. Add { ...this.block() } construction to declare node as a block root
               Note! If needed, {...this.props} should be spread before { ...this.block() } in order
               to avoid className overwriting.
            */}
            <button {...this.props} { ...this.block() } onClick={this.handleClick}>
                {/*
                4. Add { ...this.elem('label') } construction to declare node as a label element
                */}
                <span { ...this.elem('label') }>
                    {this.props.children}
                </span>
                {/*
                4. If you need to add some custom modifiers, you can pass it as 2nd argument to this.elem function.
                Or as a 1st argument to this.block function. E.g. { ...this.block({ custom: 'modifier' }) }
                */}
                <span { ...this.elem('icon', { almostRandomValue: this.almostRandomValue() }) }>
                    {props.children}
                </span>
            </button>
        );
    }
}

Button.propTypes = {
    active: PropTypes.bool,
    type: PropTypes.oneOf([ 'normal', 'extraordinary' ]),
};

Button.defaultProps = {
    active: false,
    type: 'normal',
};

// 5. If you need to have class name (.Button--active) that depends on
//    `active` prop, just list this prop in propsToMods list.
Button.propsToMods = ['active'];

// 6. If you need to have class name (.Button--clicked) that depend on
//    state.clicked value, just list this prop in propsToMods list.
Button.stateToMods = ['clicked'];

// 7. Decorate component with `bem` decorator and pass classnamesMap to it
export default bem(classnamesMap)(Button)
```

### Stateless component

ButtonStateless.js

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import classnamesMap from './Button.scss';

const { block, elem } = bem({
    name: 'Button', // Block name, that is used in css classnames
    classnames: classnamesMap,
    // 1. If you need to have class name (.ButtonStateless--active) that depends on
    //    `active` prop, just list this prop in propsToMods list.
    propsToMods: ['active']
});

const almostRandomValue = (props) => {
    if (props.active) return 'foo';
    if (Math.random() > 0.5) return 'bar';
    return 'buz';
}

const ButtonStateless = (props) => {
    return (
      {/*
      2. Add { ...block(props) } construction to declare node as a block
         Note! If needed, {...props} should be spread before { ...block(props) } in order
         to avoid className overwriting.
      */}
      <button {...props} { ...block(props) }>
        {/*
        3. Add { ...elem('label', props) } construction to declare node as a label element
        */}
        <span { ...elem('label', props) }>
            {props.children}
        </span>
        {/*
        4. If you need to add some custom modifiers, you can pass it as 3rd argument to the elem function.
            Or as a 2nd argument to block function. E.g. { ...block(props, { custom: 'modifier' }) }
        */}
        <span { ...elem('icon', props, { almostRandomValue: almostRandomValue(props) }) }>
            {props.children}
        </span>
      </button>
    );
}

ButtonStateless.propTypes = {
    active: PropTypes.bool,
};
ButtonStateless.defaultProps = {
    active: false,
};

export default ButtonStateless;
```

Button.scss

```css
/* Component's root node class name */
.Button {
    display: inline-block;

    /*
    Block: "Button", modifier: "active" (based on props.active), value: true.
    Is applied to the component's root node when props.active = true is set.
    */
    &--active {
        color: red;
    }

    /*
    Block: "Button", modifier: "type" (based on props.type), any truthy value.
    Is applied to the component's root node when `props.type = "normal"` is set.
    */
    &--type {
        border: 1px;
    }

    /*
    Block: "Button", modifier: "type" (based on props.type), value: "normal".
    Is applied to the component's root node when `props.type = "normal"` is set.
    */
    &--type_normal {
        background-color: grey;
    }

    /*
    Block "Button", modifier "type" (based on props.type), value "extraordinary".
    Is applied to the component's root node when `props.type = "extraordinary"` is set.
    */
    &--type_extraordinary {
        background-color: red;
    }

    /*
    Block "Button", modifier "clicked" (based on state.clicked), value true.
    Is applied to the component's root node when `state.clicked = true` is set.
    */
    &--clicked {
        border-style: dashed;
    }

    /*
    Block "Button", element "label"
    Is applied to the component's label node.
    */
    &__label {
        color: blue;
    }

    /*
    Block "Button", element "label", modifier: "active" (based on props.active), value: true.
    Is applied to the component's label node when props.active = true is set.
    */
    &__label--active {
        color: yellow;
    }

    /*
    Block "Button", element "label", modifier "extraordinary" (based on props.type), value "extraordinary".
    Is applied to the component's label node when `props.type = "extraordinary"` is set.
    */
    &__label--type_extraordinary {
        color: orange;
    }
}
```

### Using elem to enrich existing elements

If you wish to enrich an existing HTML element (e.g. child of the component) with extra classes, you need to make sure to preserve already existing classes on that element. To achieve that you can list existing classes as the 3rd argument for `elem`. For example:

```jsx
import React from 'react';
import bem from '../../..';
import styles from './styles.json';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
});

const List = props => (
    <ul {...block(props)}>
        {React.Children.map(props.children, child =>
            // Note the 3rd argument when calling 'elem'
            child ? React.cloneElement(child, elem('item', props, child.props.className)) : null
        )}
    </ul>
);

List.displayName = 'List';

export default List;
```

## Examples of outcome

Having the example above we can get the following results.
`bem` decorator adds only classnames that are declared in a stylesheet and
respectively exists in classnames map.

### No props:

```html
<Button />
 ↓ ↓ ↓
<button class="Button">
    <span class="Button__label" />
</button>
```

### Prop `active` is set:

```html
<Button active={true} />
 ↓ ↓ ↓
<button class="Button Button--active">
    <span class="Button__label Button__label--active" />
</button>
```

### Prop `active` and `type` are set:

**Note** that property of a boolean type `active={true}` produces `Button__label--active` (_without_ mod value), when property of a string type `type='extraordinary'` gives us two classnames: `Button__label--type` (_without_ mod value) and `Button__label--type_extraordinary` (_with_ mod value).

```html
<Button active={true} type="extraordinary" />
 ↓ ↓ ↓
<button class="Button Button--active Button--type Button--type_extraordinary">
    <span
        class="Button__label Button__label--active Button__label--type Button__label--type_extraordinary"
    />
</button>
```

### Prop `active` equals false

No classnames will be produced if boolean property has `false` value.

```html
<Button active={false} />
 ↓ ↓ ↓
<button class="Button">
    <span class="Button__label" />
</button>
```

### Clicked state

```html
<Button /> <!-- this.setState({ clicked: true }) -->
 ↓ ↓ ↓
<button class="Button Button--clicked">
    <span class="Button__label Button__label--clicked" />
</button>
```
