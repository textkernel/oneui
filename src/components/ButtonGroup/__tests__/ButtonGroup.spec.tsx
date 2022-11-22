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
                <Dropdown
                    button={<Button>A dropdown button</Button>}
                    placement="bottom-end"
                    onChange={() => {}}
                >
                    <ListItem key="some-key">A list item</ListItem>
                </Dropdown>
            </ButtonGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with conditional JSX', () => {
        const condition = false;
        const wrapper = mount(
            <ButtonGroup>
                <Button>A button</Button>
                {condition ? <Button href="#">An anchor</Button> : null}
                <>{condition && <Button>A button</Button>}</>
            </ButtonGroup>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.text()).not.toContain('false');
    });

    it('should pass main props, but not add styles if there is only 1 child', () => {
        const wrapper = mount(
            <ButtonGroup context="warning" size="small" isBlock>
                <Button>A button</Button>
            </ButtonGroup>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Button').prop('className')).toBe(undefined);
        expect(wrapper.find('Button').prop('context')).toBe('warning');
        expect(wrapper.find('Button').prop('size')).toBe('small');
        expect(wrapper.find('Button').prop('isBlock')).toBeTruthy();
    });
});
