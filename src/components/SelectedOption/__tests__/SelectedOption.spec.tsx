import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectedOption } from '../SelectedOption';

describe('<SelectedOption>', () => {
    const onDeleteMock = jest.fn();

    let view: RenderResult;

    it('should render nothing if no children are provided', () => {
        view = render(<SelectedOption onDelete={onDeleteMock} />);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render children if it is 0', () => {
        view = render(<SelectedOption onDelete={onDeleteMock}>{0}</SelectedOption>);

        expect(view.container).toHaveTextContent('0');
    });

    it('should render default props correctly with string as child', () => {
        view = render(<SelectedOption onDelete={onDeleteMock}>My option</SelectedOption>);

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('My option');
        expect(view.container.children[0].children[1].tagName).toBe('SPAN');
    });

    it('should render default props correctly with a react element as child', () => {
        view = render(
            <SelectedOption onDelete={onDeleteMock}>
                <p>My option</p>
            </SelectedOption>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('My option');
        expect(view.container.children[0].children[1].tagName).toBe('P');
    });

    it('should render in appropriate HTML tag', () => {
        view = render(
            <SelectedOption onDelete={onDeleteMock} As="li">
                My option
            </SelectedOption>
        );

        expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('should call onDelete when button clicked', async () => {
        const user = userEvent.setup();
        view = render(<SelectedOption onDelete={onDeleteMock}>My option</SelectedOption>);

        await user.click(screen.getByRole('button'));

        expect(onDeleteMock).toHaveBeenCalled();
    });
});
