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
    const start = Math.max(2, currentPage);
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
        onClick,
        ...rest
    } = props;

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
    const range = defineRange({
        currentPage,
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
            <Button
                {...elem('button', props)}
                onClick={handleClick}
                disabled={isPrevDisabled}
                context="link"
                data-page={currentPage - 1}
                aria-disabled={isPrevDisabled}
            >
                &laquo; {prevLabel}
            </Button>
            <PaginationButton onClick={handleClick} isActive={currentPage === 1} data-page={1}>
                {1}
            </PaginationButton>
            {currentPage > 1 && <div {...elem('gap', props)}>...</div>}
            {range.map(page => (
                <PaginationButton
                    onClick={handleClick}
                    isActive={page === currentPage}
                    data-page={page}
                    key={`page_${page}`}
                >
                    {page}
                </PaginationButton>
            ))}
            <Button
                {...elem('button', props)}
                onClick={handleClick}
                disabled={isNextDisabled}
                context="link"
                data-page={currentPage + 1}
                aria-disabled={isNextDisabled}
            >
                {nextLabel} &raquo;
            </Button>
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
    /** Alternative label for Previous button */
    prevLabel: PropTypes.string,
    /** Alternative label for Next button */
    nextLabel: PropTypes.string,
    /** Callback function on page / prev/ next click */
    onClick: PropTypes.func
};

Pagination.defaultProps = {
    align: 'center',
    currentPage: 1,
    maxPages: 10,
    prevLabel: 'Previous',
    nextLabel: 'Next',
    onClick: null
};

export default Pagination;
