const {polybius} = require('../src/polybius.js');
const {expect} = require('chai');

describe("Polybius() tests written by Mad: ", () => {
    // case1: function exists
    it("should verify the function exists.", () => {
        expect(polybius).to.be.a("function");
    });
    
    describe("Encoding a message ...", () => {
        //  case1: happy path,  encode
        it("should return the correct encoded string of coordinates.", () => {
            const message = "thinkful";
            const expected = "4432423352125413";
            const actual = polybius(message);

            expect(actual).to.equal(expected);
        });

        //  case2: happy path, encode maintaining spaces
        it("should return an encoded string that maintains given spaces.", () => {
            const message = "Hello world";
            const expected = "3251131343 2543241341";
            const actual = polybius(message);
            
            expect(actual).to.equal(expected);
        });
    });

    describe("Decoding coordinates ...", () => {
        //  case1: happy path, decode
        it("should return the decoded message string.", () => {
            const message = "4432423352125413";
            const expected = "thi,jnkful";
            const actual = polybius(message, false);

            expect(actual).to.equal(expected);
        });
        //  case2: happy path, decode maintaining spaces
        it("should return the decoded message string, including spaces.", () => {
            const message = "3251131343 2543241341";
            const expected = "hello world";
            const actual = polybius(message, false);
            
            expect(actual).to.equal(expected);
        });

        //  case3: invalid number of coordinates given
        it("should return 'false' when decoding an odd number of coordinates, not including spaces.", () => {
            const message = "44324233521254134"; //17 coordinates
            const actual = polybius(message, false); 
            expect(actual).to.be.false;
        });
    });
});
