import { EnthusiasmAction } from '../actions';
import { Enthusiasm } from '../types';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants';

export default (
  state = {
    enthusiasmLevel: 10,
    languageName: 'TypeScript',
  },
  action: EnthusiasmAction
): Enthusiasm => {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1),
      };
  }
  return state;
};
