'use strict'

//************************** LODASH library **************************
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
//************************** LODASH END **************************

//Lambda-expression
const showResult = (result) => console.log(`The result is: ${result}`);

//example of functions chaining 
var names = ["asas", "GGHHDGdh hhh hss1 121212", "1212122", "3sjshhs2 fh", "hdhdhdh Hd", "d", "  ", "N"];
showResult(_.chain(names)
 .map(s => s.replace(/_/, ' '))
 .map(_.startCase)
 .sort()
 .value());


//---------------- example BEGIN -------------------
function zipCode(code, location) {
  let _code = code;
  let _location = location || '';
  return {
    code: function () {
      return _code;
    },
    location: function () {
      return _location;
    }
  };
}
const princetonZip = zipCode('08544', '3345');
// console.log(princetonZip.code()); //-> '08544'
//---------------- example END -------------------

function makeMultiply(base) {
  function multiplier(factor) {
    return base * factor;
  }
  return multiplier;
}


const multiplyFiveOn = makeMultiply(5);
// showResult(multiplyFiveOn(5));
