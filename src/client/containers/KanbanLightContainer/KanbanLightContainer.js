import 'core-js/stable';
import update from 'immutability-helper';
import React, { Component } from 'react';
import 'whatwg-fetch';
import throttle from 'lodash.throttle';
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
    /* Event function binding */
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this), 500);
  }

  componentDidMount() {
    if (MOCK_JSON) {
      this.setState({
        cards: mockData.cardsList
      });
    } else {
      window.fetch(`${API_URL}/cards`, {
        headers: API_HEADERS,
        method: 'GET'
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
    if (Array.isArray(this.state.cards)) {
      const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      const self = this;
      const newTask = {
        id: Date.now(),
        name: taskName,
        done: false
      };

      window.fetch(`${API_URL}/cards/${cardId}/tasks`, {
        headers: API_HEADERS,
        method: 'POST',
        body: JSON.stringify(newTask)
      }).then(response => response.json())
        .then((response) => {
          if (response.ok) {
            newTask.id = response.id;
            self.setState((prevState) => {
              const nextCards = update(prevState.cards, {
                [cardIndex]: {
                  tasks: {
                    $push: [newTask]
                  }
                }
              });
              return {
                cards: nextCards
              };
            });
          } else {
            throw new Error(response);
          }
        })
        .catch((error) => {
          console.error('Error in add task', error);
        });
    }
  }

  deleteTask = (cardId, taskId, taskIndex) => {
    if (Array.isArray(this.state.cards)) {
      const self = this;
      const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      window.fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
        headers: API_HEADERS,
        method: 'DELETE'
      }).then((response) => {
        self.setState((prevState) => {
          const nextCards = update(prevState.cards, {
            [cardIndex]: {
              tasks: {
                $splice: [[taskIndex, 1]]
              }
            }
          });
          return {
            cards: nextCards
          };
        });
      });
    }
  }

  toggleTask = (cardId, taskId, taskIndex) => {
    if (Array.isArray(this.state.cards)) {
      const self = this;
      let newDoneValue;
      const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      const nextCards = update(this.state.cards, {
        [cardIndex]: {
          tasks: {
            [taskIndex]: {
              done: {
                $apply: (done) => {
                  newDoneValue = !done;
                  return newDoneValue;
                }
              }
            }
          }
        }
      });
      window.fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
        headers: API_HEADERS,
        method: 'PUT',
        body: JSON.stringify({
          done: newDoneValue
        })
      }).then((response) => {
        self.setState({
          cards: nextCards
        });
      });
    }
  }

  sendCardData = (cardId, status) => {
    const self = this;
    const { cards } = this.state;
    const cardIndex = cards.findIndex(card => card.id === cardId);
    const currentCard = cards[cardIndex];
    window.fetch(`${API_URL}/cards/${cardId}`, {
      headers: API_HEADERS,
      method: 'PUT',
      body: JSON.stringify({
        status: currentCard.status,
        row_order_position: cardIndex
      })
    }).then(response => response.json())
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
      })
      .catch((error) => {
        console.error('Error in updating card', error);
        self.setState(prevState => (
          update(prevState, {
            cards: {
              [cardIndex]: {
                status: {
                  $set: status
                }
              }
            }
          })
        ));
      });
  }

  updateCardPosition(cardId, afterCardId) {
    if (cardId !== afterCardId) {
      const { cards } = this.state;
      const cardIndex = cards.findIndex(card => card.id === cardId);
      const currentCard = cards[cardIndex];
      const afterCardIndex = cards.findIndex(card => card.id === afterCardId);
      this.setState(prevState => (
        update(prevState, {
          cards: {
            $splice: [
              [cardIndex, 1],
              [afterCardIndex, 0, currentCard]
            ]
          }
        })
      ));
    }
  }

  updateCardStatus(cardId, listId) {
    const { cards } = this.state;
    const cardIndex = cards.findIndex(card => card.id === cardId);
    const currentCard = cards[cardIndex];
    if (currentCard.status !== listId) {
      this.setState(prevState => (
        update(prevState, {
          cards: {
            [cardIndex]: {
              status: {
                $set: listId
              }
            }
          }
        })
      ));
    }
  }

  render() {
    return (
      <KanbanLightContext.Provider
        value={{
          taskCallbacks: {
            addTask: this.addTask,
            deleteTask: this.deleteTask,
            toggleTask: this.toggleTask
          }
        }}
      >
        <KanbanLight
          cards={this.state.cards}
          cardCallbacks={{
            sendCardData: this.sendCardData,
            updateCardPosition: this.updateCardPosition,
            updateCardStatus: this.updateCardStatus
          }}
        />
      </KanbanLightContext.Provider>
    );
  }
}
