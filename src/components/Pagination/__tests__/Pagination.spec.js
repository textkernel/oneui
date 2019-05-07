import React from 'react';
import toJson from 'enzyme-to-json';
import Pagination from '../Pagination';

describe('<Pagination> that renders a pagination component', () => {
    const CURRENT_PAGE = 6;
    const onClick = jest.fn();
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Pagination
                currentPage={CURRENT_PAGE}
                maxPageButtons={8}
                totalPages={20}
                onClick={onClick}
                prevLabel="Previous"
                nextLabel="Next"
                firstLabel="First"
                lastLabel="Last"
            />
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly with default props', () => {
        wrapper = shallow(<Pagination totalPages={20} />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with all props', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onClick with correct paramas', () => {
        const e = {
            target: {
                dataset: {
                    page: 3
                }
            }
        };

        wrapper.find('[data-page=3]').simulate('click', e);

        expect(onClick).toHaveBeenCalledWith(e, 3);
    });
    it('should set data property on First button correctly', () => {
        expect(
            wrapper
                .find('Button')
                .at(0)
                .prop('data-page')
        ).toBe(1);
    });
    it('should set data property on Prev button correctly', () => {
        expect(
            wrapper
                .find('Button')
                .at(1)
                .prop('data-page')
        ).toBe(CURRENT_PAGE - 1);
    });
    it('should set data property on Next button correctly', () => {
        expect(
            wrapper
                .find('Button')
                .at(2)
                .prop('data-page')
        ).toBe(CURRENT_PAGE + 1);
    });
    it('should set data property on Last button correctly', () => {
        expect(
            wrapper
                .find('Button')
                .at(3)
                .prop('data-page')
        ).toBe(20);
    });
    it('should set data property on "page 1" button correctly', () => {
        expect(
            wrapper
                .find('PaginationButton')
                .at(0)
                .prop('data-page')
        ).toBe(1);
    });
    it('should set data property on a page button correctly', () => {
        const pageButton = wrapper.find('PaginationButton').at(2);

        expect(pageButton.prop('children')).toBe(4);
        expect(pageButton.prop('data-page')).toBe(4);
    });
});
