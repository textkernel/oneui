import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text } from '../Text';

describe('<Text> that renders a text block', () => {
    it('should render default text block correctly', () => {
        const { container } = render(<Text>Some text content</Text>);

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Some text content')).toBeInTheDocument();
    });

    it('should add classes when props are changed', () => {
        const { container } = render(
            <Text inline context="neutral" size="small">
                Some inline, neutral text content
            </Text>
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Some inline, neutral text content')).toBeInTheDocument();
    });

    it('should render html children correctly', () => {
        const { container } = render(
            <Text>
                Some text, <span style={{ color: 'blue' }}>and some colored</span>
            </Text>
        );

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Some text,')).toBeInTheDocument();
        expect(screen.getByText('and some colored')).toBeInTheDocument();
    });

    it('should not render html when children is undefined', () => {
        const { container } = render(<Text>{undefined}</Text>);

        expect(container).toBeEmptyDOMElement();
    });

    it('should not render html when children is null', () => {
        const { container } = render(<Text>{null}</Text>);

        expect(container).toBeEmptyDOMElement();
    });
});
