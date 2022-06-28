import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import ArticleFormStyled from './ArticleForm.styled';
import AdditionalDataForm from './AdditionalDataForm';

export default function ArticleForm({ formState = {}, formErrors = {}, onChange, onUpdateFormState, onSubmit, onHide }) {
  return (
    <ArticleFormStyled>
      <header>
        <Typography variant="h5">Article</Typography>
        <IconButton aria-label="close" color="inherit" onClick={onHide}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </header>
      <TextField
        variant="filled"
        fullWidth
        label="Nom"
        name="title"
        defaultValue={formState.title}
        required
        error={!!formErrors.title}
        helperText={formErrors.title}
        onChange={onChange}
      />
      <TextField variant="filled" fullWidth label="Description" name="description" multiline rows={4} defaultValue={formState.description} onChange={onChange} />
      <TextField
        variant="filled"
        fullWidth
        label="Photo"
        name="fileUrl"
        defaultValue={formState.fileUrl}
        error={!!formErrors.fileUrl}
        helperText={formErrors.fileUrl}
        onChange={onChange}
      />
      <AdditionalDataForm title={formState.title} initialData={formState.data} formErrors={formErrors} onUpdateFormState={onUpdateFormState} />
      <Button variant="contained" onClick={onSubmit}>
        Enregistrer
      </Button>
    </ArticleFormStyled>
  );
}
ArticleForm.propTypes = {
  formState: PropTypes.shape({}),
  formErrors: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onUpdateFormState: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
