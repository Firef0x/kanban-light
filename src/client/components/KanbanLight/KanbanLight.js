import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend/lib/HTML5Backend';
import PropTypes from 'prop-types';
import React from 'react';
import List from '../List/List';

const KanbanLight = ({ cards, cardCallbacks }) => (
  <div className="kanban__container">
    <List
      cards={cards.filter(card => card.status === 'T')}
      cardCallbacks={cardCallbacks}
      id="todo"
      title="To Do"
    />
    <List
      cards={cards.filter(card => card.status === 'I')}
      cardCallbacks={cardCallbacks}
      id="in-progress"
      title="In Progress"
    />
    <List
      cards={cards.filter(card => card.status === 'D')}
      cardCallbacks={cardCallbacks}
      id="done"
      title="Done"
    />
  </div>
);

KanbanLight.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired
};

KanbanLight.defaultProps = {
  cards: [{}]
};

export default DragDropContext(HTML5Backend)(KanbanLight);
