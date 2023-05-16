import React from 'react';
import { render } from '@testing-library/react';
import { MapWithGoogleLoader } from '..';
import '@testing-library/jest-dom';

describe('<MapWithGoogleLoader/> that loads google api and renders a Map', () => {
    it('should render with default props', () => {
        const view = render(<MapWithGoogleLoader apiKey="someKey" />);

        expect(view.container).toMatchSnapshot();
    });
});
