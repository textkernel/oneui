import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Pagination } from '../Pagination';

describe('<Pagination> that renders a pagination component', () => {
    const CURRENT_PAGE = 6;
    const MAX_BUTTONS = 8;
    const onClick = jest.fn();

    let view: RenderResult;

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        view = render(
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

    it('should render correctly with default props', () => {
        view.rerender(<Pagination totalPages={20} />);

        expect(view.container).toMatchSnapshot();
    });

    it('should render correctly with all props', () => {
        const buttonLength = screen.getAllByRole('button').length - 2;

        expect(view.container).toMatchSnapshot();
        expect(buttonLength).toBe(MAX_BUTTONS);
    });

    describe('click behaviour', () => {
        it('should call onClick with correct paramas when a page button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(screen.getByRole('button', { name: '3' }));

            expect(onClick).toHaveBeenCalledWith(expect.anything(), 3);
        });

        it('should not call onClick when current page button is clicked', async () => {
            const user = userEvent.setup();
            await user.click(screen.getByRole('button', { name: `${CURRENT_PAGE}` }));

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('data-page property of buttons', () => {
        it('should be set correctly on Prev button', () => {
            expect(screen.getByRole('button', { name: '\u2039 Previous' })).toHaveAttribute(
                'data-page',
                `${CURRENT_PAGE - 1}`
            );
        });

        it('should be set correctly on Next button', () => {
            expect(screen.getByRole('button', { name: 'Next \u203a' })).toHaveAttribute(
                'data-page',
                `${CURRENT_PAGE + 1}`
            );
        });

        it('should be set correctly on "page 1" button', () => {
            expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('data-page', '1');
        });

        it('should be set correctly on a page button', () => {
            const pageButton = screen.getAllByRole('button')[3];

            expect(pageButton).toHaveAttribute('data-page', '4');
        });
    });

    describe('edge cases', () => {
        it('should not have pages when maxPageButtons is 0', () => {
            view.rerender(<Pagination currentPage={1} maxPageButtons={0} totalPages={20} />);

            expect(screen.queryAllByRole('button')).toHaveLength(0);
        });

        it('should show only button for page 1 when maxPageButtons is 1 and current page is 1', () => {
            view.rerender(<Pagination currentPage={1} maxPageButtons={1} totalPages={20} />);
            const pageButtons = screen.getAllByRole('button');

            expect(pageButtons).toHaveLength(1);
            expect(pageButtons[0]).toHaveAttribute('data-page', '1');
        });

        it('should show only button for CURRENT_PAGE when maxPageButtons is 1 and current page is not 1', () => {
            view.rerender(
                <Pagination currentPage={CURRENT_PAGE} maxPageButtons={1} totalPages={20} />
            );
            const pageButtons = screen.getAllByRole('button');

            expect(pageButtons).toHaveLength(1);
            expect(pageButtons[0]).toHaveAttribute('data-page', `${CURRENT_PAGE}`);
        });

        it('should show last page when it is the current page as well', () => {
            const pages = 5;
            view.rerender(
                <Pagination
                    currentPage={CURRENT_PAGE}
                    maxPageButtons={5}
                    totalPages={CURRENT_PAGE}
                />
            );
            const pageButtons = screen.getAllByRole('button');

            expect(pageButtons).toHaveLength(pages);
            expect(pageButtons[pages - 1]).toHaveAttribute('data-page', `${CURRENT_PAGE}`);
        });
    });
});
