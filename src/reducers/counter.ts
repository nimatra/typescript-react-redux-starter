import {
  VIEW_ISSUE,
  GET_ISSUES,
  GOTO_PAGE
} from '../constants';
import { fromJS } from 'immutable';


const INITIAL_STATE = fromJS({
  count: 0,
});

function counterReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {

  case VIEW_ISSUE:
    return state.update('count', (value) => value + 1);

  case GET_ISSUES:
    return state.update('count', (value) => value - 1);

  case GOTO_PAGE:
    return state.merge(INITIAL_STATE);

  default:
    return state;
  }
}


export default counterReducer;
