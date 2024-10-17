import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from '../ButtonGroup';
import { Button } from '../../Buttons';
import {
    DropdownContent,
    DropdownPortal,
    DropdownRoot,
    DropdownTrigger,
    SingleSelectItem,
} from '../../Dropdown';

describe('<ButtonGroup> that renders a button', () => {
    it('should render default button correctly', () => {
        const view = render(
            <ButtonGroup>
                <Button key="a">A button</Button>
                <Button key="b">Another button</Button>
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
        const button = screen.getAllByRole('button');
        expect(button[0]).toHaveClass('ButtonGroup__button--first');
        expect(button[0]).not.toHaveClass('ButtonGroup__button--last');
        expect(button[1]).not.toHaveClass('ButtonGroup__button--first');
        expect(button[1]).toHaveClass('ButtonGroup__button--last');
    });

    it('should add classes when props are changed', () => {
        const view = render(
            <ButtonGroup size="large" isBlock>
                <Button key="a">A button</Button>
                <Button key="b">Another button</Button>
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
        const button = screen.getAllByRole('button');
        expect(button[0]).toHaveClass('Button--size_large');
        expect(button[0]).toHaveClass('ButtonGroup__button--isBlock');
        expect(button[1]).toHaveClass('Button--size_large');
        expect(button[1]).toHaveClass('ButtonGroup__button--isBlock');
    });

    it('should support mixed element types', () => {
        const view = render(
            <ButtonGroup size="large" isBlock>
                <Button key="a">A button</Button>
                <Button key="b" href="#">
                    An anchor
                </Button>
                <DropdownRoot>
                    <DropdownTrigger>
                        <Button>A dropdown button</Button>
                    </DropdownTrigger>
                    <DropdownPortal>
                        <DropdownContent>
                            <SingleSelectItem>A list item</SingleSelectItem>
                        </DropdownContent>
                    </DropdownPortal>
                </DropdownRoot>
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should render with conditional JSX', () => {
        const condition = false;
        const view = render(
            <ButtonGroup>
                <Button key="a">A button</Button>
                {condition ? <Button href="#">An anchor</Button> : null}
                {condition ? <Button key="b">A button</Button> : null}
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByText('false')).not.toBeInTheDocument();
    });

    it('should pass main props, but not add styles if there is only 1 child', () => {
        const view = render(
            <ButtonGroup size="small" isBlock>
                <Button key="a">A button</Button>
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
        const button = screen.getByRole('button');
        expect(button).toHaveClass('Button--variant_filled');
        expect(button).toHaveClass('Button--size_small');
        expect(button).toHaveClass('Button--isBlock');
    });

    it('should pass main props if child is array with size one', () => {
        const buttonContent = ['A button'];
        const view = render(
            <ButtonGroup context="primary" size="small" isBlock>
                {buttonContent.map((content) => (
                    <Button key="a">{content}</Button>
                ))}
            </ButtonGroup>
        );

        expect(view.container).toMatchSnapshot();
        const button = screen.getByRole('button');
        expect(button).toHaveClass('Button--context_primary');
        expect(button).toHaveClass('Button--size_small');
        expect(button).toHaveClass('Button--isBlock');
    });
});
