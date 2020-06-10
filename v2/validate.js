/* eslint-disable func-names */
/* eslint-disable no-control-regex */

const Validator = function (value) {
  this.error = null;
  this.value = value || '';
};

Validator.prototype.setError = function (error) {
  this.error = error;
  return this;
};

Validator.prototype.isRequired = function () {
  if (this.value === '' || this.value === null || this.value === undefined) {
    this.error = 'Verplicht veld';
  }
  return this;
};

Validator.prototype.isString = function () {
  if (typeof this.value !== 'string') {
    this.error = 'Ongeldige tekens';
  }
  return this;
};

Validator.prototype.minLength = function (min) {
  if (this.value.length < min) {
    this.error = `Nog ${min - this.value.length} tekens nodig`;
  }
  return this;
};

Validator.prototype.maxLength = function (max) {
  if (this.value.length >= max) {
    this.error = `${this.value.length - max} tekens te veel`;
  }
  return this;
};

Validator.prototype.isEmail = function () {
  if (
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      this.value
    ) === false
  ) {
    this.error = 'Voer een geldig emailadres in';
  }
  return this;
};

Validator.prototype.isUrl = function () {
  if (
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
      this.value
    ) === false
  ) {
    this.error = 'Voer een geldige link in';
  }
  return this;
};

const validate = (value) => new Validator(value);

export const validator = {
  title: (title) => validate(title).minLength(3).maxLength(100).isRequired(),
  domain: (domain) => validate(domain).isRequired(),
  description: (description) => validate(description).minLength(50).maxLength(500).isRequired(),
  expectations: (expectations) => validate(expectations).minLength(50).maxLength(500).isRequired(),
  level: (level) => validate(level).isRequired(),
  website: (website) => validate(website).isUrl().minLength(5).maxLength(500),
  email: (email) => validate(email).maxLength(100).isEmail()
};
