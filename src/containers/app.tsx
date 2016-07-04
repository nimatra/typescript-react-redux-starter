import * as React from 'react';
const connect = require('react-redux').connect;
const Link = require('react-router').Link;

import { loginUser, logoutUser } from '../actions/session';
import {IssuesList} from '../components/IssuesList';
import {ContentAdd} from 'material-ui/svg-icons/content/add';
import {ContentRemove} from 'material-ui/svg-icons/content/remove';
import {IconButton, FloatingActionButton, AppBar} from 'material-ui';
import {Issue} from '../reducers/Entities/Issue';
import {GetIssuesFromServer, viewIssue} from '../actions/github';

interface IAppProps extends React.Props<any> {
  allIssues?: Issue[];
  pageNumber?: number;
  goToPage: (props: IAppProps, change: number) => void;
  viewIssue: (issue: Issue) => void;
};

const contentStyle = {
  margin: '10px'
};
const pageStyle = {
  marginRight: 20,
};

function mapStateToProps(state) {
  return {
  allIssues: state.allIssues,
  pageNumber: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToPage: (props: IAppProps, change: number) => dispatch(GetIssuesFromServer(props.pageNumber + change)),
    viewIssue: (issue: Issue) => dispatch(viewIssue(issue)),
    logout: () => dispatch(logoutUser()),
  };
}

class App extends React.Component<IAppProps, void> {
  render() {
    const { children, allIssues, pageNumber, goToPage } = this.props;

    return (
      <div style={contentStyle}>
        <AppBar title='Github Issue Viewer'
          iconElementRight={
            <IconButton onClick={() => window.location.href = 'https://github.com/nimatra/GithubIssueViewer'}>
              <img src='/public/github.png' />
            </IconButton>}
          />
        <IssuesList allIssues={allIssues} viewIssue={viewIssue}/>

        <FloatingActionButton mini={true} secondary={true} style={pageStyle}
          onClick={() => goToPage(this.props, -1) }>
          <ContentRemove />
        </FloatingActionButton>

        <FloatingActionButton disabled={true} style={pageStyle} label={pageNumber}>
        </FloatingActionButton>

        <FloatingActionButton mini={true} secondary={false} style={pageStyle}
          onClick={() => goToPage(this.props,  1) } >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
