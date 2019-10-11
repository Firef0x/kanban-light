import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class CheckList extends PureComponent {
  render() {
    const tasksLIs = this.props.tasks.map(task => (
      <li className="checklist__task">
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}
        <a href="#" className="checklist__task--remove" />
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
