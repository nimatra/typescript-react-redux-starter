/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import { GetIssuesFromServer } from '../actions';
import {GithubState} from '../Store/GithubState';
import {Issue} from '../Store/Issue';
import {IssuesList} from './IssuesList';
import {ContentAdd} from 'material-ui/lib/svg-icons/content/add';
import {ContentRemove} from 'material-ui/lib/svg-icons/content/remove';
import {Colors} from 'material-ui/lib/styles';
import {IconButton, FloatingActionButton, AppBar} from 'material-ui';

interface IAppProps {
  dispatch?: (func: any) => void;
  allIssues?: Issue[];
  pageNumber?: number;
}

const contentStyle = {
  margin: '10px'
};
const pageStyle = {
  marginRight: 20,
};

function select(state: GithubState): IAppProps {
  return {
    allIssues: state.allIssues,
    pageNumber: state.pageNumber,
  };
}

@connect(select)
export class App extends React.Component<IAppProps, {}> {
  private smDisplayName: string;
  public componentDidMount() {
    const {dispatch, allIssues} = this.props;
    if (allIssues == null || allIssues[0] === undefined) {
      dispatch(GetIssuesFromServer());
    }
  }

  public shouldComponentUpdate(nextProps: IAppProps, nextState: any) {
    const {dispatch, allIssues} = nextProps;
    return true;
  }

  public render(): React.ReactElement<{}> {
    var { dispatch, allIssues, pageNumber }: any = this.props;

    return (
      <div style={contentStyle}>
        <AppBar title='Github Issue Viewer'
          iconElementRight={
            <IconButton onClick={() => window.location.href = 'https://github.com/nimatra/GithubIssueViewer'}>
              <img src='/public/github.png' />
            </IconButton>}
          />
        <IssuesList allIssues={allIssues} dispatch={dispatch}/>

        <FloatingActionButton mini={true} secondary={true} style={pageStyle}
          onClick={() => this.goToPage(this.props, -1) }>
          <ContentRemove />
        </FloatingActionButton>

        <FloatingActionButton disabled={true} style={pageStyle} label={pageNumber}>
        </FloatingActionButton>

        <FloatingActionButton mini={true} secondary={false} style={pageStyle}
          onClick={() => this.goToPage(this.props,  1) } >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
  private goToPage(props: IAppProps, change: number): void {
    props.dispatch(GetIssuesFromServer(props.pageNumber + change));
  }
}
