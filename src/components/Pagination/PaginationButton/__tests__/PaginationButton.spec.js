import React from 'react';
import toJson from 'enzyme-to-json';
import PaginationButton from '../PaginationButton';

describe('<PaginationButton> that renders a page button', () => {
    it('should render a page button and test classes', () => {
        const wrapper = shallow(<PaginationButton data-page={1}>{1}</PaginationButton>);

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.setProps({
            isActive: true
        });

        expect(wrapper.hasClass('PaginationButton--isActive')).toBe(true);
        expect(wrapper.prop('aria-current')).toBe('page');
    });
});
