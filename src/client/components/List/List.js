/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '../Card/Card';

export default class List extends Component {
  render() {
    let arrCards = [];
    const { cards, title } = this.props;
    if (cards && Array.isArray(cards)) {
      arrCards = cards.map(card => (
        <Card
          color={card.color}
          description={card.description}
          id={card.id}
          key={card.id}
          tasks={card.tasks}
          title={card.title}
        />
      ));
    }

    return (
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
  title: PropTypes.string
};
