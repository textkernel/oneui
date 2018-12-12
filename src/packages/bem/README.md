BEM
===

bem.js automatically produces a list of classnames for your component based on its props and state.

Classnames being generated based on BEM convention with the following assumtions:
 * As a block name we use React component name.
 * We can declare elements with `{ ...this.elem('elementName') }` construction
 * Modifyer is a component's prop or state name and its value (if value is of boolean type, it is ommited).

As a separators we use:
* element prefix: `__` (double underscore)
* modifyer prefix `--` (double dash)
* modifyer's value prefix is `_` (single underscore)

In terms of CSS classnames it looks like this:
```css
/* component's root node class name */
.ComponentName {}
/* component's root node class name with boolean modifyer applied */
.ComponentName--modName {}
/* component's root node class name with string/number modifyer applied */
.ComponentName--modName_modValue {}
/* component's sub node (element) class name */
.ComponentName__elem {}
/* component's root node class name with boolean modifyer + value applied */
.ComponentName__elem--modName {}
/* component's root node class name with string/number modifyer + value applied */
.ComponentName__elem--modName_modValue {}
```

Example of usage
----------------

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

    render() {
        return (
            {/*  3. Add { ...this.block() } construction to declare node as a block root */}
            <button { ...this.block() } onClick={this.handleClick}>
                {/*  4. Add { ...this.elem('label') } construction to declare node as a label element */}
                <span { ...this.elem('label') }>
                    {this.props.children}
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

ButtonStateless.js
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import classnamesMap from './Button.scss';

const ButtonStateless = (props) => {
    return (
      {/*  1. Add { ...props.bem.block() } construction to declare node as a block */}
      <button { ...props.bem.block() }>
        {/*  2. Add { ...props.bem.elem('label') } construction to declare node as a label element */}
        <span { ...props.bem.elem('label') }>
            {props.children}
        </span>
      </button>
    );
}

// You can set displayName explicitly if you need a custom block name
// for the component. In this case `Button` instead of `ButtonStateless`.
ButtonStateless.displayName = 'Button';
ButtonStateless.propTypes = {
    active: PropTypes.bool,
};
ButtonStateless.defaultProps = {
    active: false,
};
// 3. If you need to have class name (.ButtonStateless--active) that depends on
//    `active` prop, just list this prop in propsToMods list.
ButtonStateless.propsToMods = ['active'];

export default bem(classnamesMap)(ButtonStateless);
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

Examples of outcome
-------------------

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

**Note** that property of a boolean type `active={true}` produces `Button__label--active` (*without* mod value), when property of a string type `type='extraordinary'` gives us classname `Button__label--type_extraordinary` (*with* mod value)

```html
<Button active={true} type='extraordinary' />

    ↓ ↓ ↓

<button class="Button Button--active Button--type_extraordinary">
    <span class="Button__label Button__label--active Button__label--type_extraordinary" />
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