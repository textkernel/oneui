import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListActions } from '../ListActions';

describe('<ListActions>', () => {
    it('should render ListActions', () => {
        const view = render(<ListActions>action</ListActions>);
        expect(view.container).toMatchSnapshot();

        expect(screen.getByText('action')).toBeInTheDocument();
    });
});
