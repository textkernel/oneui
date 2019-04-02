import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Pagination } from '@textkernel/oneui';

storiesOf('Pagination', module)
    .addDecorator(withKnobs)
    .add('Pagination', () => (
        <Pagination
            align={select('Button alignment', ['left', 'center', 'right'], 'center')}
            currentPage={number('Current page number', 1)}
            maxPages={number('Max. number of pages to list', 5)}
            totalPages={number('Total number of pages', 25)}
            onClick={(e, page) => {
                console.log(`Requested page ${page}`);
            }}
            prevLabel={text('Previous label', 'Previous')}
            nextLabel={text('Next label', 'Next')}
            lastLabel={text('Last label', 'Last')}
        />
    ));
