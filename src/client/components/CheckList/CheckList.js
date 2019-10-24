import PropTypes from 'prop-types';
import React, { Component } from 'react';
import KanbanLightContext from '../../utils/KanbanLightContext';

export default class CheckList extends Component {
  /* eslint-disable no-param-reassign */
  onAddTaskKeyPress(event, taskCallbacks) {
    if (event && event.target && event.key === 'Enter') {
      taskCallbacks.add(this.props.cardId, event.target.value);
      event.target.value = '';
    }
  }

  render() {
    const { cardId, tasks } = this.props;

    return (
      <KanbanLightContext.Consumer>
        {taskCallbacks => (
          <div className="checklist">
            <ul>
              {tasks.map((task, taskIndex) => (
                <li
                  className="checklist__task"
                  key={task.id}
                >
                  <input
                    checked={task.done}
                    onChange={taskCallbacks.toggle.bind(
                      null,
                      cardId,
                      task.id,
                      taskIndex
                    )}
                    type="checkbox"
                  />
                  {`${task.name} `}
                  <button
                    className="checklist__task--remove"
                    onClick={taskCallbacks.delete.bind(
                      null,
                      cardId,
                      task.id,
                      taskIndex
                    )}
                    type="button"
                  />
                </li>
              ))}
              <input
                autoCapitalize="off"
                autoComplete="off"
                className="checklist__task--add"
                onKeyPress={this.onAddTaskKeyPress.bind(this, taskCallbacks)}
                placeholder="Type then hit Enter to add a task"
              />
            </ul>
          </div>
        )}
      </KanbanLightContext.Consumer>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired
};
