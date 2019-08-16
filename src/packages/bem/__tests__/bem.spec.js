import React from 'react';
import { Button, ButtonStateless, List, Unstyled } from './dummy-components';

describe('BEM decorator', () => {
    describe('Decorate stateFUL class component', () => {
        it('should add proper class names to block and its elements', () => {
            const buttonWrapper = shallow(<Button />);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button')).toBe(true);
            expect(buttonLabel.hasClass('Button__label')).toBe(true);
        });

        it('should respect className property and pass it to the decorated element', () => {
            const buttonWrapper = shallow(<Button className="custom-class-name" />);
            expect(buttonWrapper.hasClass('Button')).toBe(true);
            expect(buttonWrapper.hasClass('custom-class-name')).toBe(true);
        });

        it('should pass all props to the decorarted component', () => {
            const ButtonInstance = <Button someCustom="property" someOtherCustom="thing" />;
            expect(ButtonInstance.props.someCustom).toBe('property');
            expect(ButtonInstance.props.someOtherCustom).toBe('thing');
        });

        it('should add proper class names based on propsToMods and passed props', () => {
            const buttonWrapper = shallow(<Button active context="error" size={2} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button--active')).toBe(true);
            expect(buttonWrapper.hasClass('Button--context_error')).toBe(true);
            expect(buttonWrapper.hasClass('Button--size_2')).toBe(true);
            expect(buttonIcon.hasClass('Button__icon--active')).toBe(true);
            expect(buttonIcon.hasClass('Button__icon--context_error')).toBe(true);
            expect(buttonIcon.hasClass('Button__icon--size_2')).toBe(true);
            expect(buttonLabel.hasClass('Button__label--active')).toBe(true);
            expect(buttonLabel.hasClass('Button__label--context_error')).toBe(true);
            expect(buttonLabel.hasClass('Button__label--size_2')).toBe(true);
        });

        it('should add "wildcard" class names for modifier with value (string or number)', () => {
            const buttonWrapper = shallow(<Button size={3} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button--size')).toBe(true);
            expect(buttonWrapper.hasClass('Button--context')).toBe(false);
            expect(buttonIcon.hasClass('Button__icon--size')).toBe(true);
            expect(buttonLabel.hasClass('Button__label--size')).toBe(false);
        });

        it("should not add a class name for boolean mod if mod's value is false", () => {
            const buttonWrapper = shallow(<Button size={3} active={false} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button--active')).toBe(false);
            expect(buttonIcon.hasClass('Button__icon--active')).toBe(false);
            expect(buttonLabel.hasClass('Button__label--active')).toBe(false);
        });

        it('should not add a class names if they are not listed in classnamesMap', () => {
            const buttonWrapper = shallow(<Button disabled />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button--disabled')).toBe(false);
            expect(buttonIcon.hasClass('Button__icon--disabled')).toBe(false);
            expect(buttonLabel.hasClass('Button__label--disabled')).toBe(false);
        });

        it('should add proper class names based on stateToMods and current state', () => {
            const buttonWrapper = shallow(<Button />);
            buttonWrapper.simulate('click');
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('Button--clicked')).toBe(true);
            expect(buttonIcon.hasClass('Button__icon--clicked')).toBe(true);
            expect(buttonLabel.hasClass('Button__label--clicked')).toBe(true);
        });
    });

    describe('Decorate stateLESS function component', () => {
        it('should add proper class names to block and its elements', () => {
            const buttonWrapper = shallow(<ButtonStateless />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('ButtonStateless')).toBe(true);
            expect(buttonLabel.hasClass('ButtonStateless__label')).toBe(true);
            expect(buttonIcon.hasClass('ButtonStateless__icon')).toBe(false);
        });

        it('should respect className property and pass it to the decorated element', () => {
            const buttonWrapper = shallow(<ButtonStateless className="custom-class-name" />);
            expect(buttonWrapper.hasClass('ButtonStateless')).toBe(true);
            expect(buttonWrapper.hasClass('custom-class-name')).toBe(true);
        });

        it('should respect className property and pass it to the decorated element also on children', () => {
            const listWrapper = shallow(
                <List>
                    <li className="custom-class-name" />
                </List>
            );
            const liElement = listWrapper.find('li');
            expect(liElement.hasClass('List__item')).toBe(true);
            expect(liElement.hasClass('custom-class-name')).toBe(true);
        });

        it('should pass all props to the decorated component', () => {
            const ButtonInstance = (
                <ButtonStateless someCustom="property" someOtherCustom="thing" />
            );
            expect(ButtonInstance.props.someCustom).toBe('property');
            expect(ButtonInstance.props.someOtherCustom).toBe('thing');
        });

        it('should add proper class names based on propsToMods and passed props', () => {
            const buttonWrapper = shallow(<ButtonStateless active context="error" size={2} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('ButtonStateless--active')).toBe(true);
            expect(buttonWrapper.hasClass('ButtonStateless--context_error')).toBe(true);
            expect(buttonWrapper.hasClass('ButtonStateless--size_2')).toBe(true);
            expect(buttonIcon.hasClass('ButtonStateless__icon--active')).toBe(true);
            expect(buttonIcon.hasClass('ButtonStateless__icon--context_error')).toBe(true);
            expect(buttonIcon.hasClass('ButtonStateless__icon--size_2')).toBe(true);
            expect(buttonLabel.hasClass('ButtonStateless__label--active')).toBe(true);
            expect(buttonLabel.hasClass('ButtonStateless__label--context_error')).toBe(true);
            expect(buttonLabel.hasClass('ButtonStateless__label--size_2')).toBe(true);
        });

        it('should add "wildcard" class names for modifier with value (string or number)', () => {
            const buttonWrapper = shallow(<ButtonStateless size={2} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('ButtonStateless--context')).toBe(false);
            expect(buttonWrapper.hasClass('ButtonStateless--size')).toBe(true);
            expect(buttonIcon.hasClass('ButtonStateless__icon--size')).toBe(true);
            expect(buttonLabel.hasClass('ButtonStateless__label--size')).toBe(false);
        });

        it("should not add a class name for boolean mod if mod's value is false", () => {
            const buttonWrapper = shallow(<ButtonStateless size={3} active={false} />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('ButtonStateless--active')).toBe(false);
            expect(buttonIcon.hasClass('ButtonStateless__icon--active')).toBe(false);
            expect(buttonLabel.hasClass('ButtonStateless__label--active')).toBe(false);
        });

        it('should not add a class names if they are not listed in classnames map', () => {
            const buttonWrapper = shallow(<ButtonStateless disabled />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('ButtonStateless--disabled')).toBe(false);
            expect(buttonIcon.hasClass('ButtonStateless__icon--disabled')).toBe(false);
            expect(buttonLabel.hasClass('ButtonStateless__label--disabled')).toBe(false);
        });

        it('should not add classnames if none is applicable', () => {
            const wrapper = shallow(
                <Unstyled>
                    <p>some text</p>
                </Unstyled>
            );
            expect(wrapper.find('div').props().className).toBe(undefined);
            expect(wrapper.find('p').props().className).toBe(undefined);
        });
    });
});
