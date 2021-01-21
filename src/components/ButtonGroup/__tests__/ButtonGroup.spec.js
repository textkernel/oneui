import React from 'react';
import toJson from 'enzyme-to-json';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../../Buttons';
import { Dropdown } from '../../Dropdown';
import { ListItem } from '../../List/ListItem';

describe('<ButtonGroup> that renders a button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(
            <ButtonGroup>
                <Button>A button</Button>
                <Button>Another button</Button>
            </ButtonGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = mount(
            <ButtonGroup size="large" isBlock>
                <Button>A button</Button>
                <Button>Another button</Button>
            </ButtonGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should support mixed element types', () => {
        const wrapper = mount(
            <ButtonGroup size="large" isBlock>
                <Button>A button</Button>
                <Button href="#">An anchor</Button>
                <Dropdown button={<Button>A dropdown button</Button>} placement="bottom-end">
                    <ListItem key="some-key">A list item</ListItem>
                </Dropdown>
            </ButtonGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
