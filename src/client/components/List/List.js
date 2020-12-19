/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Card from '../Card/Card';
import { CARD } from '../../utils/constants';

/* Import Less style */
import './List.less';

class List extends Component {
  render() {
    let arrCards = [];
    const {
      cards,
      cardCallbacks,
      connectDropTarget,
      title
    } = this.props;
    if (cards && Array.isArray(cards)) {
      arrCards = cards.map((card) => (
        <Card
          cardCallbacks={cardCallbacks}
          color={card.color}
          description={card.description}
          id={card.id}
          key={card.id}
          status={card.status}
          tasks={card.tasks}
          title={card.title}
        />
      ));
    }

    return connectDropTarget(
      <div className="list__container">
        <h1>
          {title}
        </h1>
        {arrCards}
      </div>
    );
  }
}

List.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  title: PropTypes.string
};

List.defaultProps = {
  title: ''
};

const listTargetSpec = {
  hover: (props, monitor) => {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateCardStatus(draggedId, props.id);
  }
};

const collectDrop = (connect) => ({
  connectDropTarget: connect.dropTarget()
});

export default DropTarget(CARD, listTargetSpec, collectDrop)(List);
