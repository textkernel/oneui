import React from 'react';
import toJson from 'enzyme-to-json';
import { Toggle } from '../Toggle';

describe('<Toggle> that renders a toggle', () => {
    it('should render Toggle correctly with label', () => {
        const wrapper = mount(<Toggle id="1">Title is here</Toggle>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render Toggle correctly without label', () => {
        const wrapper = mount(<Toggle id="1-2" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should rendered disabled toggle correctly', () => {
        const wrapper = mount(
            <Toggle id="4" disabled>
                Cannot do anything =(
            </Toggle>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('input[disabled]')).toHaveLength(1);
        expect(wrapper.find('.Text--context_muted')).toHaveLength(1);
        expect(wrapper.find('.Toggle--disabled')).toHaveLength(1);
    });
});
