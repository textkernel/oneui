import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkedText } from '../MarkedText';

describe('<MarkedText> that renders a text block while marking matched substrings', () => {
    let view: RenderResult;

    it('should render correctly when there are no matches', () => {
        view = render(<MarkedText marker="else">Some text content</MarkedText>);

        expect(view.container).toMatchSnapshot();
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('should render correctly when empty marker passed', () => {
        view = render(<MarkedText marker="">Some text content</MarkedText>);

        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('should render correctly when there are matches', () => {
        view = render(<MarkedText marker="text">Some text content</MarkedText>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('contentinfo')).toBeVisible();
    });

    it('should render correctly with multiple matches', () => {
        const marker = 'te';
        view = render(
            <MarkedText marker={marker}>Some text content that has text more then once</MarkedText>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('contentinfo')).toHaveLength(3);
        expect(screen.getAllByRole('contentinfo')[0].innerHTML).toBe(marker);
    });

    it('should mark special characters', () => {
        const marker = ".?!#$%^&()[]:;\\?''";
        view = render(<MarkedText marker={marker}>{marker}</MarkedText>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('contentinfo')).toBeVisible();
    });

    it('should pass props to Text', () => {
        view = render(
            <MarkedText marker="text" inline context="brand">
                Some text content
            </MarkedText>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('contentinfo')).toBeVisible();
    });
});
