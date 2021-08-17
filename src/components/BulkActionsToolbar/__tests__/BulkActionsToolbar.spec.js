import React from 'react';
import toJson from 'enzyme-to-json';
import { BulkActionsToolbar } from '..';

describe('BulkActionsToolbar component', () => {
    let wrapper;
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
        },
        {
            label: 'Import',
            disabled: false,
            context: 'primary',
            onClick: onImportClick,
        },
        {
            label: 'Delete',
            disabled: false,
            context: 'brand',
            onClick: onDeleteClick,
        },
    ];

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render BulkActionsToolbar correctly when selection amount is 0', () => {
        wrapper = shallow(
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
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when selection amount is more then 0', () => {
        wrapper = shallow(
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
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when toggle is set to "all"', () => {
        wrapper = shallow(
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
        wrapper.find('.BulkActionsToolbar__toggleButton').simulate('click');
        expect(onToggleClick).toHaveBeenCalledWith('all');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar correctly when toggle is set to "none"', () => {
        wrapper = shallow(
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
        wrapper.find('.BulkActionsToolbar__toggleButton').simulate('click');
        expect(onToggleClick).toHaveBeenCalledWith('none');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render BulkActionsToolbar actions correctly', () => {
        wrapper = shallow(
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

        // clicking on disabled "Compare" action
        wrapper.find('.BulkActionsToolbar__action').at(0).simulate('click');
        // clicking on enabled "Import" action
        wrapper.find('.BulkActionsToolbar__action').at(1).simulate('click');
        // clicking on enabled "Delete" action
        wrapper.find('.BulkActionsToolbar__action').at(2).simulate('click');
        expect(onCompareClick).toHaveBeenCalledTimes(1);
        expect(onImportClick).toHaveBeenCalledTimes(1);
        expect(onDeleteClick).toHaveBeenCalledTimes(1);
        expect(wrapper.find('.BulkActionsToolbar__action').at(0).prop('disabled')).toBe(true);
        expect(wrapper.find('.BulkActionsToolbar__action').at(1).prop('disabled')).toBe(false);
        expect(wrapper.find('.BulkActionsToolbar__action').at(2).prop('disabled')).toBe(false);
        expect(wrapper.find('.BulkActionsToolbar__action').at(0).prop('context')).toBe('link');
        expect(wrapper.find('.BulkActionsToolbar__action').at(1).prop('context')).toBe('primary');
        expect(wrapper.find('.BulkActionsToolbar__action').at(2).prop('context')).toBe('brand');
        expect(consoleError).not.toHaveBeenCalled();
    });
});
