import React from 'react';
import bem from '../bem';
import { Button, ButtonStateless } from './dummy-components';

describe('BEM decorator', () => {
    describe('Decorate stateFUL class component', () => {
        it('should add proper class names to block and its elements', () => {
            const classnamesMap = {
                Button: 'button',
                Button__label: 'button__label'
            };
            const BEMButton = bem(classnamesMap)(Button);
            const buttonWrapper = shallow(<BEMButton />);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('button')).toBe(true);
            expect(buttonLabel.hasClass('button__label')).toBe(true);
        });

        it('should respect className property and pass it to the decorated element', () => {
            const classnamesMap = {
                Button: 'button'
            };
            const BEMButton = bem(classnamesMap)(Button);
            const buttonWrapper = shallow(<BEMButton className="custom-class-name" />);
            expect(buttonWrapper.hasClass('button')).toBe(true);
            expect(buttonWrapper.hasClass('custom-class-name')).toBe(true);
        });

        it('should pass all props to the decorarted component', () => {
            const BEMButton = bem({})(Button);
            const BEMButtonInstance = <BEMButton someCustom="property" someOtherCustom="thing" />;
            expect(BEMButtonInstance.props.someCustom).toBe('property');
            expect(BEMButtonInstance.props.someOtherCustom).toBe('thing');
        });

        it('should add proper class names based on propsToMods and passed props', () => {
            const classnamesMap = {
                Button: 'button',
                'Button--active': 'button--active',
                'Button--context_error': 'button--context_error',
                Button__icon: 'button__icon',
                'Button__icon--active': 'button__icon--active',
                'Button__icon--context_error': 'button__icon--context_error',
                Button__label: 'button__label',
                'Button__label--active': 'button__label--active',
                'Button__label--context_error': 'button__label--context_error'
            };
            const BEMButton = bem(classnamesMap)(Button);
            const buttonWrapper = shallow(<BEMButton active context='error' />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('button--active')).toBe(true);
            expect(buttonWrapper.hasClass('button--context_error')).toBe(true);
            expect(buttonIcon.hasClass('button__icon--active')).toBe(true);
            expect(buttonIcon.hasClass('button__icon--context_error')).toBe(true);
            expect(buttonLabel.hasClass('button__label--active')).toBe(true);
            expect(buttonLabel.hasClass('button__label--context_error')).toBe(true);
        });

        it('should not add a class names if they are not listed in classnamesMap', () => {
            const classnamesMap = {
                Button: 'button'
            };
            const BEMButton = bem(classnamesMap)(Button);
            const buttonWrapper = shallow(<BEMButton active />);
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('button--active')).toBe(false);
            expect(buttonIcon.hasClass('button__icon--active')).toBe(false);
            expect(buttonLabel.hasClass('button__label--active')).toBe(false);
        });

        it('should add proper class names based on stateToMods and current state', () => {
            const classnamesMap = {
                Button: 'button',
                'Button--clicked': 'button--clicked',
                Button__icon: 'button__icon',
                'Button__icon--clicked': 'button__icon--clicked',
                Button__label: 'button__label',
                'Button__label--clicked': 'button__label--clicked'
            };
            const BEMButton = bem(classnamesMap)(Button);
            const buttonWrapper = shallow(<BEMButton />);
            buttonWrapper.simulate('click');
            const buttonIcon = buttonWrapper.childAt(0);
            const buttonLabel = buttonWrapper.childAt(1);
            expect(buttonWrapper.hasClass('button--clicked')).toBe(true);
            expect(buttonIcon.hasClass('button__icon--clicked')).toBe(true);
            expect(buttonLabel.hasClass('button__label--clicked')).toBe(true);
        });
    });

    describe('Decorate stateLESS function component', () => {
        it('should add proper class names to block and its elements', () => {
            const classnamesMap = {
                ButtonStateless: 'stateless-button',
                ButtonStateless__label: 'stateless-button__label'
            };
            const BEMButtonStateless = bem(classnamesMap)(ButtonStateless);
            const buttonWrapper = shallow(<BEMButtonStateless />);
            const button = buttonWrapper.dive().find('button');
            const buttonIcon = button.childAt(0);
            const buttonLabel = button.childAt(1);
            expect(button.hasClass('stateless-button')).toBe(true);
            expect(buttonLabel.hasClass('stateless-button__label')).toBe(true);
            expect(buttonIcon.hasClass('stateless-button__icon')).toBe(false);
        });

        it('should respect className property and pass it to the decorated element', () => {
            const classnamesMap = {
                ButtonStateless: 'stateless-button'
            };
            const BEMButtonStateless = bem(classnamesMap)(ButtonStateless);
            const buttonWrapper = shallow(<BEMButtonStateless className="custom-class-name" />);
            const button = buttonWrapper.dive().find('button');
            expect(button.hasClass('stateless-button')).toBe(true);
            expect(button.hasClass('custom-class-name')).toBe(true);
        });

        it('should pass all props to the decorarted component', () => {
            const BEMButtonStateless = bem({})(ButtonStateless);
            const BEMButtonInstance = (
                <BEMButtonStateless someCustom="property" someOtherCustom="thing" />
            );
            expect(BEMButtonInstance.props.someCustom).toBe('property');
            expect(BEMButtonInstance.props.someOtherCustom).toBe('thing');
        });

        it('should add proper class names based on propsToMods and passed props', () => {
            const classnamesMap = {
                ButtonStateless: 'stateless-button',
                'ButtonStateless--active': 'stateless-button--active',
                'ButtonStateless--context_error': 'stateless-button--context_error',
                ButtonStateless__icon: 'stateless-button__icon',
                'ButtonStateless__icon--active': 'stateless-button__icon--active',
                'ButtonStateless__icon--context_error': 'stateless-button__icon--context_error',
                ButtonStateless__label: 'stateless-button__label',
                'ButtonStateless__label--active': 'stateless-button__label--active',
                'ButtonStateless__label--context_error': 'stateless-button__label--context_error'
            };
            const BEMButtonStateless = bem(classnamesMap)(ButtonStateless);
            const buttonWrapper = shallow(<BEMButtonStateless active context='error' />);
            const button = buttonWrapper.dive().find('button');
            const buttonIcon = button.childAt(0);
            const buttonLabel = button.childAt(1);
            console.log('button', button.debug());
            expect(button.hasClass('stateless-button--active')).toBe(true);
            expect(button.hasClass('stateless-button--context_error')).toBe(true);
            expect(buttonIcon.hasClass('stateless-button__icon--active')).toBe(true);
            expect(buttonIcon.hasClass('stateless-button__icon--context_error')).toBe(true);
            expect(buttonLabel.hasClass('stateless-button__label--active')).toBe(true);
            expect(buttonLabel.hasClass('stateless-button__label--context_error')).toBe(true);
        });

        it('should not add a class names if they are not listed in classnames map', () => {
            const classnamesMap = {
                ButtonStateless: 'stateless-button'
            };
            const BEMButtonStateless = bem(classnamesMap)(ButtonStateless);
            const buttonWrapper = shallow(<BEMButtonStateless active />);
            const button = buttonWrapper.dive().find('button');
            const buttonIcon = button.childAt(0);
            const buttonLabel = button.childAt(1);
            expect(button.hasClass('stateless-button--active')).toBe(false);
            expect(buttonIcon.hasClass('stateless-button__icon--active')).toBe(false);
            expect(buttonLabel.hasClass('stateless-button__label--active')).toBe(false);
        });
    });
});
