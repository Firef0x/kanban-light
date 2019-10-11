import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import List from '../List/List';

export default class KanbanLight extends PureComponent {
  render() {
    const { cards } = this.props;
    return (
      <div className="kanban__container">
        <List
          cards={cards.filter(card => card.status === 'T')}
          id="todo"
          title="To Do"
        />
        <List
          cards={cards.filter(card => card.status === 'I')}
          id="in-progress"
          title="In Progress"
        />
        <List
          cards={cards.filter(card => card.status === 'D')}
          id="done"
          title="Done"
        />
      </div>
    );
  }
}

KanbanLight.propTypes = {
  cards: PropTypes.array
};

KanbanLight.defaultProps = {
  cards: []
};
