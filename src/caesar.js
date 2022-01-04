// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

/*

caesar(input, shift, encode);
input - string input to be encoded or decoded
shift - Number input ... (+)num shift->  (-)num shift<- 
encode - bool input if encode or decode ... default = true
*/

const caesarModule = (function () {

  const END_alphabet = 122; // [97,122] = lower letter alphabet 
  const START_alphabet = 97;

  function alphabetLoop(shift){  // HELPER 1: wraps around the alphabet
    if(shift < 0) return END_alphabet + shift;
    return START_alphabet + shift;
  }
  function encoder(letter, shift, encode = true) { // HELPER 2: encodes/decodes
    let shifted = letter;
    encode ? shifted += shift : shifted -= shift;

    // left shift/wrap: encode(-shift) & decode(+shift)
    if(encode && shift < 0 || !encode && shift > 0){
      if (shifted < START_alphabet) 
      return alphabetLoop((shifted - START_alphabet)) + 1;
    }
    // right shift/wrap: encode(+shift) & decode(-shift)
    if(shifted > END_alphabet) 
      return alphabetLoop((shifted - END_alphabet)) - 1;

    return shifted;
  }
  function caesar(input, shift, encode = true) {

    if(!shift || shift < -25 || shift > 25 || shift === 0) return false;

    let coded = "";
    let letter = '';

    input = input.toLowerCase();

    for(let i = 0; i < input.length; i++) {
      let curr_char = input.charCodeAt(i);

      if(curr_char >= START_alphabet && curr_char <= END_alphabet){
        encode ? 
          letter = encoder(curr_char, shift) : // encode
          letter = encoder(curr_char, shift, false) ; // decode
        coded += String.fromCharCode(letter);
      } else {                               // keep whitespace & symbols
        coded += String.fromCharCode(curr_char); 
      }
    }
    return coded;
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
