import axios from 'axios';

import { alertFailure } from '../store/ui/alert.slice';
import { hideLoading } from '../store/ui/loading.slice';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const jsonContentTypeHeader = { 'Content-Type': 'application/json' };

function processHttpErrorResponse({ dispatch, error }) {
  const { errorMessage } = parseErrorResponse(error);
  dispatch(hideLoading());
  if (errorMessage) dispatch(alertFailure({ message: errorMessage }));
}

function parseErrorResponse(error) {
  const errorMessage = error.response?.data?.message ?? error.message;
  const errors = error.response?.data?.data;

  return { errorMessage, errors };
}

export { httpClient, jsonContentTypeHeader, processHttpErrorResponse };
