import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { isNonEmptyString } from '../../../utilities/data-validation.helper';
import { isArrayEqual } from '../../../utilities/array.helper';

import AdditionalDataFormStyled from './AdditionalDataForm.styled';

export default function AdditionalDataForm({ initialData = [], formErrors = {}, onUpdateFormState }) {
  const [data, setData] = useState([]);
  const dataRef = useRef();
  useEffect(() => {
    if (initialData.length === 0 && !dataRef.current) return;
    if (!dataRef.current || (dataRef.current && !isArrayEqual(dataRef.current, initialData))) {
      setData([...initialData]);
      dataRef.current = initialData;
    }
  }, [initialData]);

  function onItemChange({ name, value }, itemIndex) {
    const updatedData = data.map((item, index) => {
      if (itemIndex === index) {
        return { ...item, [name]: isNonEmptyString(value) ? value.trim() : value };
      }

      return item;
    });
    applyDataUpdates(updatedData);
  }

  function handleAddItem() {
    applyDataUpdates([...data, {}]);
  }

  function handleDeleteItem(itemIndex) {
    applyDataUpdates(data.filter((_, index) => index !== itemIndex));
  }

  function applyDataUpdates(updatedData) {
    setData(() => updatedData);
    onUpdateFormState({ data: updatedData });
  }

  return (
    <AdditionalDataFormStyled>
      {data.map(({ key, value }, index) => (
        <li key={index}>
          <div>
            <TextField
              fullWidth
              variant="filled"
              label="Clé"
              name="key"
              defaultValue={key}
              onChange={({ target }) => onItemChange(target, index)}
              error={!!extractItemError(formErrors, { index, property: 'key' })}
              helperText={extractItemError(formErrors, { index, property: 'key' })}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Valeur"
              name="value"
              defaultValue={value}
              onChange={({ target }) => onItemChange(target, index)}
              error={!!extractItemError(formErrors, { index, property: 'value' })}
              helperText={extractItemError(formErrors, { index, property: 'value' })}
            />
          </div>
          <IconButton size="small" onClick={() => handleDeleteItem(index)}>
            {<DeleteIcon />}
          </IconButton>
        </li>
      ))}
      <Button onClick={handleAddItem}>Ajouter une ligne</Button>
    </AdditionalDataFormStyled>
  );
}
AdditionalDataForm.propTypes = {
  title: PropTypes.string,
  initialData: PropTypes.arrayOf(PropTypes.shape({})),
  formErrors: PropTypes.shape({}),
  onUpdateFormState: PropTypes.func.isRequired,
};

function extractItemError(formErrors, { index, property }) {
  const { data = {} } = formErrors;
  const itemError = data[index] || {};

  return itemError[property];
}
