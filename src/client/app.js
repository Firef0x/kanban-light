import React from 'react';
import ReactDOM from 'react-dom';
import KanbanLightContainer from './containers/KanbanLightContainer/KanbanLightContainer';

/* Import Less styles */
import './app.less';

const component = (
  <div id="app">
    <KanbanLightContainer />
  </div>
);
const appDiv = document.getElementById('root');

ReactDOM.render(component, appDiv);
