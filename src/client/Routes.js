import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import KanbanLightContainer from './containers/KanbanLightContainer/KanbanLightContainer';

/* Import Less styles */
import './App.less';

const Routes = (
  <BrowserRouter>
    <div id="app">
      <Route component={KanbanLightContainer} />
    </div>
  </BrowserRouter>
);

export default Routes;
