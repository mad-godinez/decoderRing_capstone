/*
  caesar(input, shift, encode){}
    accepts 3 parameters:
      * input - string input to be encoded or decoded.
      * shift - Number to represent how much to shift.
          (+)shiftRight  (-)shiftLeft 
      * encode - boolean to indicate if you should encode or decode the message. 
    returns:
      * if encoded - a string containing the encrypted message.
      * if decoded - a string containing the decrypted text. 
*/

const caesarModule = (function () {
  const START_alphabet = 97;
  const END_alphabet = 122; // [97,122] = lower letter alphabet ASCII

  function alphabetLoop(shift){  
    /* HELPER -- 'wraps' the letter around the end/beginning of the alphabet */
    if(shift < 0) return END_alphabet + shift;
    return START_alphabet + shift;
  }
  function encoder(letter, shift, encode = true) { 
    /* HELPER -- encodes/decodes a letter based on the direction of the shift */
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
  /* MAIN -- performs user input validation, calls functions, assembles the complete string to be exported. */
    if(!shift || shift < -25 || shift > 25 || shift === 0) return false;

    let coded = "";
    let letter = '';

    input = input.toLowerCase(); // ignore capital letters

    for(let i = 0; i < input.length; i++) {
      let curr_char = input.charCodeAt(i);
      if(curr_char >= START_alphabet && curr_char <= END_alphabet){
        encode ? 
          letter = encoder(curr_char, shift) :        // encode
          letter = encoder(curr_char, shift, false) ; // decode
        coded += String.fromCharCode(letter);
      } else {                               
        coded += String.fromCharCode(curr_char); // keep whitespace & symbols
      }
    }
    return coded;
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
