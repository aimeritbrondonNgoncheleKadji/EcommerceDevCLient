import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { createArticle, deleteArticle, updateArticle } from '../../store/articles/article.slice';
import { FORM_MODES } from '../../utilities/enums';
import { isNonEmptyObject } from '../../utilities/data-validation.helper';
import formValidationHelper from '../../utilities/form-validation.helper';
import { articleFormFieldsDescriptor } from '../../utilities/form_fields_descriptors';

import ArticleForm from '../core/articles/ArticleForm';
import Articles from '../core/articles/Articles';
import AppMainStyled from './AppMain.styled';
import useForm from '../hooks/useForm';

export default function AppMain({ articleFormShown, onHideArticleForm, onShowArticleForm }) {
  const dispatch = useDispatch();
  const articleState = useSelector((state) => state.articleState);
  const loadingState = useSelector((state) => state.loadingState);
  const { formState, formErrors, formMode, setFormMode, setFormErrors, handleChange, handleUpdateFormState, handleResetFormState } = useForm();
  const [selectedArticle, setSelectedArticle] = useState({});

  function handleOpenEditArticleForm(article) {
    setSelectedArticle(article);
    handleResetFormState(article);
    setFormMode(FORM_MODES.EDITION);
    onShowArticleForm();
  }

  function handleSubmitArticleForm() {
    if (loadingState.shown) return;

    const validationResult = formValidationHelper.validateForm(formState, articleFormFieldsDescriptor);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm) {
      if (formMode === FORM_MODES.EDITION) handleUpdateArticle();
      else handleCreateArticle();
    }
  }

  function handleCreateArticle() {
    dispatch(createArticle({ articleData: formState, onArticleCreated: onHideArticleForm }));
  }

  function handleUpdateArticle() {
    const updates = formValidationHelper.extractFormStateUpdates(selectedArticle, formState);
    if (isNonEmptyObject(updates)) {
      dispatch(updateArticle({ articleId: selectedArticle.id, articleData: updates }));
    }
  }

  function handleDeleteArticle(article) {
    dispatch(deleteArticle({ articleId: article.id }));
  }

  function handleHideArticleForm() {
    onHideArticleForm();
    handleResetFormState();
    setSelectedArticle({});
  }

  return (
    <AppMainStyled>
      <Articles
        viewMode={articleFormShown ? 'shrinked' : 'expanded'}
        articles={articleState.articles}
        articleFormShown={articleFormShown}
        onOpenEditArticleForm={handleOpenEditArticleForm}
        onDeleteArticle={handleDeleteArticle}
      />

      {articleFormShown && (
        <ArticleForm
          formState={formState}
          formErrors={formErrors}
          onChange={handleChange}
          onUpdateFormState={handleUpdateFormState}
          onSubmit={handleSubmitArticleForm}
          onHide={handleHideArticleForm}
        />
      )}
    </AppMainStyled>
  );
}
AppMain.propTypes = {
  articleFormShown: PropTypes.bool,
  onShowArticleForm: PropTypes.func.isRequired,
  onHideArticleForm: PropTypes.func.isRequired,
};
