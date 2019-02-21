import BemTokens from '..';

describe('BemTokens', () => {
    describe('#constructor', () => {
        it('...', () => {
            /*
            "b"              blockPatern
            "b--m            blockPatern--modPattern
            "b--m_v"         blockPatern--modPattern_valuePattern
            "b__e"           blockPatern__elemPattern
            "b__e--m"        blockPatern__elemPattern--modPattern
            "b__e--m_v"      blockPatern__elemPattern--modPattern_valuePattern
            */
            const bemTokens = BemTokens.from('b__e--m_v');
            console.log('==classNameAST====');
            console.log(bemTokens);
            expect(false).toBe(false);
        });
    });
});

// block[__element][--modifier[_value]]
