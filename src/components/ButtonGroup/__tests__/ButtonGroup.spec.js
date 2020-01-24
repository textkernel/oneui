import React from 'react';
import toJson from 'enzyme-to-json';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../../Buttons';

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
});
