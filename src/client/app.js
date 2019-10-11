import React from 'react';
import ReactDOM from 'react-dom';
import KanbanLight from './components/KanbanLight/KanbanLight';
import * as mockData from '../../__mocks__/data.json';

const { cardsList } = mockData;

const component = (
  <div>
    <KanbanLight cards={cardsList} />
  </div>
);
const appDiv = document.getElementById('root');

ReactDOM.render(component, appDiv);
