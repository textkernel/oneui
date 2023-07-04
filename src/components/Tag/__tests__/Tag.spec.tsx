import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ENTER_KEY } from '../../../constants';
import { Tag } from '../Tag';

describe('<Tag> component', () => {
    let view: RenderResult;
    const onTagClick = jest.fn();
    const onDeleteClick = jest.fn();

    const text = 'Tag text';
    const bgColor = '#ccc';
    const maxWidth = '30px';
    const textSize = 'large';
    const closeLabel = 'close label';

    it('should render correctly with minimum amount of props', () => {
        view = render(<Tag>{text}</Tag>);

        expect(screen.getByText(text)).toBeInTheDocument();
        expect(view.container).toMatchSnapshot();
    });

    it('should render correctly with full list of props', () => {
        view = render(
            <Tag
                isSelected
                bgColor={bgColor}
                maxWidth={maxWidth}
                size={textSize}
                onClick={onTagClick}
                onDelete={onDeleteClick}
                contentClassName="my-class"
                contentStyle={{ color: 'red' }}
            >
                {text}
            </Tag>
        );

        const button = screen.getByRole('button', { name: text });

        expect(view.container).toMatchSnapshot();
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute(
            'style',
            'background-color: rgb(204, 204, 204); max-width: 30px;'
        );
    });

    it('should invoke callback when onClick event is called', async () => {
        const user = userEvent.setup();
        view = render(<Tag onClick={onTagClick}>{text}</Tag>);

        await user.click(screen.getByRole('button'));

        expect(onTagClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke onClick when user interacts with tag by pressing Enter', async () => {
        const user = userEvent.setup();
        view = render(<Tag onClick={onTagClick}>{text}</Tag>);

        const button = screen.getByRole('button');
        await button.focus();
        await user.keyboard(`[${ENTER_KEY}]`);

        expect(onTagClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke callback when onDelete event is called', async () => {
        const user = userEvent.setup();
        view = render(
            <Tag onClick={onTagClick} onDelete={onDeleteClick}>
                {text}
            </Tag>
        );

        await user.click(screen.getByRole('button', { name: '' }));

        expect(onTagClick).toHaveBeenCalledTimes(0);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
    });

    it('should invoke onDelete when user interacts with delete button by pressing Enter', async () => {
        const user = userEvent.setup();
        view = render(
            <Tag onClick={onTagClick} onDelete={onDeleteClick} closeLabel={closeLabel}>
                {text}
            </Tag>
        );
        const button = screen.getByRole('button', { name: closeLabel });

        await button.focus();
        await user.keyboard(`[${ENTER_KEY}]`);

        expect(onTagClick).toHaveBeenCalledTimes(0);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
    });
});
