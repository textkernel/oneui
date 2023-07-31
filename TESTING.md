## Introduction
The `@testing-library family` of packages helps you test UI components in a user-centric way.

[Documentation](https://testing-library.com/)

For some functions for example `toBeInTheDocument()` needs to install [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/).

### Summary
Using RTL we should be testing based on the DOM Elements that were rendered, which are the things that the ```user sees and interacts``` with.


## Useful links
[Common mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Examples

### Rendering Components


```ts
import { render } from '@testing-library/react';

const { container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

```ts
import { render } from '@testing-library/react';

const { container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

```ts
import { render } from '@testing-library/react';

const { container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```
### Rerender Components.

```ts
import { render } from '@testing-library/react';

const { rerender, container } = render(<MyComponent />);
expect(container).toMatchSnapshot();
rerender(<MyComponent isArrowUp> </MyComponent>);
```


### Finding Elements

```ts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

render(<MyComponent />);
const button = screen.getByRole('button', { name: 'click me' });
expect(button).toBeInTheDocument();
```


### Using Queries. `screeen` [description](https://testing-library.com/docs/queries/about/)

```ts
import { render, screen } from 'react-test-renderer';

const { container } = render(<MyComponent />);
expect(screen.getByRole('button')).toBeInTheDocument();
```

### Simulating Events. `userEvent` [description](https://testing-library.com/docs/user-event/intro/)

```ts
import { render, screen } from 'react-test-renderer';
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

### Checking for HTML Attributes

```ts
import '@testing-library/jest-dom';

expect(view.container.firstChild).toHaveClass('Callout--context_warning');

```

### Using [baseElement](https://testing-library.com/docs/react-testing-library/api/)

```ts
import { render } from '@testing-library/react';

const view = render(<MyComponent />);
expect(view.baseElement).toMatchSnapshot();
```
