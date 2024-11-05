import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Separator } from '../Separator';

describe('<Separator>', () => {
    it('should render Separator correctly when there is no title', () => {
        const view = render(<Separator />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('separator')).toHaveClass('Divider');
    });
    it('should render SectionTitle when title is given', () => {
        const view = render(<Separator>section title</Separator>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('separator')).toHaveClass('SectionTitle');
        expect(screen.getByRole('separator')).toHaveTextContent('section title');
    });
});
