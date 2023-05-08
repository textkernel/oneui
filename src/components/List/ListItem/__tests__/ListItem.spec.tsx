import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListItem } from '../ListItem';
import { Text } from '../../../Text';

describe('ListItem component', () => {
    it('should render ListItem correctly', () => {
        const ref = React.createRef<HTMLLIElement>();
        const view = render(
            <ListItem ref={ref}>
                <Text>An item</Text>
            </ListItem>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('listitem')).toBeInTheDocument();
        expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
    it('should render interactive ListItem correctly', () => {
        const view = render(
            <ListItem onClick={jest.fn()}>
                <Text>An item</Text>
            </ListItem>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
        expect(screen.queryByRole('option')).toBeInTheDocument();
        expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
    });

    it('should turn string items to Text', () => {
        const view = render(<ListItem>Simple string</ListItem>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByText('Simple string')).toBeInTheDocument();
    });
    it('should not add clickable class when onClick is not defined', () => {
        render(<ListItem>An item</ListItem>);

        expect(screen.getByRole('listitem')).not.toHaveClass('ListItem--clickable');
    });
    it('should add clickable class when onClick is defined', () => {
        const view = render(<ListItem onClick={jest.fn()}>An item</ListItem>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('option')).toHaveClass('ListItem ListItem--clickable');
    });
    it('should call onClick function when clicked', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(<ListItem onClick={onClick}>An item</ListItem>);

        await user.click(screen.getByRole('option'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
    it('should render correctly when disabled', () => {
        const view = render(<ListItem disabled>An item</ListItem>);
        expect(view.container).toMatchSnapshot();

        const li = screen.getByRole('listitem');
        expect(li).toHaveClass('ListItem ListItem--disabled');
        expect(li).not.toHaveAttribute('disabled');
    });
    it('should set disabled prop on li when required', () => {
        const view = render(
            <ListItem disabled passDisabledToLi>
                An item
            </ListItem>
        );
        expect(view.container).toMatchSnapshot();

        const li = screen.getByRole('listitem');
        expect(li).toHaveClass('ListItem--disabled');
        expect(li).toHaveAttribute('disabled');

        view.rerender(
            <ListItem disabled={false} passDisabledToLi>
                An item
            </ListItem>
        );

        expect(screen.getByRole('listitem')).not.toHaveClass('ListItem--disabled');
        expect(screen.getByRole('listitem')).not.toHaveAttribute('disabled');
    });
    it('should add aria label when item is highlighted', () => {
        const view = render(
            <ListItem isHighlighted onClick={jest.fn()}>
                An item
            </ListItem>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
    });
});
