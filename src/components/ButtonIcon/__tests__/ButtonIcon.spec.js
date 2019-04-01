import React from 'react';
import toJson from 'enzyme-to-json';
import ButtonIcon from '../ButtonIcon';

describe('<ButtonIcon> that renders a button icon', () => {
    it('should render a default progress bar correctly', () => {
        const wrapper = shallow(
            <ButtonIcon>
                <i className="far fa-bookmark" />
            </ButtonIcon>
        );
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({
            isActive: true
        });

        expect(wrapper.hasClass('ButtonIcon--isActive')).toBe(true);

        wrapper.setProps({
            context: 'brand'
        });

        expect(wrapper.hasClass('ButtonIcon--context_brand')).toBe(true);
    });
});
