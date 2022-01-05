const {substitution} = require('../src/substitution.js');
const {expect} = require('chai');

describe("substitution() tests written by Madison", () => {
    // case1: function exists
    it("should verify the function exists.", () => {
        expect(substitution).to.be.a("function");
    })

    describe("Encoding a message ...", () => {
        // case1: happy path, encode
        it("should return the encrypted string based on the substitution alphabet.", () => {
            const message = "thinkful";
            const expected = "jrufscpw";
            const actual = substitution(message, "xoyqmcgrukswaflnthdjpzibev");

            expect(actual).to.equal(expected);
        });

        // case2: happy path, encode maintaining spaces
        it("should return the encrypted string based on the substitution alphabet with any spaces.", () => {
            const message = "You are an excellent spy";
            const expected = "elp xhm xf mbymwwmfj dne";
            const actual = substitution(message, "xoyqmcgrukswaflnthdjpzibev");

            expect(actual).to.equal(expected);
        });

        // case3: happy path, encode with special characters
        it("should return the encrypted string, including special characters.", () => {
            const message = "message";
            const expected = "y&ii$r&";
            const actual = substitution(message, "$wae&zrdxtfcygvuhbijnokmpl");

            expect(actual).to.equal(expected);
        });

        // case4: invalid alphabet given 
        it("should return 'false' when the substitution alphabet is too short or too long.", () => {
            const message = "thinkful";
            const short = substitution(message, "xoyqmcgrukswaf");                      // too short
            const long = substitution(message, "xoyqmcgrukswaflnthdjpzibeverf23rfwfw"); // too long

            expect(short).to.be.false.and.equal(long);
        });

        // case5: invalid alphabet given 
        it("should return 'false' when the substitution alphabet includes repeating characters.", () => {
            const message = "thinkful";
            const actual = substitution(message, "xoyqmcgruksffflnthdjpzibev"); // contains repeating characters

            expect(actual).to.be.false;
        });
    });

    describe("Decoding a message ...", () => {
        // case1: happy path, decode
        it("should return the correct string after decryption.", () => {
            const message = "jrufscpw";
            const expected = "thinkful";
            const actual = substitution(message, "xoyqmcgrukswaflnthdjpzibev", false); 

            expect(actual).to.equal(expected);
        });

        // case2: happy path, decode with special characters
        it("should return the correct string after decryption, including special characters.", () => {
            const message = "y&ii$r&";
            const expected = "message";
            const actual = substitution( message, "$wae&zrdxtfcygvuhbijnokmpl", false); 

            expect(actual).to.equal(expected);
        });

        // case3: happy path, decode maintaining spaces
        it("should return the correct after decryption, including any spaces.", () => {
            const message = "elp xhm xf mbymwwmfj dne";
            const expected = "you are an excellent spy";
            const actual = substitution(message, "xoyqmcgrukswaflnthdjpzibev", false);

            expect(actual).to.equal(expected);
        });

        // case4: invalid argument(s)
        it("should return 'false' when missing any necessary arguments.", () => {
            const message = substitution("xoyqmcgrukswaflnthdjpzibev", false); // message arg. missing
            const alphab = substitution("sentence", false);                    // alphabet arg. missing
            const none = substitution(false);                                  // both args. missing

            expect(message).to.equal(alphab).and.equal(none).and.be.false;
        });
    });
});
