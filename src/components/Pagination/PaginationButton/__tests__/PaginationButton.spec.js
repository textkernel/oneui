import React from 'react';
import toJson from 'enzyme-to-json';
import PaginationButton from '../PaginationButton';

describe('<PaginationButton> that renders a page button', () => {
    it('should render correctly with default props', () => {
        const wrapper = shallow(<PaginationButton data-page={1}>{1}</PaginationButton>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add correct classes for active state', () => {
        const wrapper = shallow(
            <PaginationButton data-page={1} isActive>
                {1}
            </PaginationButton>
        );

        expect(wrapper.hasClass('PaginationButton--isActive')).toBe(true);
        expect(wrapper.prop('aria-current')).toBe('page');
    });
});
