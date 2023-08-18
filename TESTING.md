# Introduction

The `@testing-library family` of packages helps you test UI components in a user-centric way.

[Documentation](https://testing-library.com/)

For some functions for example `toBeInTheDocument()`, [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) needs to be install .

## Useful links

[Common mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

[Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details)

[Using userEvent vs fireEvent](https://kentcdodds.com/calls/02/31/using-user-event-vs-fire-event)

## Rendering Components

```ts
import { render } from '@testing-library/react';

const { container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

## Rerender Components

#### Use when changing props. Note that if you use render twice, it will render the component again, and you will have 2 instances in the DOM.

```ts
import { render } from '@testing-library/react';

const { rerender, container } = render(<MyComponent />);
rerender(<MyComponent isArrowUp> </MyComponent>);
```

## Finding Elements using `screen` [description](https://testing-library.com/docs/queries/about/)

```ts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

render(<MyComponent />);
const button = screen.getByRole('button', { name: 'click me' });
expect(button).toBeInTheDocument();
```

#### Sometimes the element is rendered in the DOM but for some reason it is hidden and you want to test that the element is there but it is not visible. Using `toBeInTheDocument` it will always return a positive status. To test this, we should use `toBeVisible`
```ts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// eg. Button2 is hidden using CSS
render(
    <div>
        <Button1 />
        <Button2 isHidden />
    </div>
);
const button = screen.getAllByRole('button');
expect(button[0]).toBeVisible();
expect(button[1]).not.toBeVisible();
```

## Simulating Events.

#### Prefer to use [userEvent](https://testing-library.com/docs/user-event/intro/) instead of [fireEvent](https://testing-library.com/docs/dom-testing-library/api-events/).

### Using `userEvent`

```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { container } = render(<MyComponent />);
const user = userEvent.setup();
await user.type(screen.getByDisplayValue(''), 'Utrecht');
expect(screen.getByDisplayValue('Utrecht')).toBeInTheDocument();
```

```ts
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const handleClick = jest.fn();
render(<MyComponent onClick={handleClick} />);
const button = screen.getByRole('button', { name: 'click me' });
const user = userEvent.setup();
await user.click(button);
expect(handleClick).toHaveBeenCalled();
```

### Using `fireEvent`
#### If you want to dispatch a specific DOM event you should use `fireEvent`. Not all events are possible using `userEvent` for example focusing a element.

```ts
import { render, fireEvent } from '@testing-library/react';

const handleOnFocus = jest.fn();
render(<MyComponent onFocus={handleOnFocus} />);
const button = screen.getByRole('button', { name: 'click me' });
fireEvent.focus(button);

expect(handleOnFocus).toHaveBeenCalled();
```

## Checking for HTML Attributes

```ts
import '@testing-library/jest-dom';

expect(view.container.firstChild).toHaveClass('Callout--context_warning');
```

```ts
import '@testing-library/jest-dom';

expect(screen.getByRole('button')).toHaveAttribute('data-test', 'something');
```

## Snapshot the component

### Using [container](https://testing-library.com/docs/react-testing-library/api/#container)

```ts
import { render } from '@testing-library/react';

const { container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

### Sometimes the container is not sufficient for example when working with Dialogs, use [baseElement](https://testing-library.com/docs/react-testing-library/api/#baseelement) instead

```ts
import { render } from '@testing-library/react';

const { baseElement } = render(<MyComponent />);
expect(baseElement).toMatchSnapshot();
```
