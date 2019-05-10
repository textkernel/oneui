import React, { useCallback } from 'react';
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

const Pagination = props => {
    const {
        align,
        currentPage,
        maxPageButtons,
        totalPages,
        prevLabel,
        nextLabel,
        onClick,
        ...rest
    } = props;

    if (currentPage < 1 || currentPage > totalPages) {
        throw new Error(
            'Pagination error: current page should be at least 1 and no more then total available pages.'
        );
    }

    const defineRange = () => {
        if (maxPageButtons === 1 && currentPage !== 1) {
            return [currentPage];
        }

        const showBefore = Math.floor((maxPageButtons - 1) / 2);
        const start = Math.max(
            2,
            Math.min(currentPage - showBefore, totalPages - maxPageButtons + 2)
        );
        const end = Math.min(totalPages, start + maxPageButtons - 2);
        const range = new Array(end - start + 1).fill().map((_, i) => start + i);

        return range;
    };

    const showButton1 = maxPageButtons > 1 || currentPage === 1;
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;
    const range = defineRange();

    const handleClick = useCallback(e => {
        const {
            dataset: { page = null }
        } = e.target;
        const pageNum = +page;

        if (!onClick || !pageNum || pageNum === currentPage) {
            return false;
        }

        return onClick(e, pageNum);
    });

    return (
        <nav {...rest} {...block(props)} aria-label="pagination">
            {!!prevLabel && (
                <Button
                    {...elem('button', props)}
                    onClick={handleClick}
                    disabled={isPrevDisabled}
                    context="link"
                    data-page={currentPage - 1}
                    aria-disabled={isPrevDisabled}
                >
                    {`\u2039 ${prevLabel}`}
                </Button>
            )}
            {showButton1 && (
                <React.Fragment>
                    <PaginationButton
                        onClick={handleClick}
                        isActive={currentPage === 1}
                        data-page={1}
                        key="page_1"
                    >
                        {1}
                    </PaginationButton>
                    {range[0] > 2 && <div {...elem('gap', props)}>&hellip;</div>}
                </React.Fragment>
            )}
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
            {!!nextLabel && (
                <Button
                    {...elem('button', props)}
                    onClick={handleClick}
                    disabled={isNextDisabled}
                    context="link"
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

Pagination.propTypes = {
    /** How the buttons should be aligned in the pagination container */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /** Current page number */
    currentPage: PropTypes.number,
    /** Max. number of pages to list (excluding prev / next / last) Recommended to use even number */
    maxPageButtons: PropTypes.number,
    /** Total number of available pages */
    totalPages: PropTypes.number.isRequired,
    /** Label for 'Previous page' button (required for button to show) */
    prevLabel: PropTypes.string,
    /** Label for 'Next page' button (required for button to show) */
    nextLabel: PropTypes.string,
    /** Callback function on page / prev/ next click */
    onClick: PropTypes.func
};

Pagination.defaultProps = {
    align: 'center',
    currentPage: 1,
    maxPageButtons: 10,
    prevLabel: null,
    nextLabel: null,
    onClick: null
};

export default Pagination;
