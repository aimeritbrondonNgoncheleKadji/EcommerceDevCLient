import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Chip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { articlePropType } from '../../../utilities/prop-types-schemas';
import { DEFAULT_ARTICLE_URL } from '../../../config/constants';

import ArticleStyled from './Article.styled';

export default function Article({ article, articleFormShown, onOpenEditArticleForm, onDeleteArticle }) {
  return (
    <ArticleStyled>
      <header>
        <img src={article.fileUrl || DEFAULT_ARTICLE_URL} alt="" />
      </header>
      <main>
        <Typography variant="h6">{article.title}</Typography>
        {article.data?.length > 0 && <Chip label={`${article.data.length} attribut(s)`} />}
      </main>
      <footer>
        <Button size="small" variant="outlined" startIcon={<EditIcon />} disabled={articleFormShown} onClick={() => onOpenEditArticleForm(article)}>
          Modifier
        </Button>
        <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} disabled={articleFormShown} onClick={() => onDeleteArticle(article)}>
          Supprimer
        </Button>
      </footer>
    </ArticleStyled>
  );
}
Article.propTypes = {
  article: articlePropType,
  articleFormShown: PropTypes.bool,
  onOpenEditArticleForm: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
};
