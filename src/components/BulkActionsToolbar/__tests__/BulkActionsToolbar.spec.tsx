import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BulkActionsToolbar, BulkActionsToolbarAction } from '..';
import '@testing-library/jest-dom';

describe('BulkActionsToolbar component', () => {
    let view;
    let consoleError;
    const onToggleClick = jest.fn();
    const onCompareClick = jest.fn();
    const onImportClick = jest.fn();
    const onDeleteClick = jest.fn();
    const toggle = {
        selectAllLabel: 'Select All',
        selectAllTooltip: '"Select All" will select all items on the current page',
        selectNoneLabel: 'Select None',
        selectNoneTooltip: '"Select None" will unselect all items on the current page',
        onToggle: onToggleClick,
    };
    const actions = [
        {
            label: 'Compare',
            disabled: true,
            onClick: onCompareClick,
        } as BulkActionsToolbarAction,
        {
            label: 'Import',
            disabled: false,
            context: 'primary',
            onClick: onImportClick,
        } as BulkActionsToolbarAction,
        {
            label: 'Delete',
            disabled: false,
            context: 'primary',
            onClick: onDeleteClick,
        } as BulkActionsToolbarAction,
    ];

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render BulkActionsToolbar correctly when selection amount is 0', () => {
        view = render(
            <BulkActionsToolbar
                selection={{
                    hasSelection: false,
                    label: '0 results selected',
                }}
                toggleState="all"
                toggle={toggle}
                actions={actions}
            />
        );
        expect(view.container).toMatchSnapshot();

        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when selection amount is more then 0', () => {
        view = render(
            <BulkActionsToolbar
                selection={{
                    hasSelection: true,
                    label: 'Some results selected',
                }}
                toggleState="all"
                toggle={toggle}
                actions={actions}
            />
        );
        expect(view.container).toMatchSnapshot();

        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when toggle is set to "all"', async () => {
        const user = userEvent.setup();
        view = render(
            <BulkActionsToolbar
                selection={{
                    hasSelection: true,
                    label: 'Some results selected',
                }}
                toggleState="all"
                toggle={toggle}
                actions={actions}
            />
        );
        await user.click(screen.getByRole('button', { name: 'Select All' }));

        expect(onToggleClick).toHaveBeenCalledWith('all');
        expect(view.container).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when toggle is set to "none"', async () => {
        const user = userEvent.setup();
        view = render(
            <BulkActionsToolbar
                selection={{
                    hasSelection: true,
                    label: 'Some results selected',
                }}
                toggleState="none"
                toggle={toggle}
                actions={actions}
            />
        );
        await user.click(screen.getByRole('button', { name: 'Select None' }));

        expect(onToggleClick).toHaveBeenCalledWith('none');
        expect(view.container).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar actions correctly', async () => {
        const user = userEvent.setup();
        view = render(
            <BulkActionsToolbar
                selection={{
                    hasSelection: true,
                    label: 'Some results selected',
                }}
                toggleState="none"
                toggle={toggle}
                actions={actions}
            />
        );
        expect(view.container).toMatchSnapshot();

        await user.click(screen.getByRole('button', { name: 'Compare' }));
        await user.click(screen.getByRole('button', { name: 'Import' }));
        await user.click(screen.getByRole('button', { name: 'Delete' }));

        // because this button is disabled
        expect(onCompareClick).toHaveBeenCalledTimes(0);
        expect(onImportClick).toHaveBeenCalledTimes(1);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
        // because this button is disabled
        expect(screen.getByRole('button', { name: 'Compare' })).toHaveAttribute('disabled');
        expect(screen.getByRole('button', { name: 'Import' })).not.toHaveAttribute('disabled');
        expect(screen.getByRole('button', { name: 'Delete' })).not.toHaveAttribute('disabled');
        expect(consoleError).not.toHaveBeenCalled();
    });
});
