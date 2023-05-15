import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectButton } from '../SelectButton';

describe('SelectButton', () => {
    let view: RenderResult;
    const onChangeMock = jest.fn();

    beforeEach(() => {
        view = render(
            <SelectButton
                value="button 1"
                onChange={onChangeMock}
                size="large"
                isEqualWidth
                isSelected
            >
                Option 1
            </SelectButton>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render nothing if no children are provided', () => {
        view.rerender(
            <SelectButton
                value="button 1"
                onChange={onChangeMock}
                size="large"
                isEqualWidth
                isSelected
            />
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render children when it is 0', () => {
        view.rerender(
            <SelectButton
                value="button 1"
                onChange={onChangeMock}
                size="large"
                isEqualWidth
                isSelected
            >
                {0}
            </SelectButton>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should call onChange when clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button'));

        expect(onChangeMock).toHaveBeenCalledWith('button 1');
    });

    it.skip('should call onChange when Enter key was pressed on it', async () => {
        const user = userEvent.setup();
        await user.keyboard('[ENTER]');

        expect(onChangeMock).toHaveBeenCalled();
    });

    it('should not call onChange when other key was pressed on it', async () => {
        const user = userEvent.setup();
        await user.keyboard('[b]');

        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
