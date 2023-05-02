import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StringHighlighter } from '../StringHighlighter';

describe('StringHighlighter', () => {
    let view;
    const string = 'We are looking for php, java and javascript developer';
    const searchTerms = [];
    const highlightRenderer = ({ substring, ...props }) => <b {...props}>{substring}</b>;
    const defaultProps = {
        string,
        searchTerms,
        highlightRenderer,
    };
    const rerenderView = (props) => {
        view.rerender(<StringHighlighter {...defaultProps} {...props} />);
    };
    beforeEach(() => {
        view = render(<StringHighlighter {...defaultProps} />);
    });

    describe('not highlighted', () => {
        it('should initially render empty component correctly', () => {
            rerenderView({
                string: '',
            });

            expect(view.container).toMatchSnapshot();
        });

        it('should not highlight not existed terms', () => {
            rerenderView({
                searchTerms: ['notExisting', 'dev', 'a'],
            });

            expect(view.container).toMatchSnapshot();
            expect(screen.getByText(string)).toBeInTheDocument();
        });

        it('should not highlight case sensitive terms if ignoreCase is false', () => {
            rerenderView({
                searchTerms: ['DEVELOPER', 'Php'],
                highlighterCoreOptions: {
                    ignoreCase: false,
                },
            });

            expect(view.container).toMatchSnapshot();
        });

        it('should not highlight terms with diacritics if ignoreDiacritics is false', () => {
            rerenderView({
                searchTerms: ['dévéloper'],
                highlighterCoreOptions: {
                    ignoreDiacritics: false,
                },
            });

            expect(view.container).toMatchSnapshot();
        });
    });
    describe('highlighted', () => {
        it('should highlight list of terms', () => {
            rerenderView({
                searchTerms: ['javascript developer', 'php', 'java'],
            });

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByText(string)).not.toBeInTheDocument();
        });

        it('should highlight case sensitive terms by default', () => {
            rerenderView({
                searchTerms: ['DEVELOPER', 'Php'],
            });

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByText(string)).not.toBeInTheDocument();
        });

        it('should highlight terms with diacritics by default', () => {
            rerenderView({
                searchTerms: ['dévéloper'],
            });

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByText(string)).not.toBeInTheDocument();
        });

        it('should highlight overlapping terms correctly', () => {
            rerenderView({
                searchTerms: ['javascript developer', 'java and javascript'],
            });

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByText(string)).not.toBeInTheDocument();
        });
    });
});
