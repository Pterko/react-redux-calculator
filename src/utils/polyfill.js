/* eslint-disable no-restricted-globals */
/* eslint-disable no-extend-native */

String.prototype.isNumeric = function() {
  return !isNaN(parseFloat(this)) && isFinite(this);
};

Array.prototype.clean = function() {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};
