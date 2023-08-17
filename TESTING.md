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

## Simulating Events.

#### Prefer to use [userEvent](https://testing-library.com/docs/user-event/intro/) instead of [fireEvent](https://testing-library.com/docs/dom-testing-library/api-events/).

### Using `userEvent`

```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { container } = render(<MyComponent />);
const user = userEvent.setup();
await user.type(screen.getByDisplayValue(''), 'Utrecht');
expect(container).toMatchSnapshot();
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

```ts
import { render, fireEvent } from '@testing-library/react';

const handleClick = jest.fn();
render(<MyComponent onClick={handleClick} />);
const button = screen.getByRole('button', { name: 'click me' });
fireEvent.click(button);

expect(handleClick).toHaveBeenCalled();
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
