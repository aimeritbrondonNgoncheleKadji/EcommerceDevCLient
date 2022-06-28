import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getArticles } from '../store/articles/article.slice';
import { hideAlert } from '../store/ui/alert.slice';

import AppStyled from './App.styled';
import AppHeader from './layout/AppHeader';
import AppMain from './layout/AppMain';
import { Alert, Loading } from './library';
import useDisclosure from './hooks/useDisclosure';

function App() {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alertState);
  const loadingState = useSelector((state) => state.loadingState);
  const articleFormDisclosure = useDisclosure();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleHideAlert = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  function handleOpenCreateArticleForm() {
    articleFormDisclosure.handleShow();
  }

  return (
    <AppStyled>
      <Box>
        <AppHeader articleFormShown={articleFormDisclosure.shown} onOpenCreateArticleForm={handleOpenCreateArticleForm} />
        <AppMain articleFormShown={articleFormDisclosure.shown} onShowArticleForm={articleFormDisclosure.handleShow} onHideArticleForm={articleFormDisclosure.handleHide} />
      </Box>

      <Alert {...alertState} onHide={handleHideAlert} />

      <Loading {...loadingState} />
    </AppStyled>
  );
}

export default App;
