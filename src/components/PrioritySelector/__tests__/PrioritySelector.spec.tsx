import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { PriorityItemType, PrioritySelector } from '../PrioritySelector';

const priorityList: PriorityItemType<string>[] = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

const priorityListRandom: PriorityItemType<string>[] = [
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
];

describe('PrioritySelector', () => {
    let view: RenderResult;
    const onSelectMock = jest.fn();

    beforeEach(() => {
        view = render(
            <PrioritySelector
                selectedItem={priorityList[0]}
                list={priorityList}
                onChange={onSelectMock}
            />
        );
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders correctly with all props provided', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button', { name: 'Mandatory' })).toBeInTheDocument();
    });

    it('should render correctly opened', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Mandatory' }));
        expect(view.baseElement).toMatchSnapshot();
        expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('should call onSelect correctly', async () => {
        const user = userEvent.setup();
        expect(onSelectMock).toHaveBeenCalledTimes(0);

        await user.click(screen.getByRole('button', { name: 'Mandatory' }));
        await user.click(screen.getByText('Important'));

        expect(onSelectMock).toHaveBeenCalledTimes(1);
        expect(onSelectMock).toHaveBeenCalledWith(priorityList[1]);
    });

    it('should close dropdown when item is chosen', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Mandatory' }));

        expect(screen.getByRole('menu')).toHaveAttribute('data-state', 'open');
        await user.click(screen.getAllByRole('option')[1]);

        expect(screen.getByRole('button')).toHaveAttribute('data-state', 'closed');
    });

    it('should render the priorities in the correct order', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Mandatory' }));

        expect(screen.getAllByTestId('default-icon')[1]).toHaveClass(
            'PrioritySelector__icon--mandatory'
        );
        expect(screen.getAllByTestId('default-icon')[2]).toHaveClass(
            'PrioritySelector__icon--important'
        );
        expect(screen.getAllByTestId('default-icon')[3]).toHaveClass(
            'PrioritySelector__icon--optional'
        );
        expect(screen.getAllByTestId('default-icon')[4]).toHaveClass(
            'PrioritySelector__icon--exclude'
        );

        view.rerender(
            <PrioritySelector
                selectedItem={priorityListRandom[0]}
                list={priorityListRandom}
                onChange={onSelectMock}
            />
        );

        expect(screen.getAllByTestId('default-icon')[1]).toHaveClass(
            'PrioritySelector__icon--mandatory'
        );
        expect(screen.getAllByTestId('default-icon')[2]).toHaveClass(
            'PrioritySelector__icon--important'
        );
        expect(screen.getAllByTestId('default-icon')[3]).toHaveClass(
            'PrioritySelector__icon--optional'
        );
        expect(screen.getAllByTestId('default-icon')[4]).toHaveClass(
            'PrioritySelector__icon--exclude'
        );
    });
});
