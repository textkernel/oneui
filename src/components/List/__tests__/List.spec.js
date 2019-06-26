import React from 'react';
import toJson from 'enzyme-to-json';
import ListItem from '../ListItem';
import List from '../List';

describe('List component', () => {
    let consoleError;

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render List correctly', () => {
        const wrapper = mount(
            <List>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
            </List>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('ul')).toHaveLength(1);
        expect(consoleError).not.toHaveBeenCalled();
    });
    it('should render correctly with ref', () => {
        const ref = React.createRef();
        mount(
            <List ref={ref}>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
            </List>
        );

        expect(ref.current.props.Component.displayName).toEqual('List');
    });
    it('should warn if children are not ListItem nor li', () => {
        mount(
            <List>
                <a href="/">Item 1</a>
                <a href="/">Item 2</a>
            </List>
        );
        expect(consoleError).toHaveBeenCalled();
    });
});
