import React from 'react';
import { create } from 'react-test-renderer';
import { Chip } from '../Chip';

describe('<Chip> that renders a pill shaped chip', () => {
    it('should render correctly', () => {
        const wrapper = create(<Chip>some text</Chip>);
        expect(wrapper).toMatchSnapshot();
    });
});
