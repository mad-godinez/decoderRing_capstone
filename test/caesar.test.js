const {caesar} = require("../src/caesar.js");
const {expect} = require("chai");

describe("caesar() tests written by Mad", () => {
    // case1: the function exists
    it("should verify the function exists.", () => {
        expect(caesar).to.be.a("function");
    });

    // case2: happy path -- (+)encode
    it ("should return the correct encoded string, R-shift.", () => {    
        const input = "thinkful";
        const shift = 3;
        const encode = true;
        const expected = "wklqnixo";
        const actual = caesar(input, shift, encode);
        expect(actual).to.equal(expected);
    });

    // case3: happy path -- (+)decode
    it ("should return the correct decoded string, R-shift.", () => {    
        const input = "wklqnixo";
        const shift = 3;
        const encode = false;
        const expected = "thinkful";
        const actual = caesar(input, shift, encode);
        expect(actual).to.equal(expected);
    });

    // case4: happy path -- (-)encode
    it ("should return the correct encoded string, L-shift.", () => {    
        const input = "thinkful";
        const shift = -3;
        const encode = true;
        const expected = "qefkhcri";
        const actual = caesar(input, shift, encode);
        expect(actual).to.equal(expected);
    });

    // case5: happy path -- (-)decode
    it ("should return the correct decoded string, L-shift.", () => {    
        const input = "qefkhcri";
        const shift = -3;
        const encode = false;
        const expected = "thinkful";
        const actual = caesar(input, shift, encode);
        expect(actual).to.equal(expected);
    });

    // case6-9: invalid value given for shift
    it("should return false when the shift value is invalid.", () => {
        const input = "thinkful";
        const zero = caesar(input, 0);      // shift === 0
        const less = caesar(input, -40);    // shift < -25
        const greater = caesar(input, 40);  // shift > 25
        const dne = caesar(input);          // shift is not given
        
        expect(zero && less && greater && dne).to.be.false;      
    });

    // case10: happy path -- encode ignoring capital letters
    it("should return a lower-case encoded string.", () => {
        const expected = "bpqa qa i amkzmb umaaiom!";
        const actual = caesar("This is A secret message!", 8);
       
        expect(actual).to.equal(expected);
    });
    
    // case11: happy path -- decode ignoring capital letters
    it("should return a lower-case string that has been decoded.", () => {
        const expected = "this is a secret message!";
        const actual = caesar("BPQA qa I amkzmb umaaiom!", 8, false)
        expect(actual).to.equal(expected);
    });
});
