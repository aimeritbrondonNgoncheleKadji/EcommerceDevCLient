import React from 'react';
import PropTypes from 'prop-types';

import { articlesPropType } from '../../../utilities/prop-types-schemas';

import ArticlesStyled from './Articles.styled';
import Article from './Article';

export default function Articles({ viewMode = 'expanded', articles = [], articleFormShown, onOpenEditArticleForm, onDeleteArticle }) {
  const props = { viewMode };

  return (
    <ArticlesStyled {...props}>
      <main>
        {articles.map((article) => (
          <Article key={article.id} article={article} articleFormShown={articleFormShown} onOpenEditArticleForm={onOpenEditArticleForm} onDeleteArticle={onDeleteArticle} />
        ))}
      </main>
    </ArticlesStyled>
  );
}
Articles.propTypes = {
  viewMode: PropTypes.oneOf(['expanded', 'shrinked']),
  articles: articlesPropType,
  articleFormShown: PropTypes.bool,
  onOpenEditArticleForm: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
};
