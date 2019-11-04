/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardForm extends Component {
  handleClose = (event) => {
    event.preventDefault();
    this.props.handleClose();
  }

  handleFormChange = (field, event) => {
    this.props.handleFormChange(field, event);
  }

  handleFormSubmit = (event) => {
    this.props.handleFormSubmit(event);
  }

  render() {
    const { buttonLabel, draftCard } = this.props;
    return (
      <div>
        <div className="card__container big">
          <form>
            <input
              id="cardForm--title"
              onChange={this.handleFormChange.bind(this, 'title')}
              required
              type="text"
              value={draftCard.title}
            />
            <textarea
              id="cardForm--description"
              onChange={this.handleFormChange.bind(this, 'description')}
              placeholder="Please input the description"
              value={draftCard.description}
            />
            <label
              id="cardForm__label--status"
              htmlFor="cardForm--status"
            >
              Status
            </label>
            <select
              id="cardForm--status"
              onBlur={this.handleFormChange.bind(this, 'status')}
              value={draftCard.status}
            >
              <option value="T">Todo</option>
              <option value="I">In progress</option>
              <option value="D">Done</option>
            </select>
            <br />
            <label
              id="cardForm__label--color"
              htmlFor="cardForm--color"
            />
            <input
              defaultValue="#ff0000"
              id="cardForm--color"
              onChange={this.handleFormChange.bind(this, 'color')}
              type="color"
              value={draftCard.color}
            />
            <div className="actions">
              <button
                onClick={this.handleFormSubmit}
                type="submit"
              >
                {buttonLabel}
              </button>
            </div>
          </form>
        </div>
        <div
          className="overlay"
          onClick={this.handleClose}
          role="presentation"
        />
      </div>
    );
  }
}

CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    status: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string
  }),
  handleClose: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};
