import { BooleanQueryTokenizer, TokenType } from '..';

describe('modules/BooleanQueryTokenizer', () => {
    describe('#tokenize()', () => {
        it('should tokenize boolean query respecting all types of tokens', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.tokenize(
                    '-php AND\t\n+c++ +--+ - java* NOT *script C++ L-3 Yum! ' +
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
                { type: TokenType.word, lexeme: 'C++' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.word, lexeme: 'L-3' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.word, lexeme: 'Yum!' },
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
            expect(booleanQueryTokenizer.tokenize('web*')).toEqual([
                { type: TokenType.word, lexeme: 'web' },
                { type: TokenType.wildcard, lexeme: '*' },
            ]);
            expect(booleanQueryTokenizer.tokenize('to_be OR')).toEqual([
                { type: TokenType.word, lexeme: 'to_be' },
                { type: TokenType.separator, lexeme: ' ' },
                { type: TokenType.booleanOperator, lexeme: 'OR' },
            ]);
        });
    });

    describe('#buildBagOfWords()', () => {
        it('should handle words boundaries correctly', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('')).toEqual([]);
            expect(booleanQueryTokenizer.extractWordsAndPhrases('   ')).toEqual([]);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('  \n  \n  \t foo     \t bar   \n\n')
            ).toEqual(['foo', 'bar']);
        });

        it('should handle operators correctly', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('NEAROP')).toEqual(['NEAROP']);
            expect(booleanQueryTokenizer.extractWordsAndPhrases('NEAR')).toEqual([]);
        });

        it('should tokenize words properly', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(`
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
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    'Düsseldorf Köln "Набережные Челны" Москва 北京市 إسرائيل'
                )
            ).toEqual(['Düsseldorf', 'Köln', 'Набережные Челны', 'Москва', '北京市', 'إسرائيل']);
        });

        it('should tokenize words with modifiers', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
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
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('""')).toEqual([]);
            expect(booleanQueryTokenizer.extractWordsAndPhrases("''")).toEqual([]);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('"a double-quoted phrase"')
            ).toEqual(['a double-quoted phrase']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases("'another phrase in single quotes'")
            ).toEqual(['another phrase in single quotes']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    '"  phrase with some leading and trailing word separators \t\n  "'
                )
            ).toEqual(['phrase with some leading and trailing word separators']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    '"a +phrase OR with some NOT boolean operators AND"'
                )
            ).toEqual(['a +phrase OR with some NOT boolean operators AND']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('"a +phrase* *with* *some wild*cards"')
            ).toEqual(['a +phrase with some wildcards']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    '& "a phrase & with some - special | characters inside" * outside'
                )
            ).toEqual(['a phrase & with some - special | characters inside', 'outside']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    'not only -"a phrase"+ but also some other words AND stuff'
                )
            ).toEqual([
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
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('OR java AND')).toEqual(['java']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(`
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
                'AROUND',
                'around',
            ]);
        });

        it('should respect wildcards', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('* * *')).toEqual([]);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('do you speak english mother* ?')
            ).toEqual(['do', 'you', 'speak', 'english', 'mother']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases(
                    "Fasten your *belts. It's going to be a * night."
                )
            ).toEqual(['Fasten', 'your', 'belts.', "It's", 'going', 'to', 'be', 'a', 'night.']);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('people like to * each other')
            ).toEqual(['people', 'like', 'to', 'each', 'other']);
        });

        it('should ignore wildcards inside quotes', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.extractWordsAndPhrases('"*"')).toEqual([]);
            expect(booleanQueryTokenizer.extractWordsAndPhrases('"yo* "')).toEqual(['yo']);
            expect(booleanQueryTokenizer.extractWordsAndPhrases('python "is a *"')).toEqual([
                'python',
                'is a',
            ]);
            expect(
                booleanQueryTokenizer.extractWordsAndPhrases('"*prog*ramming*   is  fun."')
            ).toEqual(['programming   is  fun.']);
        });
    });

    describe('#extractWords()', () => {
        it('should filter out terms, phrases negated by NOT', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript AND NOT lua OR NOT php NOT NOT NOT kotlin java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript AND NOT "C sharp" OR NOT"java developer" java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });

        it('should filter out groups negated by NOT', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript NOT(php AND java) java NOT (kotlin VBScript)'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript NOT((php AND java NOT php) OR (php AND java NOT(foo OR bar))) java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords('typescript NOT(((((php AND java))))) java')
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });

        it('should filter out terms, phrases negated by minus (-)', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords('typescript AND -lua OR -php - - -kotlin java')
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript AND -"C sharp" OR -"java developer" java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });

        it('should filter out groups negated by minus (-)', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript -(php AND java) java -(kotlin VBScript)'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript -((php AND java -php) OR (php AND java NOT(foo OR bar))) java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords('typescript -(((((php AND java))))) java')
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });

        it('should filter out terms, phrases negated by exclamation mark (!)', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords('typescript AND !lua OR !php ! ! !kotlin java')
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript AND !"C sharp" OR !"java developer" java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });

        it('should filter out groups negated by exclamation mark (!)', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript !(php AND java) java !(kotlin VBScript)'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords(
                    'typescript !((php AND java !php) OR (php AND java NOT(foo OR bar))) java'
                )
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
            expect(
                booleanQueryTokenizer.extractWords('typescript !(((((php AND java))))) java')
            ).toEqual({
                wordsAndPhrases: ['typescript', 'java'],
            });
        });
    });

    describe('#isContainsBooleanOperators()', () => {
        it('should return true if phrases contains boolean operators', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.isContainsBooleanOperators('java AND js')).toEqual(true);
        });

        it('should return false if phrases contains boolean operators', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.isContainsBooleanOperators('java, js manager')).toEqual(
                false
            );
        });
        it('should return true if phrases contains lower-cased boolean operators', () => {
            const booleanQueryTokenizer = new BooleanQueryTokenizer();
            expect(booleanQueryTokenizer.isContainsBooleanOperators('java or js')).toEqual(true);
        });
    });
});
