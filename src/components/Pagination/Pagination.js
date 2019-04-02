import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Pagination.scss';
import Button from '../Button';
import PaginationButton from './PaginationButton';

const { block, elem } = bem({
    name: 'Pagination',
    classnames: styles,
    propsToMods: ['align']
});

const defineRange = ({ currentPage, maxPages, totalPages }) => {
    const start = Math.max(2, Math.min(currentPage - 2, totalPages - maxPages + 2));
    const end = Math.min(totalPages, start + maxPages - 2);
    const range = new Array(end - start + 1).fill().map((_, i) => start + i);

    return range;
};

const Pagination = props => {
    const {
        align,
        currentPage,
        maxPages,
        totalPages,
        prevLabel,
        nextLabel,
        lastLabel,
        onClick,
        ...rest
    } = props;

    const currentPageCapped = Math.max(1, Math.min(currentPage, totalPages));
    const isPrevDisabled = currentPageCapped === 1;
    const isNextDisabled = currentPageCapped === totalPages;
    const range = defineRange({
        currentPage: currentPageCapped,
        maxPages,
        totalPages
    });

    const handleClick = e => {
        const {
            dataset: { page = null }
        } = e.target;

        if (!onClick || !page || page > totalPages) {
            return false;
        }

        return onClick(e, page);
    };

    return (
        <nav {...rest} {...block(props)} aria-label="pagination">
            {!!prevLabel && (
                <Button
                    {...elem('button', props)}
                    onClick={handleClick}
                    disabled={isPrevDisabled}
                    context="link"
                    data-page={currentPageCapped - 1}
                    aria-disabled={isPrevDisabled}
                >
                    &lsaquo; {prevLabel}
                </Button>
            )}
            <PaginationButton
                onClick={handleClick}
                isActive={currentPageCapped === 1}
                data-page={1}
            >
                {1}
            </PaginationButton>
            {range[0] > 2 && <div {...elem('gap', props)}>&hellip;</div>}
            {range.map(page => (
                <PaginationButton
                    onClick={handleClick}
                    isActive={page === currentPageCapped}
                    data-page={page}
                    key={`page_${page}`}
                >
                    {page}
                </PaginationButton>
            ))}
            {!!nextLabel && (
                <Button
                    {...elem('button', props)}
                    onClick={handleClick}
                    disabled={isNextDisabled}
                    context="link"
                    data-page={currentPageCapped + 1}
                    aria-disabled={isNextDisabled}
                >
                    {nextLabel} &rsaquo;
                </Button>
            )}
            {!!lastLabel && (
                <Button
                    {...elem('button', props)}
                    onClick={handleClick}
                    disabled={isNextDisabled}
                    context="link"
                    data-page={totalPages}
                    aria-disabled={isNextDisabled}
                >
                    {lastLabel} &raquo;
                </Button>
            )}
        </nav>
    );
};

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
    /** How the buttons should be aligned in the pagination container */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /** Current page number */
    currentPage: PropTypes.number,
    /** Max. number of pages to list (excluding prev / next) */
    maxPages: PropTypes.number,
    /** Total number of available pages */
    totalPages: PropTypes.number.isRequired,
    /** Label for 'Previous page' button (required for button to show) */
    prevLabel: PropTypes.string,
    /** Label for 'Next page' button (required for button to show) */
    nextLabel: PropTypes.string,
    /** Label for 'Last page' button (required for button to show) */
    lastLabel: PropTypes.string,
    /** Callback function on page / prev/ next click */
    onClick: PropTypes.func
};

Pagination.defaultProps = {
    align: 'center',
    currentPage: 1,
    maxPages: 10,
    prevLabel: null,
    nextLabel: null,
    lastLabel: null,
    onClick: null
};

export default Pagination;
