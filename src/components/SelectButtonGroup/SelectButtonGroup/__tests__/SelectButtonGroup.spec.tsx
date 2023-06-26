import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectButtonGroup } from '../SelectButtonGroup';
import { SelectButton } from '../../SelectButton';

describe('SelectButtonGroup', () => {
    let view: RenderResult;
    const onChangeMock = jest.fn();
    const defaultProps = {
        defaultValue: ['1'],
        onChange: onChangeMock,
    };
    const rerenderView = (props) => {
        view.rerender(
            <SelectButtonGroup {...defaultProps} {...props}>
                <SelectButton value="1" key="1">
                    Option 1
                </SelectButton>
                <SelectButton value="2" key="2">
                    Option 2
                </SelectButton>
                <SelectButton value="3" key="3">
                    Option 3
                </SelectButton>
            </SelectButtonGroup>
        );
    };
    const getButton = (number) => screen.getAllByRole('button')[number];

    beforeEach(() => {
        view = render(
            <SelectButtonGroup {...defaultProps}>
                <SelectButton value="1" key="1">
                    Option 1
                </SelectButton>
                <SelectButton value="2" key="2">
                    Option 2
                </SelectButton>
                <SelectButton value="3" key="3">
                    Option 3
                </SelectButton>
            </SelectButtonGroup>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
    });

    describe('Single select mode', () => {
        it('should not change isSelect prop of children on initial render', () => {
            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should switch the selected option if a not-selected option is clicked', async () => {
            const user = userEvent.setup();
            await user.click(getButton(1));

            expect(getButton(0)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should allow empty selection if field is not required', async () => {
            const user = userEvent.setup();
            await user.click(getButton(0));

            expect(getButton(0)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should not allow empty selection if field is required', async () => {
            const newProps = {
                isRequired: true,
            };
            rerenderView(newProps);
            const user = userEvent.setup();
            await user.click(getButton(0));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should call onChange with correct parameters', async () => {
            const user = userEvent.setup();
            await user.click(getButton(1));

            expect(onChangeMock).toHaveBeenCalledWith(['2']);

            await user.click(getButton(0));

            expect(onChangeMock).toHaveBeenLastCalledWith(['1']);

            await user.click(getButton(0));

            expect(onChangeMock).toHaveBeenLastCalledWith([]);
        });
    });

    describe('Multi select mode', () => {
        beforeEach(() => {
            const newProps = {
                isMultiselect: true,
            };
            rerenderView(newProps);
        });

        it('should not change isSelect prop of children on initial render', () => {
            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should switch to selected if a not-selected option is clicked, without changing others', async () => {
            const user = userEvent.setup();
            await user.click(getButton(1));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(2));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should switch to not-selected if a selected option is clicked, without changing others', async () => {
            const user = userEvent.setup();
            await user.click(getButton(1));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(1));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(1));
            await user.click(getButton(0));

            expect(getButton(0)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should not allow deletion of last value if field is required', async () => {
            const newProps = {
                isRequired: true,
            };
            rerenderView(newProps);
            const user = userEvent.setup();
            await user.click(getButton(0));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(1));

            expect(getButton(0)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(0));

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(1));

            expect(getButton(0)).not.toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(1)).toHaveClass('SelectButton SelectButton--isSelected');
            expect(getButton(2)).not.toHaveClass('SelectButton SelectButton--isSelected');
        });

        it('should call onChange with correct parameters', async () => {
            const user = userEvent.setup();
            await user.click(getButton(1));
            expect(onChangeMock).toHaveBeenLastCalledWith(['1', '2']);
            expect(onChangeMock).toBeCalled();

            await user.click(getButton(2));

            expect(onChangeMock).toBeCalled();
            expect(onChangeMock).toHaveBeenLastCalledWith(['1', '2', '3']);

            await user.click(getButton(1));

            expect(onChangeMock).toBeCalled();
            expect(onChangeMock).toHaveBeenLastCalledWith(['1', '3']);

            await user.click(getButton(0));
            await user.click(getButton(2));

            expect(onChangeMock).toHaveBeenLastCalledWith([]);
        });
    });

    describe('Controlled behavior', () => {
        beforeEach(() => {
            const newProps = {
                defaultValue: undefined,
                value: ['1'],
            };
            rerenderView(newProps);
        });

        it('should render correctly', () => {
            expect(view.container).toMatchSnapshot();
        });

        it('should call onChange with correct parameters', async () => {
            const user = userEvent.setup();

            expect(getButton(0)).toHaveClass('SelectButton SelectButton--isSelected');

            await user.click(getButton(1));

            expect(onChangeMock).toHaveBeenCalled();
        });
    });
});
