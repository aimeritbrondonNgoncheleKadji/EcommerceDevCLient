function isString(value) {
  return typeof value === 'string';
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isObject(value) {
  return typeof value === 'object';
}

function isArray(value) {
  return Array.isArray(value);
}

function isNumber(value) {
  return typeof value === 'number';
}

function isNullish(value) {
  return [null, undefined].includes(value);
}

function isNotNull(value) {
  return value !== null && value !== undefined;
}

function isValidValue(value) {
  return !isNullish(value);
}

function isNonEmptyObject(value) {
  return isValidValue(value) && typeof value === 'object' && Object.keys(value).length > 0;
}

function isNonEmptyString(value) {
  return isValidValue(value) && typeof value === 'string' && value.length > 0;
}

function isEmptyObject(object) {
  return isNullish(object) || (typeof object === 'object' && Object.keys(object).length === 0);
}

function isNonEmptyArray(array) {
  return Array.isArray(array) && array.length > 0;
}

function isNullishOrEmpty(value) {
  return (
    isNullish(value) ||
    (Array.isArray(value) && value.length === 0) ||
    (isString(value) && value.length === 0) ||
    (isNumber(value) && value === 0) ||
    (isObject(value) && Object.keys(value).length === 0)
  );
}

function isValidURL(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

export {
  isNotNull,
  isString,
  isBoolean,
  isArray,
  isNumber,
  isValidValue,
  isNullish,
  isNonEmptyObject,
  isNonEmptyString,
  isEmptyObject,
  isNonEmptyArray,
  isNullishOrEmpty,
  isValidURL,
};
