import { mount as _mount, shallow as _shallow, render as _render } from 'enzyme'


// Make Enzyme functions available in all test files without importing
declare global {
    const mount: typeof _mount;
    const shallow: typeof _shallow;
    const render: typeof  _render;
}
