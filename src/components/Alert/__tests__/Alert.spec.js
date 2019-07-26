import React from 'react';
import toJson from 'enzyme-to-json';
import Alert from '../Alert';

describe('<Alert> that renders an alert', () => {
    it('should render default alert correctly', () => {
        const wrapper = shallow(<Alert>This is a basic alert without title or action</Alert>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Alert context="bad" title="Hey there">
                This is an alert with custom context and a title
            </Alert>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should have a button that works', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <Alert
                title="Hey there"
                action={{
                    label: 'Click me',
                    onClick,
                }}
            >
                This is an alert with custom context and a title
            </Alert>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        const buttonWrapper = wrapper.find('button');
        buttonWrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
