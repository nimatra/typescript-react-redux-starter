import {
  GET_ISSUES,
  GOTO_PAGE,
  VIEW_ISSUE,
} from '../constants';
import {Issue} from './Entities/Issue';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  activeIssue: <Issue>{},
  allIssues: <Issue[]>[],
  pageNumber: 0,
});

function githubReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case GET_ISSUES:
      return state.merge(fromJS({
        activeIssue: <Issue>{},
        allIssues: action.payload.allIssues,
        pageNumber: action.payload.page,
      }));

    case GOTO_PAGE:
      return state.merge(fromJS({
        activeIssue: <Issue>{},
        pageNumber: action.payload.page,
      }));

    case VIEW_ISSUE:
      return state.merge(fromJS({
        activeIssue: action.payload.issue,
      }));

    default:
      return state;
  }
}

export default githubReducer;
