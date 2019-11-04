import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardForm from '../CardForm/CardForm';

export default class EditCard extends Component {
  constructor(props) {
    super(props);
    const selectedCard = props.cards.find((card) => card.id === props.params.cardid);
    this.state = {
      ...selectedCard
    };
  }

  handleClose = () => {
    this.props.history.pushState(null, '/');
  }

  handleFormChange = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
  }

  render() {
    return (
      <CardForm
        buttonLabel="Update card"
        draftCard={this.state}
        handleClose={this.handleClose}
        handleFormChange={this.handleFormChange}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

EditCard.propTypes = {
  cardCallbacks: PropTypes.objectOf(PropTypes.func),
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  params: PropTypes.objectOf(PropTypes.any)
};
