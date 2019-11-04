import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardForm from '../CardForm/CardForm';

export default class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Date.now(),
      title: '',
      color: '#c9c9c9',
      description: '',
      status: 'T',
      tasks: []
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
        buttonLabel="Create card"
        draftCard={this.state}
        handleClose={this.handleClose}
        handleFormChange={this.handleFormChange}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.objectOf(PropTypes.func),
  history: PropTypes.objectOf(PropTypes.any)
};
