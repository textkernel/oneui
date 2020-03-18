import React from 'react';
import toJson from 'enzyme-to-json';
import { Field } from '../Field';

describe('<Field> that renders an input field', () => {
    it('should render a component with a label properly', () => {
        const labelText = 'labelText';
        const wrapper = shallow(
            <Field labelText={labelText} className="customClass">
                <input />
            </Field>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('p').text()).toEqual(labelText);
    });
});
