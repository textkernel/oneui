## Introduction
The `@testing-library family` of packages helps you test UI components in a user-centric way.

[Documentation](https://testing-library.com/)


[Migrate from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme)

#### Before :red_circle:
```ts
import { render } from 'enzyme';
const component = render();
expect(component).toMatchSnapshot();
```

#### After :green_circle:
```ts
import { create } from 'react-test-renderer';
const renderer = create();
expect(renderer.toJSON()).toMatchSnapshot();
```

#### Before :red_circle:
```ts
import { mount } from 'enzyme';
const component = mount();
expect(component).toMatchSnapshot();
```

#### After :green_circle:
```ts
import { create } from 'react-test-renderer';
const renderer = create();
expect(renderer.toJSON()).toMatchSnapshot();
```

#### Before :red_circle:
```ts
import { shallow } from 'enzyme';
const component = shallow();
expect(component).toMatchSnapshot();
```

#### After :green_circle:
```ts
import { create } from 'react-test-renderer';
const renderer = create();
expect(renderer.toJSON()).toMatchSnapshot();
```

### Using Queries. `screeen` [description](https://testing-library.com/docs/queries/about/)

#### Before :red_circle:
```ts
import { shallow } from 'enzyme';
const component = shallow();
expect(component).toMatchSnapshot();
```

#### After :green_circle:
```ts
import { render, screen } from 'react-test-renderer';
render();
expect(screen.getByText('value')).toBeDefined();
expect(component.asFragment()).toMatchSnapshot();
```

### Firing Events. `fireEvent` [description](https://testing-library.com/docs/dom-testing-library/api-events/)

#### Before :red_circle:
```ts
import { mount } from 'enzyme';
const component = mount();
component.find('input').simulate('change', { target: { value: 'Utrecht' } });
expect(component).toMatchSnapshot();
```

#### After :green_circle:
```ts
import { fireEvent, render, screen } from 'react-test-renderer';
const component = render();
fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'Utrecht' } });
expect(component.asFragment()).toMatchSnapshot();
```



