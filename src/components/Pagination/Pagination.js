import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Pagination.scss';
import Button from '../Button';
import PaginationButton from './PaginationButton';

const { block, elem } = bem({
    name: 'Pagination',
    classnames: styles,
    propsToMods: []
});

const defineRange = ({ currentPage, maxPages, totalPages }) => {
    const start = Math.max(2, currentPage);
    const end = Math.min(totalPages, start + maxPages - 2);

    const pages = [];

    for (let i = start; i <= end; i += 1) {
        pages.push(i);
    }

    return pages;
};

const Pagination = props => {
    const { currentPage, maxPages, totalPages, prevLabel, nextLabel, onClick, ...rest } = props;

    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
    const range = defineRange({
        currentPage,
        maxPages,
        totalPages
    });

    const handleClick = e => {
        const { dataset } = e.target;

        if (!onClick || !dataset.page || dataset.page > totalPages) {
            return null;
        }

        return onClick(e, dataset.page);
    };

    return (
        <div {...rest} {...block(props)}>
            <Button
                {...elem('button', props)}
                onClick={handleClick}
                disabled={isPrevDisabled}
                context="link"
                data-page={currentPage - 1}
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
            >
                {nextLabel} &raquo;
            </Button>
        </div>
    );
};

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
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
    currentPage: 1,
    maxPages: 10,
    prevLabel: 'Previous',
    nextLabel: 'Next',
    onClick: null
};

export default Pagination;
