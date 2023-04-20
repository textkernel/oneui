import React from 'react';
import { render } from '@testing-library/react';
import { IconHarvester } from '../IconHarvester';

describe('<IconHarvester>', () => {
    it('should render an Harvester icon', () => {
        const view = render(<IconHarvester />);
        expect(view.asFragment()).toMatchSnapshot();
    });
});
