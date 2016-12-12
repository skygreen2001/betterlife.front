/**
 * MDN JavaScript Library
 * Copyright (c) 2016 skygreen2001@gmail.com
 *
 * @see JavaScript
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * @see Standard built-in objects
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
 * @see String
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 * @author skygreen2001 skygreen2001@gmail.com
 */

//@see [String.prototype.trim]:Polyfill
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
//@see [String.prototype.endsWith]:Polyfill
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
