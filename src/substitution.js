/**
substitution(input, alphabet, encode){}
  accepts 3 parameters: 
    * input - string to be encoded or decoded.
    * alphabet - string to represent a substitution alphabet.
    * encode - boolean to indicate if you should encode or decode the message.
  returns:
    * if encoded - a string that's been encrypted based on sub. alphabet
    * if decoded - a string that's been decrypted based on sub. alphabet
 */
const substitutionModule = (function () {

  function isUnique(substitute){
    /* HELPER -- determines if any alphabet characters are repeated */
    for(let i = 0; i < 26; i++){
      const curr_char = substitute[i];
      let count = 0;
      substitute.forEach((letter) => { if(letter == curr_char) return count++;})
      if(count > 1) return false;
    }
    return true;
  }

  function substitution(input="", alphabet="", encode = true) {
    const subAlph = Array.from(alphabet);
    const regAlph = Array.from("abcdefghijklmnopqrstuvwxyz");

    // substitution alphabet only has unique characters & is valid length
    if(!isUnique(subAlph) || alphabet.length !== 26 || !alphabet || !input) return false;

    input = input.toLowerCase();

    if(encode){
      let encoded = "";
      for(let i = 0; i < input.length; i++){
        const curr_char = input.charAt(i);

        curr_char === " " ?       // maintain spaces and then encrypt the string
          encoded += curr_char : 
          encoded += subAlph[regAlph.findIndex((item) => item === curr_char)];
      }
      return encoded;
    }

    let decoded = "";
    for(let i = 0; i < input.length; i++){
      const curr_char = input.charAt(i);

      curr_char === " " ?       // maintain spaces while decrypting the string
        decoded += curr_char : 
        decoded += regAlph[subAlph.findIndex((item) => item === curr_char)];
    }
    return decoded;
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
