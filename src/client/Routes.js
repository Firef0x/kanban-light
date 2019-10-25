import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import KanbanLightContainer from './containers/KanbanLightContainer/KanbanLightContainer';
import KanbanLight from './components/KanbanLight/KanbanLight';

/* Import Less styles */
import './app.less';

const Routes = (
  <BrowserRouter>
    <div id="app">
      <Route component={KanbanLightContainer}>
        <Route path="/" component={KanbanLight}>
        </Route>
      </Route>
    </div>
  </BrowserRouter>
);

export default Routes;
