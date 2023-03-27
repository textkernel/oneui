import * as React from 'react';
import { bem } from '../../utils';
import styles from './Pagination.scss';
import { Button } from '../Buttons';
import { PaginationButton } from './PaginationButton';

export interface Props extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
    /** How the buttons should be aligned in the pagination container */
    align?: 'left' | 'center' | 'right';
    /** Current page number */
    currentPage?: number;
    /** Max. number of pages to list (excluding prev / next / last) Recommended to use even number */
    maxPageButtons?: number;
    /** Total number of available pages */
    totalPages: number;
    /** Label for 'Previous page' button (required for button to show) */
    prevLabel?: string;
    /** Label for 'Next page' button (required for button to show) */
    nextLabel?: string;
    /** Callback function on page / prev/ next click */
    onClick?: (e: Event, page: number) => void;
}

const { block, elem } = bem('Pagination', styles);

export const Pagination: React.FC<Props> = ({
    align = 'center',
    currentPage = 1,
    maxPageButtons = 10,
    totalPages,
    prevLabel,
    nextLabel,
    onClick,
    ...rest
}) => {
    const defineRange = () => {
        if (maxPageButtons === 1) {
            return [currentPage];
        }

        const showBefore = Math.floor((maxPageButtons - 1) / 2);
        const start = Math.max(
            2,
            Math.min(currentPage - showBefore, totalPages - maxPageButtons + 2)
        );
        const end = Math.min(totalPages, start + maxPageButtons - 2);
        const amount = end - start + 1;
        if (amount < 0) {
            return [];
        }

        return new Array(end - start + 1).fill(0).map((_, i) => start + i);
    };

    const showButton1 = maxPageButtons > 1;
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
    const range = defineRange();

    const handleClick = (e) => {
        const {
            dataset: { page = null },
        } = e.target;
        const pageNum = +page;

        if (!onClick || !pageNum || pageNum === currentPage) {
            return false;
        }

        return onClick(e, pageNum);
    };

    return (
        <nav {...rest} {...block({ align, ...rest })} aria-label="pagination">
            {!!prevLabel && (
                <Button
                    {...elem('button', { align })}
                    onClick={handleClick}
                    disabled={isPrevDisabled}
                    isLink
                    data-page={currentPage - 1}
                    aria-disabled={isPrevDisabled}
                >
                    {`\u2039 ${prevLabel}`}
                </Button>
            )}
            {showButton1 && (
                <>
                    <PaginationButton
                        onClick={handleClick}
                        isActive={currentPage === 1}
                        data-page={1}
                        key="page_1"
                    >
                        {1}
                    </PaginationButton>
                    {range[0] > 2 && <div {...elem('gap', { align })}>&hellip;</div>}
                </>
            )}
            {range.map((page) => (
                <PaginationButton
                    onClick={handleClick}
                    isActive={page === currentPage}
                    data-page={page}
                    key={`page_${page}`}
                >
                    {page}
                </PaginationButton>
            ))}
            {!!nextLabel && (
                <Button
                    {...elem('button', { align })}
                    onClick={handleClick}
                    disabled={isNextDisabled}
                    isLink
                    data-page={currentPage + 1}
                    aria-disabled={isNextDisabled}
                >
                    {`${nextLabel} \u203a`}
                </Button>
            )}
        </nav>
    );
};

Pagination.displayName = 'Pagination';
