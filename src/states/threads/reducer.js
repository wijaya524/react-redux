/* eslint-disable linebreak-style */
import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.DELETE_THREAD:
    return threads.filter((thread) => thread.id !== action.payload.threadId);
  case ActionType.UPDATE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.thread.id) {
        return { ...thread, ...action.payload.thread };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;