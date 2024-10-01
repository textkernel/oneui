import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from '../Checkbox';

describe('<Checkbox> that renders a checkbox', () => {
    const lineRole = 'line label';
    const polylineRole = 'polyline label';
    let view: RenderResult;

    it('should render default checkbox correctly', () => {
        view = render(<Checkbox id="c1">Check this out</Checkbox>);

        expect(view.container).toMatchSnapshot();
    });

    it('should render with larger gap for label', () => {
        view = render(
            <Checkbox id="c1" useLargeGap>
                Check this out
            </Checkbox>
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should render checkbox with complex children', () => {
        view = render(
            <Checkbox id="c1">
                <span>
                    Check this out <span>something else</span>
                </span>
            </Checkbox>
        );

        expect(view.container).toMatchSnapshot();
        expect(
            screen.getByRole('checkbox', { name: 'Check this out something else' })
        ).toBeVisible();
    });

    it('should call onChange function when clicked', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(
            <Checkbox id="c2" onChange={onChange}>
                Check this out
            </Checkbox>
        );

        await user.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should rendered disabled checkbox correctly', () => {
        view = render(
            <Checkbox id="c3" disabled>
                Useless checkbox
            </Checkbox>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('checkbox')).toBeVisible();
        expect(screen.getByRole('checkbox')).toHaveAttribute('disabled');
    });

    describe('svg render', () => {
        const defaultProps = {
            id: 'c4',
            checked: true,
            indeterminate: true,
            onChange: () => {},
            lineRole,
            polylineRole,
        };

        beforeEach(() => {
            view = render(<Checkbox {...defaultProps}>Useless checkbox</Checkbox>);
        });

        const rerenderView = (props) => {
            view.rerender(<Checkbox {...defaultProps} {...props} />);
        };

        it('should render the indeterminate svg when checked is false and indeterminate true', () => {
            const newProps = {
                checked: false,
            };

            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('img', { name: polylineRole })).not.toBeInTheDocument();
            expect(screen.getByRole('img', { name: lineRole })).toBeVisible();
        });

        it('should render the checked svg when checked is true and indeterminate false', () => {
            const newProps = {
                id: 'c5',
                indeterminate: false,
            };

            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('img', { name: polylineRole })).toBeVisible();
            expect(screen.queryByRole('img', { name: lineRole })).not.toBeInTheDocument();
        });

        it('should render the indeterminate svg when checked and indeterminate are true', () => {
            const newProps = {
                id: 'c6',
            };

            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('img', { name: polylineRole })).not.toBeInTheDocument();
            expect(screen.getByRole('img', { name: lineRole })).toBeVisible();
        });

        it('should not render any svg when checked and indeterminate are both false', () => {
            const newProps = {
                id: 'c7',
                checked: false,
                indeterminate: false,
            };

            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole(polylineRole)).not.toBeInTheDocument();
            expect(screen.queryByRole(lineRole)).not.toBeInTheDocument();
        });
    });
});
