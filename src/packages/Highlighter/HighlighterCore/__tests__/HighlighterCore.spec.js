import { HighlighterCore } from '../HighlighterCore';

describe('HighlighterCore', () => {
    const text = 'php and JavaScript developer';

    it('should create an instance with default options', () => {
        expect(() => new HighlighterCore([])).not.toThrow();
    });
    describe('not highlighted ', () => {
        it('should not highlight if search terms is empty', () => {
            const highlighter = new HighlighterCore([]);
            expect(highlighter.find(text)).toEqual([
                {
                    highlighted: false,
                    substring: text,
                },
            ]);
        });
        it('should empty string while passed empty arguments', () => {
            const highlighter = new HighlighterCore([]);
            expect(highlighter.find('')).toEqual([
                {
                    highlighted: false,
                    substring: '',
                },
            ]);
        });
        it('should not highlight not existed terms', () => {
            const highlighter = new HighlighterCore(['notExistingTerm', 'develop', 'ph', 'a']);
            expect(highlighter.find(text)).toEqual([
                {
                    highlighted: false,
                    substring: text,
                },
            ]);
        });
        it('should not highlight case sensitive terms if this option disabled', () => {
            const highlighter = new HighlighterCore(['DEVELOPER', 'Php'], {
                ignoreCase: false,
            });
            expect(highlighter.find(text)).toEqual([
                {
                    highlighted: false,
                    substring: text,
                },
            ]);
        });
        it('should not highlight diacritics terms if this option disabled', () => {
            const highlighter = new HighlighterCore(['dévéloper'], {
                ignoreDiacritics: false,
            });
            expect(highlighter.find(text)).toEqual([
                {
                    highlighted: false,
                    substring: text,
                },
            ]);
        });
    });
    describe('highlighted', () => {
        it('should highlight one word', () => {
            const highlighter = new HighlighterCore(['word']);
            expect(highlighter.find('word')).toEqual([
                {
                    highlighted: true,
                    substring: 'word',
                },
            ]);
        });
        it('should highlight start of the sentence', () => {
            const highlighter = new HighlighterCore(['php']);
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php' },
                { highlighted: false, substring: ' and JavaScript developer' },
            ]);
        });
        it('should highlight end of the sentence', () => {
            const highlighter = new HighlighterCore(['developer']);
            expect(highlighter.find(text)).toEqual([
                { highlighted: false, substring: 'php and JavaScript ' },
                { highlighted: true, substring: 'developer' },
            ]);
        });
        it('should highlight list of the terms', () => {
            const highlighter = new HighlighterCore(['php', 'developer']);
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php' },
                { highlighted: false, substring: ' and JavaScript ' },
                { highlighted: true, substring: 'developer' },
            ]);
        });
        it('should highlight two words', () => {
            const highlighter = new HighlighterCore(['php and', 'developer']);
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php and' },
                { highlighted: false, substring: ' JavaScript ' },
                { highlighted: true, substring: 'developer' },
            ]);
        });
        it('should highlight different passed string', () => {
            const highlighter = new HighlighterCore(['javascript'], {
                ignoreCase: true,
            });
            expect(highlighter.find(text)).toEqual([
                { highlighted: false, substring: 'php and ' },
                { highlighted: true, substring: 'JavaScript' },
                { highlighted: false, substring: ' developer' },
            ]);
            expect(highlighter.find('php and javascript')).toEqual([
                { highlighted: false, substring: 'php and ' },
                { highlighted: true, substring: 'javascript' },
            ]);
        });
        it('should highlight case sensitive terms by default', () => {
            const highlighter = new HighlighterCore(['JavaScript'], {
                ignoreCase: true,
            });
            expect(highlighter.find('php and javascript')).toEqual([
                { highlighted: false, substring: 'php and ' },
                { highlighted: true, substring: 'javascript' },
            ]);
        });
        it('should highlight all occurrences when it starts from the same index', () => {
            const highlighter = new HighlighterCore(['JavaScript', 'JavaScript developer'], {
                ignoreCase: true,
            });
            expect(highlighter.find(text)).toEqual([
                { highlighted: false, substring: 'php and ' },
                { highlighted: true, substring: 'JavaScript developer' },
            ]);
        });
        it('should highlight repeated terms correctly', () => {
            const highlighter = new HighlighterCore(['php', 'developer', 'developer'], {});
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php' },
                { highlighted: false, substring: ' and JavaScript ' },
                { highlighted: true, substring: 'developer' },
            ]);
            expect(highlighter.find('some other text')).toEqual([
                { highlighted: false, substring: 'some other text' },
            ]);
            expect(highlighter.find('We are looking for php developer')).toEqual([
                { highlighted: false, substring: 'We are looking for ' },
                { highlighted: true, substring: 'php' },
                { highlighted: false, substring: ' ' },
                { highlighted: true, substring: 'developer' },
            ]);
        });
        it('should highlight diacritics by default', () => {
            const highlighter = new HighlighterCore(['dévéloper', 'Sao Paulo', 'Gottingen'], {
                ignoreDiacritics: true,
            });
            expect(highlighter.find('php developer')).toEqual([
                { highlighted: false, substring: 'php ' },
                { highlighted: true, substring: 'developer' },
            ]);
            expect(highlighter.find('São Paulo, Göttingen')).toEqual([
                { highlighted: true, substring: 'São Paulo' },
                { highlighted: false, substring: ', ' },
                { highlighted: true, substring: 'Göttingen' },
            ]);
        });
        it('should highlight partially characters when it enabled', () => {
            const highlighter = new HighlighterCore(['dev', 'Jav'], {
                accuracy: 'partial',
            });
            expect(highlighter.find(text)).toEqual([
                { highlighted: false, substring: 'php and ' },
                { highlighted: true, substring: 'Jav' },
                { highlighted: false, substring: 'aScript ' },
                { highlighted: true, substring: 'dev' },
                { highlighted: false, substring: 'eloper' },
            ]);
        });
        it('should highlight overlapping terms correctly', () => {
            const highlighter = new HighlighterCore(['php and', 'and javascript']);
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php and JavaScript' },
                { highlighted: false, substring: ' developer' },
            ]);
        });
        it('should highlight RegExp term', () => {
            const highlighter = new HighlighterCore(/php/gim);
            expect(highlighter.find(text)).toEqual([
                { highlighted: true, substring: 'php' },
                { highlighted: false, substring: ' and JavaScript developer' },
            ]);
        });
    });
});
