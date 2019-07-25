import React from 'react';
import toJson from 'enzyme-to-json';
import Pagination from '../Pagination';

describe('<Pagination> that renders a pagination component', () => {
    const CURRENT_PAGE = 6;
    const MAX_BUTTONS = 8;
    const onClick = jest.fn();
    let wrapper;

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        wrapper = mount(
            <Pagination
                currentPage={CURRENT_PAGE}
                maxPageButtons={MAX_BUTTONS}
                totalPages={20}
                onClick={onClick}
                prevLabel="Previous"
                nextLabel="Next"
            />
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly with default props', () => {
        wrapper = mount(<Pagination totalPages={20} />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with all props', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('PaginationButton')).toHaveLength(MAX_BUTTONS);
    });
    describe('click behaviour', () => {
        it('should call onClick with correct paramas when a page button is clicked', () => {
            const e = {
                target: {
                    dataset: {
                        page: 3,
                    },
                },
            };

            wrapper.find('button[data-page=3]').simulate('click', e);

            expect(onClick).toHaveBeenCalledWith(expect.anything(), 3);
        });
        it('should not call onClick when current page button is clicked', () => {
            const e = {
                target: {
                    dataset: {
                        page: CURRENT_PAGE,
                    },
                },
            };

            wrapper.find(`button[data-page=${CURRENT_PAGE}]`).simulate('click', e);

            expect(onClick).not.toHaveBeenCalled();
        });
    });
    describe('data-page property of buttons', () => {
        it('should be set correctly on Prev button', () => {
            expect(
                wrapper
                    .findWhere(el => el.text() === `\u2039 Previous`)
                    .find('button')
                    .prop('data-page')
            ).toBe(CURRENT_PAGE - 1);
        });
        it('should be set correctly on Next button', () => {
            expect(
                wrapper
                    .findWhere(el => el.text() === `Next \u203a`)
                    .find('button')
                    .prop('data-page')
            ).toBe(CURRENT_PAGE + 1);
        });
        it('should be set correctly on "page 1" button', () => {
            expect(
                wrapper
                    .findWhere(el => el.text() === '1')
                    .find('button')
                    .prop('data-page')
            ).toBe(1);
        });
        it('should be set correctly on a page button', () => {
            const pageButton = wrapper.find('PaginationButton').at(2);

            expect(pageButton.text()).toBe('4');
            expect(pageButton.prop('data-page')).toBe(4);
        });
    });
    describe('edge cases', () => {
        it('should throw and error if curernt page is 0', () => {
            expect(() => mount(<Pagination totalPages={20} currentPage={0} />)).toThrow();
        });
        it('should throw and error if curernt page is too large', () => {
            expect(() => mount(<Pagination totalPages={20} currentPage={22} />)).toThrow();
        });
        it('should show only button for page 1 when maxPageButtons is 1 and current page is 1', () => {
            wrapper = mount(<Pagination currentPage={1} maxPageButtons={1} totalPages={20} />);
            const pageButtons = wrapper.find('PaginationButton');

            expect(pageButtons).toHaveLength(1);
            expect(pageButtons.at(0).prop('data-page')).toBe(1);
        });
        it('should show only button for CURRENT_PAGE when maxPageButtons is 1 and current page is not 1', () => {
            wrapper = mount(
                <Pagination currentPage={CURRENT_PAGE} maxPageButtons={1} totalPages={20} />
            );
            const pageButtons = wrapper.find('PaginationButton');

            expect(pageButtons).toHaveLength(1);
            expect(pageButtons.at(0).prop('data-page')).toBe(CURRENT_PAGE);
        });
        it('should show last page when it is the current page as well', () => {
            wrapper = mount(
                <Pagination
                    currentPage={CURRENT_PAGE}
                    maxPageButtons={5}
                    totalPages={CURRENT_PAGE}
                />
            );
            const pageButtons = wrapper.find('PaginationButton');

            expect(pageButtons).toHaveLength(5);
            expect(pageButtons.last().prop('data-page')).toBe(CURRENT_PAGE);
        });
    });
});
