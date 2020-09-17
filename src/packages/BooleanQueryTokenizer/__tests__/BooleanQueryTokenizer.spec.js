import { BooleanQueryTokenizer, TokenType } from '..';

describe('modules/BooleanQueryTokenizer', () => {
    describe('#tokenize()', () => {
        it('should tokenize boolean query respecting all types of tokens', () => {
            expect(
                BooleanQueryTokenizer.tokenize(
                    '-php AND\t\n+c++ +--+ - java* NOT *script ' +
                        'NEAR (rust OR web*hueb) OR -.NET "TO BE OR NOT TO BE"'
                )
            ).toEqual([
                { type: TokenType.modifier, lexeme: '-' },
                { type: TokenType.word, lexeme: 'php' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'AND' },
                { type: TokenType.separator, lexeme: '\t\n' },
                { type: TokenType.modifier, lexeme: '+' },
                { type: TokenType.word, lexeme: 'c++' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.unknown, lexeme: '+--+' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.unknown, lexeme: '-' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.word, lexeme: 'java' },
                { type: TokenType.wildcard, lexeme: '*' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'NOT' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.wildcard, lexeme: '*' },
                { type: TokenType.word, lexeme: 'script' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'NEAR' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.parentheses, lexeme: '(' },
                { type: TokenType.word, lexeme: 'rust' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'OR' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.wildcardWord, lexeme: 'web*hueb' },
                { type: TokenType.parentheses, lexeme: ')' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'OR' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.modifier, lexeme: '-' },
                { type: TokenType.word, lexeme: '.NET' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.phrase, lexeme: '"TO BE OR NOT TO BE"' },
            ]);
            expect(BooleanQueryTokenizer.tokenize('web*')).toEqual([
                { type: TokenType.word, lexeme: 'web' },
                { type: TokenType.wildcard, lexeme: '*' },
            ]);
            expect(BooleanQueryTokenizer.tokenize('to_be OR')).toEqual([
                { type: TokenType.word, lexeme: 'to_be' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'OR' },
            ]);
        });
    });

    describe('#buildBagOfWords()', () => {
        it('should handle words boundaries correctly', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('')).toEqual([]);
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('   ')).toEqual([]);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('  \n  \n  \t foo     \t bar   \n\n')
            ).toEqual(['foo', 'bar']);
        });

        it('should handle operators correctly', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('NEAROP')).toEqual(['NEAROP']);
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('NEAR')).toEqual([]);
        });

        it('should tokenize words properly', () => {
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(`
                    php c++ canal+ 23AndMe U x THE.BEST.COMPANY 888.com 3M WD40 Forever21
                    360 7/11 1and1 L-3 37signals 20x200 _lodash Macy's Yum!
                `)
            ).toEqual([
                'php',
                'c++',
                'canal+',
                '23AndMe',
                'U',
                'x',
                'THE.BEST.COMPANY',
                '888.com',
                '3M',
                'WD40',
                'Forever21',
                '360',
                '7/11',
                '1and1',
                'L-3',
                '37signals',
                '20x200',
                '_lodash',
                "Macy's",
                'Yum!',
            ]);
        });

        it('should tokenize words that contain non-latin characters', () => {
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    'Düsseldorf Köln "Набережные Челны" Москва 北京市 إسرائيل'
                )
            ).toEqual(['Düsseldorf', 'Köln', 'Набережные Челны', 'Москва', '北京市', 'إسرائيل']);
        });

        it('should tokenize words with modifiers', () => {
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    '-php +c++ d-- +++ -canal+ + Yo!!! -- +23AndMe --- !U !x - !Yum! +.NET'
                )
            ).toEqual([
                'php',
                'c++',
                'd--',
                'canal+',
                'Yo!!!',
                '23AndMe',
                'U',
                'x',
                'Yum!',
                '.NET',
            ]);
        });

        it('should respect quoted phrases', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('""')).toEqual([]);
            expect(BooleanQueryTokenizer.extractWordsAndPhrases("''")).toEqual([]);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('"a double-quoted phrase"')
            ).toEqual(['a double-quoted phrase']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases("'another phrase in single quotes'")
            ).toEqual(['another phrase in single quotes']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    '"  phrase with some leading and trailing word separators \t\n  "'
                )
            ).toEqual(['phrase with some leading and trailing word separators']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    '"a +phrase OR with some NOT boolean operators AND"'
                )
            ).toEqual(['a +phrase OR with some NOT boolean operators AND']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('"a +phrase* *with* *some wild*cards"')
            ).toEqual(['a +phrase with some wildcards']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    '& "a phrase & with some - special | characters inside" and * outside'
                )
            ).toEqual(['a phrase & with some - special | characters inside', 'and', 'outside']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    'not only -"a phrase"+ but also some other words AND stuff'
                )
            ).toEqual([
                'not',
                'only',
                'a phrase',
                'but',
                'also',
                'some',
                'other',
                'words',
                'stuff',
            ]);
        });

        it('should handle boolean operators and parentheses', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('OR java AND')).toEqual(['java']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(`
                    Rust AND c++ OR (D R Python) OR (web NEAR developer)
                    NOT manager AND [java AND spring] AROUND 5 boot
                    NOT <NOTARIUS AND ANDROID> OR ORGANIST NEAR NEARNESS AROUND 10 AROUNDNESS
                    NOT not AND and OR or NEAR near AROUND around
                `)
            ).toEqual([
                'Rust',
                'c++',
                'D',
                'R',
                'Python',
                'web',
                'developer',
                'manager',
                'java',
                'spring',
                'boot',
                'NOTARIUS',
                'ANDROID',
                'ORGANIST',
                'NEARNESS',
                'AROUNDNESS',
                'not',
                'and',
                'or',
                'near',
                'AROUND',
                'around',
            ]);
        });

        it('should respect wildcards', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('* * *')).toEqual([]);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('do you speak english mother* ?')
            ).toEqual(['do', 'you', 'speak', 'english', 'mother']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases(
                    "Fasten your *belts. It's going to be a * night."
                )
            ).toEqual(['Fasten', 'your', 'belts.', "It's", 'going', 'to', 'be', 'a', 'night.']);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('people like to * each other')
            ).toEqual(['people', 'like', 'to', 'each', 'other']);
        });

        it('should ignore wildcards inside quotes', () => {
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('"*"')).toEqual([]);
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('"yo* "')).toEqual(['yo']);
            expect(BooleanQueryTokenizer.extractWordsAndPhrases('python "is a *"')).toEqual([
                'python',
                'is a',
            ]);
            expect(
                BooleanQueryTokenizer.extractWordsAndPhrases('"*prog*ramming*   is  fun."')
            ).toEqual(['programming   is  fun.']);
        });
    });
});
