import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Separator } from '../Separator';

describe('<Separator>', () => {
    it('should render Separator correctly when there is no title', () => {
        const view = render(<Separator />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('listitem')).toHaveClass('Divider');
    });
    it('should render SectionTitle when title is given', () => {
        const view = render(<Separator title="section title" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('listitem')).toHaveClass('SectionTitle');
        expect(screen.getByRole('listitem')).toHaveTextContent('section title');
    });
});
