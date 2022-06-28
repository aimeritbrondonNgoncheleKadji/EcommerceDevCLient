import { useState } from 'react';
import { cloneDeep } from 'lodash';

import { isNonEmptyString } from '../../utilities/data-validation.helper';

export default function () {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formMode, setFormMode] = useState();

  function handleChange({ target: { name, value } }) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [name]: isNonEmptyString(value) ? value.trim() : value,
    }));
    setFormErrors((currentFormErrors) => {
      if (currentFormErrors[name]) {
        const clone = cloneDeep(currentFormErrors);
        delete clone[name];

        return clone;
      }

      return currentFormErrors;
    });
  }

  function handleUpdateFormState(formStateUpdates = {}) {
    setFormState((currentFormState) => ({ ...currentFormState, ...formStateUpdates }));
  }

  function handleResetFormState(formStateUpdates = {}) {
    setFormState(formStateUpdates);
    setFormErrors({});
    setFormMode('');
  }

  return {
    formState,
    formErrors,
    formMode,
    setFormErrors,
    setFormMode,
    handleChange,
    handleUpdateFormState,
    handleResetFormState,
  };
}
