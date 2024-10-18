import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
    DropdownContent,
    DropdownRoot,
    DropdownTrigger,
    SingleSelectItem,
    DropdownPortal,
    DropdownSub,
    DropdownSubContent,
    DropdownSubTrigger,
} from '../..';

describe('DropdownSubTrigger', () => {
    it('should render correctly', async () => {
        const user = userEvent.setup();

        const { container } = render(
            <DropdownRoot>
                <DropdownTrigger>
                    <button>Click here</button>
                </DropdownTrigger>
                <DropdownContent>
                    <DropdownSub>
                        <DropdownSubTrigger>More items</DropdownSubTrigger>
                        <DropdownPortal>
                            <DropdownSubContent>
                                <SingleSelectItem onSelect={jest.fn()}>Item</SingleSelectItem>
                            </DropdownSubContent>
                        </DropdownPortal>
                    </DropdownSub>
                </DropdownContent>
            </DropdownRoot>
        );

        await user.click(screen.getByRole('button', { name: 'Click here' }));

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
