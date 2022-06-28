import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import AppHeaderStyled from './AppHeader.styled';

export default function AppHeader({ articleFormShown, onOpenCreateArticleForm }) {
  return (
    <AppHeaderStyled>
      <Typography variant="h3">Catalogue</Typography>
      <Button variant="contained" startIcon={<AddIcon />} disabled={articleFormShown} onClick={onOpenCreateArticleForm}>
        Creer un produit
      </Button>
    </AppHeaderStyled>
  );
}
AppHeader.propTypes = {
  articleFormShown: PropTypes.bool,
  onOpenCreateArticleForm: PropTypes.func.isRequired,
};
