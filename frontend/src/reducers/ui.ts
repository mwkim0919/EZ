import { combineReducers, AnyAction } from 'redux';

const loadingReducer = (state = {}, action: AnyAction) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  console.log('Request ', action.type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  console.log('Request Match ', action.type);

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
};

const errorReducer = (state = {}, action: AnyAction) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? payload.message : '',
  };
};

export default combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});
