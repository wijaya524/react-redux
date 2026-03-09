/* eslint-disable linebreak-style */
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  DELETE_THREAD: 'DELETE_THREAD',
  UPDATE_THREAD: 'UPDATE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function deleteThreadActionCreator(threadId) {
  return {
    type: ActionType.DELETE_THREAD,
    payload: { threadId },
  };
}

// Thunk untuk mengambil semua threads (sudah dipopulate dengan user)
function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getPopulatedThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// REVISI: Menggunakan title, body, dan category
function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteThread(threadId);
      dispatch(deleteThreadActionCreator(threadId));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  deleteThreadActionCreator,
  asyncPopulateThreads,
  asyncAddThread,
  asyncDeleteThread,
};