import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { processHttpErrorResponse } from '../../api';
import articleService from './article.service';
import { alertSuccess } from '../ui/alert.slice';
import { showLoading, hideLoading } from '../ui/loading.slice';

const initialState = {
  articles: [],
};

export const createArticle = createAsyncThunk('article/createArticle', async ({ articleData, onArticleCreated }, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());

  try {
    const { data: article, message } = await articleService.createArticle(articleData);
    if (onArticleCreated) onArticleCreated();
    dispatch(hideLoading());
    dispatch(alertSuccess({ message }));

    return { article };
  } catch (error) {
    processHttpErrorResponse({ dispatch, error });

    return rejectWithValue(error?.response?.data);
  }
});

export const getArticles = createAsyncThunk('article/getArticles', async (_, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());

  try {
    const { data: articles } = await articleService.getArticles();

    return { articles };
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  } finally {
    dispatch(hideLoading());
  }
});

export const updateArticle = createAsyncThunk('article/updateArticle', async ({ articleId, articleData, onArticleUpdated }, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());

  try {
    const { data: article, message } = await articleService.updateArticle(articleId, articleData);
    if (onArticleUpdated) onArticleUpdated();
    dispatch(hideLoading());
    dispatch(alertSuccess({ message }));

    return { article };
  } catch (error) {
    processHttpErrorResponse({ dispatch, error });

    return rejectWithValue(error?.response?.data);
  }
});

export const deleteArticle = createAsyncThunk('article/deleteArticle', async ({ articleId }, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());

  try {
    const { data: article, message } = await articleService.deleteArticle(articleId);
    dispatch(hideLoading());
    dispatch(alertSuccess({ message }));

    return { article };
  } catch (error) {
    processHttpErrorResponse({ dispatch, error });

    return rejectWithValue(error?.response?.data);
  }
});

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createArticle.fulfilled, (state, { payload }) => {
      state.articles.unshift(payload.article);
    });

    builder.addCase(getArticles.fulfilled, (state, { payload }) => {
      state.articles = payload.articles;
    });

    builder.addCase(updateArticle.fulfilled, (state, { payload }) => {
      state.articles = state.articles.map((article) => {
        if (article.id === payload.article.id) return payload.article;

        return article;
      });
    });

    builder.addCase(deleteArticle.fulfilled, (state, { payload }) => {
      state.articles = state.articles.filter((article) => article.id !== payload.article.id);
    });
  },
});

export default articleSlice.reducer;
