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
    describe('click behaviour', () => {
        it('should call onClick with correct paramas when a page button is clicked', () => {
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
        it('should not call onClick when current page button is clicked', () => {
            const e = {
                target: {
                    dataset: {
                        page: CURRENT_PAGE
                    }
                }
            };

            wrapper.find(`[data-page=${CURRENT_PAGE}]`).simulate('click', e);

            expect(onClick).not.toHaveBeenCalled();
        });
    });
    describe('data-page property of buttons', () => {
        it('should be set correctly on First', () => {
            expect(
                wrapper
                    .find('Button')
                    .at(0)
                    .prop('data-page')
            ).toBe(1);
        });
        it('should be set correctly on Prev button', () => {
            expect(
                wrapper
                    .find('Button')
                    .at(1)
                    .prop('data-page')
            ).toBe(CURRENT_PAGE - 1);
        });
        it('should be set correctly on Next button', () => {
            expect(
                wrapper
                    .find('Button')
                    .at(2)
                    .prop('data-page')
            ).toBe(CURRENT_PAGE + 1);
        });
        it('should be set correctly on Last button', () => {
            expect(
                wrapper
                    .find('Button')
                    .at(3)
                    .prop('data-page')
            ).toBe(20);
        });
        it('should be set correctly on "page 1" button', () => {
            expect(
                wrapper
                    .find('PaginationButton')
                    .at(0)
                    .prop('data-page')
            ).toBe(1);
        });
        it('should be set correctly on a page button', () => {
            const pageButton = wrapper.find('PaginationButton').at(2);

            expect(pageButton.prop('children')).toBe(4);
            expect(pageButton.prop('data-page')).toBe(4);
        });
    });
});
