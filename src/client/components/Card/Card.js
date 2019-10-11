import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CheckList from '../CheckList/CheckList';

export default class Card extends PureComponent {
  constructor() {
    super();
    this.state = {
      showDetails: false
    };
  }

  onClick = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    const {
      description,
      id,
      tasks,
      title
    } = this.props;
    return (
      <div className="card__container">
        <div
          className="card__title"
          onClick={this.onClick}
          role="presentation"
        >
          {title}
        </div>
        {this.state.showDetails && (
          <div className="card__details">
            {description}
            <CheckList cardId={id} tasks={tasks} />
          </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number,
  tasks: PropTypes.array,
  title: PropTypes.string
};

Card.defaultProps = {
  tasks: [],
  title: ''
};
