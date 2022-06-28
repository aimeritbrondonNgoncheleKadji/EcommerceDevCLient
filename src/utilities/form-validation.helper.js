import { isNullishOrEmpty, isValidURL } from './data-validation.helper';

function validateForm(formState = {}, formFields = []) {
  return formFields.reduce(
    ({ validForm, formErrors }, { property, label, type, fields, validate, required, ...restProps }) => {
      const value = formState[property];
      if (type === 'object') {
        const fieldValidationResult = validateForm(value, fields);
        validForm = validForm && fieldValidationResult.validForm;
        if (!validForm) formErrors[property] = fieldValidationResult.formErrors;
      } else if (type === 'array') {
        const arrayValue = value || [];
        arrayValue.forEach((item, index) => {
          const fieldValidationResult = validateForm(item, fields);
          validForm = validForm && fieldValidationResult.validForm;
          if (!validForm) {
            if (!formErrors[property]) formErrors[property] = {};
            formErrors[property][index] = fieldValidationResult.formErrors;
          }
        });
      } else {
        const { validField, errorMessageSuffix } = validateFieldValue(value, { type, required, ...restProps }, formState);
        validForm = validForm && validField;
        if (!validField) formErrors[property] = label.concat(errorMessageSuffix);
      }
      if (validate) {
        validForm = validForm && validate(formState, formErrors);
      }

      return { validForm, formErrors };
    },
    { validForm: true, formErrors: {} }
  );
}

function validateFieldValue(value, field = {}, formState) {
  const fieldValidation = { validField: true, errorMessageSuffix: '' };
  const { type, dataType, pattern, required = false } = field;

  validateValueRequirement(value, required, fieldValidation, formState);
  if (!fieldValidation.validField || isNullishOrEmpty(value)) return fieldValidation;

  if (type) validateValueType(value, type, fieldValidation);
  if (dataType) validateValueDataType(value, dataType, fieldValidation);
  if (pattern) validateValuePattern(value, pattern, fieldValidation);

  return fieldValidation;
}

function validateValueRequirement(value, required, fieldValidation, formState) {
  const valueRequired = typeof required === 'function' ? required(formState) : required;
  if (valueRequired && isNullishOrEmpty(value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessageSuffix = ' obligatoire';
  }
}

function validateValueType(value, type, fieldValidation) {
  if (typeof value !== type) {
    fieldValidation.validField = false;
    fieldValidation.errorMessageSuffix = ' non valide';
  }
}

function validateValueDataType(value, dataType, fieldValidation) {
  const dataTypeValidationStrategies = { url: isValidURL };
  if (!dataType || !Object.keys(dataTypeValidationStrategies).includes(dataType)) return;
  if (!dataTypeValidationStrategies[dataType](value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessageSuffix = ' non valide';
  }
}

function validateValuePattern(value, pattern, fieldValidation) {
  if (pattern && !pattern.test(value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessageSuffix = ' est non valide';
  }
}

function extractFormStateUpdates(source = {}, formState = {}) {
  const updates = {};
  Object.keys(formState).forEach((property) => {
    if (JSON.stringify(formState[property]) !== JSON.stringify(source[property])) {
      updates[property] = formState[property];
    }
  });

  return updates;
}

export default { validateForm, extractFormStateUpdates };
