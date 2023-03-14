## Introduction
The `@testing-library family` of packages helps you test UI components in a user-centric way.

[Documentation](https://testing-library.com/)

For some functions for example `toBeInTheDocument()` needs to install [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/).


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
import { create } from 'react-test-renderer';

const renderer = create(<MyComponent />);
expect(renderer.toJSON()).toMatchSnapshot();
```

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const component = mount(<MyComponent />);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { create } from 'react-test-renderer';

const renderer = create(<MyComponent />);
expect(renderer.toJSON()).toMatchSnapshot();
```

#### Before ⭕:
```ts
import { shallow } from 'enzyme';

const component = shallow(<MyComponent />);
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { create } from 'react-test-renderer';

const renderer = create(<MyComponent />);
expect(renderer.toJSON()).toMatchSnapshot();
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
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { render, screen } from 'react-test-renderer';

const component = render(<MyComponent />);
expect(screen.getByText('value')).toBeDefined();
expect(component.asFragment()).toMatchSnapshot();
```

### Simulating Events. `fireEvent` [description](https://testing-library.com/docs/dom-testing-library/api-events/)

#### Before ⭕:
```ts
import { mount } from 'enzyme';

const component = mount(<MyComponent />);
component.find('input').simulate('change', { target: { value: 'Utrecht' } });
expect(component).toMatchSnapshot();
```

#### After ✅:
```ts
import { fireEvent, render, screen } from 'react-test-renderer';

const component = render(<MyComponent />);
fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'Utrecht' } });
expect(component.asFragment()).toMatchSnapshot();
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
import { render, fireEvent } from '@testing-library/react';

const handleClick = jest.fn();
render(<MyComponent onClick={handleClick} />);
const button = screen.getByRole('button', { name: 'click me' });
fireEvent.click(button);
expect(handleClick).toHaveBeenCalled();
```



