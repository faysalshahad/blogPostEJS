
// Exporting this module. This code is useful when we export only one function
module.exports.blogPostTextTruncate = textTruncateFunction;

function textTruncateFunction(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };