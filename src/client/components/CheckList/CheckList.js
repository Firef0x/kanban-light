import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class CheckList extends PureComponent {
  onToggleCheckbox = (e) => {
    const { value } = e.target;
    // TODO
  }

  render() {
    const tasksLIs = this.props.tasks.map(task => (
      <li
        className="checklist__task"
        key={task.id}
      >
        <input
          checked={task.done}
          onChange={this.onToggleCheckbox}
          type="checkbox"
        />
        {task.name}
        <a href="#" className="checklist__task--remove">
          X
        </a>
      </li>
    ));

    return (
      <div className="checklist">
        <ul>
          {tasksLIs}
        </ul>
      </div>
    );
  }
}

CheckList.propTypes = {
  tasks: PropTypes.array.isRequired
};
