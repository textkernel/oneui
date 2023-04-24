## Introduction
The `@testing-library family` of packages helps you test UI components in a user-centric way.

[Documentation](https://testing-library.com/)

For some functions for example `toBeInTheDocument()` needs to install [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/).

## Useful links
[Common mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

[Migrate from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme)

### Rendering Components

#### Before ⭕:
```ts
import { render } from 'enzyme';

const component = render(<MyComponent />);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render } from '@testing-library/react';

const { asFragment } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const component = mount(<MyComponent />);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render } from '@testing-library/react';

const { asFragment } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

#### Before ⭕:
```ts
import { shallow } from 'enzyme';

const component = shallow(<MyComponent />);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render } from '@testing-library/react';

const { asFragment } = render(<MyComponent />);
expect(container).toMatchSnapshot();
```

### Finding Elements

#### Before ⭕:
```ts
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

const wrapper = shallow(<MyComponent />);
const button = wrapper.find('button');
expect(button.text()).toEqual('Click me!');

```

#### After ✅:
```ts
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

render(<MyComponent />);
const button = screen.getByRole('button', { name: 'click me' });
expect(button).toBeInTheDocument();
```


### Using Queries. `screeen` [description](https://testing-library.com/docs/queries/about/)

#### Before ⭕:
```ts
import { shallow } from 'enzyme';

const component = shallow(<MyComponent />);
expect(wrapper.find('value')).toHaveLength(1);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render, screen } from 'react-test-renderer';

const { asFragment } = render(<MyComponent />);
expect(screen.getByRole('value')).toBeInTheDocument();
expect(container).toMatchSnapshot();
```

### Simulating Events. `userEvent` [description](https://testing-library.com/docs/user-event/intro/)

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const component = mount(<MyComponent />);
component.find('input').simulate('change', { target: { value: 'Utrecht' } });
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render, screen } from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

const { asFragment } = render(<MyComponent />);
const user = userEvent.setup();
await user.type(screen.getByDisplayValue(''), 'Utrecht');
expect(container).toMatchSnapshot();
```

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const handleClick = jest.fn();
const wrapper = mount(<MyComponent onClick={handleClick} />);
wrapper.find('button').simulate('click');
expect(handleClick).toHaveBeenCalled();
```

#### After ✅:
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

### Rerender Components.

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
wrapper.setProps({ isArrowUp: true });
```

#### After ✅:
```ts
import { render } from 'react-test-renderer';

const { rerender, asFragment } = render(<MyComponent />);
expect(container).toMatchSnapshot();
rerender(<MyComponent isArrowUp> </MyComponent>);
```



