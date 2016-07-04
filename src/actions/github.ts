import {
  GET_ISSUES,
  GOTO_PAGE,
  VIEW_ISSUE,
} from '../constants';
import {Issue} from '../reducers/Entities/Issue';

export enum ACTION { GetIssues, GetComments, ViewIssue, IssuesReceivedFromServer, ChangePage }

export interface IIssueAction {
  type: ACTION;
  issue?: Issue;
}

export interface IGetAllIssuesAction {
  type: ACTION;
  issues?: Issue[];
}

export interface IChangePageAction {
  type: ACTION;
  pageNumber?: number;
}

export function GetIssuesFromServer(page: number = 0) {
  return dispatch => {
    fetch(
      'http://localhost:3000/api/getIssues?' +
            'page=' + page
    )
      .then(response => response.json())
      .then(json => dispatch(updateIssues(json)))
      .then(json => dispatch(updatePageNumber(page)));
  };
}

export function GetCommentsFromServer(issueId: number, page: number = 0) {
  return dispatch => {
    fetch(
      'http://localhost:3000/api/getComments/' +
            issueId +
            '/comments' + 
            '?page=' + page
    )
      .then(response => response.json())
      .then(json => dispatch(updateIssues(json)));
  };
}

export function viewIssue(issue: Issue): IIssueAction {
  return {
    issue: issue,
    type: ACTION.ViewIssue,
  };
};

export function updateIssues(json: Issue[]): IGetAllIssuesAction {
  return {
    issues: json,
    type: ACTION.IssuesReceivedFromServer,
  };
};

export function updatePageNumber(json: number): IChangePageAction {
  return {
    pageNumber: json,
    type: ACTION.ChangePage,
  };
};
