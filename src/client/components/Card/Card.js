import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CheckList from '../CheckList/CheckList';
import formatMarkdown from '../../utils/formatMarkdown';
import titlePropType from '../../utils/titlePropType';

export default class Card extends PureComponent {
  constructor() {
    super();
    this.state = {
      showDetails: false
    };
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    const {
      color,
      description,
      id,
      tasks,
      title
    } = this.props;
    const containerStyle = {
      position: 'absolute',
      zIndex: '-1',
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: color
    };
    return (
      <div className="card__container">
        <div style={containerStyle} />
        <div
          className={`card__title${
            this.state.showDetails
              ? ' card__title--open'
              : ''
          }`}
          onClick={this.toggleDetails}
          role="presentation"
        >
          {title}
        </div>
        {this.state.showDetails && (
          <div className="card__details">
            <span dangerouslySetInnerHTML={{
              __html: formatMarkdown(description)
            }}
            />
            <CheckList cardId={id} tasks={tasks} />
          </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  title: titlePropType
};

Card.defaultProps = {
  tasks: [],
  title: ''
};
