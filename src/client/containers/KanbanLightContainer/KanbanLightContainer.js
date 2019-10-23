import 'core-js/stable';
import React, { Component } from 'react';
import 'whatwg-fetch';
import KanbanLight from '../../components/KanbanLight/KanbanLight';
import KanbanLightContext from '../../utils/KanbanLightContext';
import { API_HEADERS, API_URL, MOCK_JSON } from '../../utils/constants';
import * as mockData from '../../../../__mocks__/data.json';

export default class KanbanLightContainer extends Component {
  constructor(...args) {
    super(args);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    if (MOCK_JSON) {
      this.setState({
        cards: mockData.cardsList
      });
    } else {
      window.fetch(`${API_URL}/cards`, {
        headers: API_HEADERS,
      }).then(response => response.json())
        .then((response) => {
          this.setState({
            cards: response
          });
        })
        .catch((error) => {
          console.error('Error fetching card lists', error);
        });
    }
  }

  addTask = (cardId, taskName) => {

  }

  deleteTask = (cardId, taskId, taskIndex) => {

  }

  toggleTask = (cardId, taskId, taskIndex) => {

  }

  render() {
    return (
      <KanbanLightContext.Provider
        value={{
          addTask: this.addTask,
          deleteTask: this.deleteTask,
          toggleTask: this.toggleTask
        }}
      >
        <KanbanLight
          cards={this.state.cards}
        />
      </KanbanLightContext.Provider>
    );
  }
}
