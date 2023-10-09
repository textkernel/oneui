import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    it('should render default Tooltip correctly', async () => {
        const view = render(
            <Tooltip placement="bottom" content="content">
                <p>Hover me</p>
            </Tooltip>
        );

        await user.hover(screen.getByText('Hover me'));

        expect(view.baseElement).toMatchSnapshot();
        expect(screen.getByRole('tooltip', { name: 'content' })).toBeInTheDocument();
    });

    it('should render Tooltip in disabled mode if content is empty', async () => {
        render(
            <Tooltip>
                <p>Hover me</p>
            </Tooltip>
        );

        await user.hover(screen.getByText('Hover me'));

        expect(screen.queryByRole('tooltip', { name: 'content' })).not.toBeInTheDocument();
    });
});
