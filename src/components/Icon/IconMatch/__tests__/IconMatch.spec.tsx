import React from 'react';
import { render } from '@testing-library/react';
import { IconMatch } from '../IconMatch';

describe('<IconMatch>', () => {
    it('should render an Match! icon', () => {
        const view = render(<IconMatch />);
        expect(view.container).toMatchSnapshot();
    });
});
