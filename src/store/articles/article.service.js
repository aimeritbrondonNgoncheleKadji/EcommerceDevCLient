import { httpClient, jsonContentTypeHeader } from '../../api';
import { ARTICLES_BASE_URL } from '../../api/routes';

async function createArticle(articleData = {}) {
  const { data } = await httpClient.post(ARTICLES_BASE_URL, articleData, {
    headers: jsonContentTypeHeader,
  });

  return data;
}

async function getArticles() {
  const { data } = await httpClient.get(ARTICLES_BASE_URL);

  return data;
}

async function updateArticle(articleId, articleData = {}) {
  const { data } = await httpClient.put(`${ARTICLES_BASE_URL}/${articleId}`, articleData, {
    headers: jsonContentTypeHeader,
  });

  return data;
}

async function deleteArticle(articleId) {
  const { data } = await httpClient.delete(`${ARTICLES_BASE_URL}/${articleId}`);

  return data;
}

export default { createArticle, getArticles, updateArticle, deleteArticle };
