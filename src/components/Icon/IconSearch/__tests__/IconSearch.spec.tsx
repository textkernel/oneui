import React from 'react';
import { render } from '@testing-library/react';
import { IconSearch } from '../IconSearch';

describe('<IconSearch>', () => {
    it('should render a Search! icon', () => {
        const view = render(<IconSearch />);
        expect(view.container).toMatchSnapshot();
    });
});
