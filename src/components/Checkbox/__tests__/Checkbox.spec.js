import React from 'react';
import toJson from 'enzyme-to-json';
import Checkbox from '../Checkbox';

describe('<Checkbox> that renders a checkbox', () => {
    it('should render default checkbox correctly', () => {
        const wrapper = shallow(<Checkbox id="c1">Check this out</Checkbox>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Checkbox id="c2" disabled>
                Useless checkbox
            </Checkbox>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
