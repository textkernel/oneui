import React from 'react';
import toJson from 'enzyme-to-json';
import ListItem from '../ListItem';
import List from '../List';

describe('List component', () => {
    it('should render List correctly', () => {
        const wrapper = mount(
            <List>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
            </List>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ul')).toHaveLength(1);
    });
    it('should render with ordered list correctly', () => {
        const wrapper = mount(
            <List Component="ol">
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
            </List>
        );

        expect(wrapper.find('ol')).toHaveLength(1);
    });
});
