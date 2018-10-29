import { AnyAction } from 'redux';

const initialState: any = [];

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
