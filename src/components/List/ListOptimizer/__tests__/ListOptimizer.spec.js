import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ListOptimizer } from '../ListOptimizer';

describe('<ListOptimizer> that optimally renders list items', () => {
    it('should render small part of list due to small height of block', () => {
        const wrapper = render(
            <ListOptimizer defaultHeight={10} defaultWidth={10} rowCount={20}>
                {({ key, index, style }) => <span key={key} style={style}>{`Item ${index}`}</span>}
            </ListOptimizer>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render part of list items due to middle height of block', () => {
        const wrapper = render(
            <ListOptimizer defaultHeight={150} defaultWidth={10} rowCount={20}>
                {({ key, index, style }) => <span key={key} style={style}>{`Item ${index}`}</span>}
            </ListOptimizer>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render full list on maximum height', () => {
        const wrapper = render(
            <ListOptimizer defaultHeight={2000} defaultWidth={10} rowCount={20}>
                {({ key, index, style }) => <span key={key} style={style}>{`Item ${index}`}</span>}
            </ListOptimizer>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
