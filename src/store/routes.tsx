import * as React from 'react';
const { IndexRoute, Route } = require('react-router');

import App from '../containers/app';
import IssueDetails from '../containers/IssueDetails';


export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ App }/>
    <Route path="details" component={ IssueDetails }/>
  </Route>
);
