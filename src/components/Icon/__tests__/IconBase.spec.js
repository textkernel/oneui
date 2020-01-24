import React from 'react';
import toJson from 'enzyme-to-json';
import { IconBase } from '../IconBase';

describe('<IconBase> that renders an SVG wrapper with all options included', () => {
    it('should render a default icon', () => {
        const wrapper = shallow(
            <IconBase
                viewBox="0 0 100 100"
                title="Icon base"
                size={15}
                margin="right"
                context="brand"
            >
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should correct negative sizes', () => {
        const wrapper = shallow(
            <IconBase viewBox="0 0 100 100" size={-1}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.find('svg')).not.toContain('title');
        expect(wrapper.find('svg').prop('style').height).toBe(0);
        expect(wrapper.find('svg').prop('style').width).toBe(0);
    });
    it('should not apply proportional styles if no size provided', () => {
        const wrapper = shallow(
            <IconBase viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.find('svg').prop('style').width).toBe('1em');
    });
    it('should apply proportional styles if size is provided', () => {
        const mockSize = 48;
        const wrapper = shallow(
            <IconBase viewBox="0 0 100 100" size={mockSize}>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.find('svg').prop('style').height).toBe(mockSize);
        expect(wrapper.find('svg').prop('style').width).toBe(mockSize);
    });
    it('should apply hight only to styles if size is provided with preserveAspectRatio', () => {
        const mockSize = 48;
        const wrapper = shallow(
            <IconBase viewBox="0 0 100 100" size={mockSize} preserveAspectRatio>
                <circle cx="50" cy="50" r="50" />
            </IconBase>
        );
        expect(wrapper.find('svg').prop('style').height).toBe(mockSize);
        expect(wrapper.find('svg').prop('style').width).toBe('auto');
    });
});
