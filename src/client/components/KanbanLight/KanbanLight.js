import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';

export default class KanbanLight extends Component {
  render() {
    const { cards, cardCallbacks, children } = this.props;
    const cardModal = (children && React.cloneElement(
      children, {
        cards,
        cardCallbacks,
      }
    )) || '';
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="kanban__container">
          <NavBar />
          <List
            cards={cards.filter((card) => card.status === 'T')}
            cardCallbacks={cardCallbacks}
            id="todo"
            title="To Do"
          />
          <List
            cards={cards.filter((card) => card.status === 'I')}
            cardCallbacks={cardCallbacks}
            id="in-progress"
            title="In Progress"
          />
          <List
            cards={cards.filter((card) => card.status === 'D')}
            cardCallbacks={cardCallbacks}
            id="done"
            title="Done"
          />
          {cardModal}
        </div>
      </DndProvider>
    );
  }
}

KanbanLight.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

KanbanLight.defaultProps = {
  cards: [{}],
  children: null
};
