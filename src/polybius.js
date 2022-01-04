/*
polybius() 
  accepts 2 parameters:
    input - string to be encoded or decoded.
    encode - boolean to indicate if you should encode or decode the message.
  returns: 
    if encoded - string of numerical coordinate pairs representing input message
    if decoded - string of text representing input coordinates 
*/
const polybiusModule = (function () {

  function makeChart(){
/* HELPER -- creates a polybius chart */
    const polybox = [
      {
        "letter" : 'a',
        "col": 1,
        "row": 1
      },
      {
        "letter" : 'f',
        "col": 1,
        "row": 2
      },
      {
        "letter" : 'l',
        "col": 1,
        "row": 3
      },
      {
        "letter" : 'q',
        "col": 1,
        "row": 4
      },
      {
        "letter" : 'v',
        "col": 1,
        "row": 5
      },
      {
        "letter" : 'b',
        "col": 2,
        "row": 1
      },
      {
        "letter" : 'g',
        "col": 2,
        "row": 2
      },
      {
        "letter" : 'm',
        "col": 2,
        "row": 3
      },
      {
        "letter" : 'r',
        "col": 2,
        "row": 4
      },
      {
        "letter" : 'w',
        "col": 2,
        "row": 5
      },
      {
        "letter" : 'c',
        "col": 3,
        "row": 1
      },
      {
        "letter" : 'h',
        "col": 3,
        "row": 2
      },
      {
        "letter" : 'n',
        "col": 3,
        "row": 3
      },
      {
        "letter" : 's',
        "col": 3,
        "row": 4
      },
      {
        "letter" : 'x',
        "col": 3,
        "row": 5
      },
      {
        "letter" : 'd',
        "col": 4,
        "row": 1
      },
      {
        "letter" : 'o',
        "col": 4,
        "row": 3
      },
      {
        "letter" : 't',
        "col": 4,
        "row": 4
      },
      {
        "letter" : 'y',
        "col": 4,
        "row": 5
      },
      {
        "letter" : 'e',
        "col": 5,
        "row": 1
      },
      {
        "letter" : 'k',
        "col": 5,
        "row": 2
      },
      {
        "letter" : 'p',
        "col": 5,
        "row": 3
      },
      {
        "letter" : 'u',
        "col": 5,
        "row": 4
      },
      {
        "letter" : 'z',
        "col": 5,
        "row": 5
      },
    ];

    return polybox;
  }
  function coordinates(target){
    /* HELPER
      ** when encoding ... 
        * accepts: target character to find in array of letter objects
        * returns: the string combination of col+row where the letter was found
      ** when decoding ...
        * accepts: an array with 2 elements, [col #, row #]
        * returns: the letter associated with the given col+row
    */    
    const chart = makeChart();

    if(typeof target === "string"){
      if(target === 'i' || target === 'j') return "42";

      const char_obj = chart.find((item) => {if(item.letter === target) return item;});
      return (String(char_obj.col) + String(char_obj.row));
    } else {
      if(target[0] == 4 && target[1] == 2) return ['i', 'j'];

      const char_obj = chart.find((item) => {
        if(item.col == target[0] && item.row == target[1]) return item;});
      return char_obj.letter;
    } 
  }

  function polybius(input, encode = true) {
    
    input = input.toLowerCase();
   
    if(encode){
      let encoded = "";
      for(let i = 0; i < input.length; i++){
        const current_ch = input.charAt(i);
        current_ch === " " ? 
            encoded += current_ch : 
            encoded += coordinates(current_ch);
      }
      return encoded;
    }
    // handles input string with incorrect num of coordinate pairs + spaces
    if(!input.includes(" ") && input.length % 2 !== 0 
      || input.includes(" ") && input.length % 2 == 0) return encode;

    let decoded = "";
    for(let i = 0; i < input.length; i+=2){
      const first_char = input.charAt(i);
      const second_char = input.charAt(i+1);
      if(first_char === " ") {
        decoded += first_char;
        i--;    // ignores odd # to maintain accurate coordinate pairs after " "
      } else {
        const current_coord = [first_char, second_char];
        let current_letter = coordinates(current_coord);
        decoded += current_letter;
      }
    }
    return decoded;
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
