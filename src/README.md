# Guideline for creation of new components
When working on the implementation of new components please consider the internal guidelines below.

## Component API design
Before working on the implementation of a new component you are expected to think of a well-thought-out API design. 
Have another contributor review your design to make sure nothing gets overlooked. Such a design includes:

* Overview of **supported props**
* Detailed definition of **prop types**. Go for the highest level of specificity that makes sense: don't just use `object` when you can use `shape`.
* Which props are **required**
* **Default** prop values for those that are not required
* An **example** of conceived implementation, e.g.:

```
import { Button, ButtonGroup } from '@textkernel/nice';
<ButtonGroup>
    <Button
        context="primary"
        htmlType="link"
        href="#"
        target="_blank"
        disabled
    >
        Click me
    </Button>
    ...
</ButtonGroup>
```

## Definition of done
Any new component should meet the following requirements before it can be merged.

* The component has been manually tested and complies with the Textkernel [browser support guidelines](https://www.textkernel.com/browser-support/)
* The component is thorougly **covered by tests** (Jest / Enzyme), not only with snapshots
* The component **comes with a story** in Storybook that allows props to be changed with knobs
* Utils (functions) should be accompanied with **clear code comments**
* The implementation is **reviewed** by another contributor
* The complete **build is passing**
