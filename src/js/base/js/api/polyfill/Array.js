/**
 * MDN JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 *
 * @see JavaScript
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * @see Standard built-in objects
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
 * @see Array
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * @author skygreen2001 skygreen2001@gmail.com
 */

//@see [Array.isArray]:Polyfill
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
