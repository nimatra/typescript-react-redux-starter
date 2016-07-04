/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import { viewIssue } from '../actions/github';
import {Issue} from '../reducers/entities/Issue';
import {Labels} from '../components/labels';

import {ActionDescription} from 'material-ui/svg-icons';
import {Card, CardActions, CardText, CardTitle, CardHeader} from 'material-ui';
import {RaisedButton, IconButton, AppBar} from 'material-ui';
import {colors} from 'material-ui/styles';
import {ListItem, Divider} from 'material-ui';
import {Avatar, IconMenu, MenuItem} from 'material-ui';
import {GetCommentsFromServer} from '../actions/github';

const { browserHistory } = require('react-router');
const connect = require('react-redux').connect;


interface IIssueDetailsProps {
    issue?: Issue;
}

const contentStyle = {
    margin: '10px'
};


function mapStateToProps(state) {
  return {
  issue: state.activeIssue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (props: IIssueDetailsProps) => dispatch(GetCommentsFromServer(props.issue.id)),
  };
}

class IssueDetails extends React.Component<IIssueDetailsProps, {}> {

    public shouldComponentUpdate(nextProps: IIssueDetailsProps, nextState: any) {
        const {issue} = nextProps;
        return this.props.issue !== nextProps.issue;
    }

    public render(): React.ReactElement<{}> {
        let { issue }: IIssueDetailsProps = this.props;
        if (issue === undefined || issue == null || issue.user === undefined) {
            browserHistory.push('/app');
            return null;
        }
        // onExpandChange={() => window.location.href = issue.user.html_url}
        return (
            <div>
                <Card>
                    <CardHeader
                        title={'@' + issue.user.login}
                        avatar={issue.user.avatar_url}
                        />
                    <CardTitle title={issue.title}  />
                    <CardText>
                        {issue.body}
                    </CardText>
                </Card>
                <Labels allLabels={issue.labels}/>
            </div>
        );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueDetails);
