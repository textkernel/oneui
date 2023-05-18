import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapWithGoogleLoader } from '..';
import '@testing-library/jest-dom';

describe('<MapWithGoogleLoader/> that loads google api and renders a Map', () => {
    it('should render with default props', () => {
        // @ts-ignore
        const view = render(<MapWithGoogleLoader apiKey="someKey" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
