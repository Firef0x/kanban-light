/* eslint-disable react/no-danger,react/no-unused-prop-types */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import CheckList from '../CheckList/CheckList';
import { CARD } from '../../utils/constants';
import formatMarkdown from '../../utils/formatMarkdown';
import titlePropType from '../../utils/titlePropType';

class Card extends Component {
  constructor(...args) {
    super(args);
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
      connectDragSource,
      connectDropTarget,
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
    const cardDetail = this.state.showDetails ? (
      <div className="card__details">
        <span dangerouslySetInnerHTML={{
          __html: formatMarkdown(description)
        }}
        />
        <CheckList cardId={id} tasks={tasks} />
      </div>
    ) : '';

    return connectDropTarget(connectDragSource(
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
        <TransitionGroup>
          <CSSTransition
            classNames="toggle"
            timeout={{ enter: 250, exit: 250 }}
          >
            {cardDetail}
          </CSSTransition>
        </TransitionGroup>
      </div>
    ));
  }
}

Card.propTypes = {
  cardCallbacks: PropTypes.objectOf(PropTypes.func).isRequired,
  color: PropTypes.string,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  description: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  title: titlePropType
};

Card.defaultProps = {
  tasks: [],
  title: ''
};

const cardDragSpec = {
  beginDrag: props => ({
    id: props.id,
    status: props.status
  }),
  endDrag: (props) => {
    props.cardCallbacks.sendCardData(props.id, props.status);
  }
};

const cardDropSpec = {
  hover: (props, monitor) => {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateCardPosition(draggedId, props.id);
  }
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

const collectDrop = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
});

const dragHighOrderCard = DragSource(CARD, cardDragSpec, collectDrag)(Card);
export default DropTarget(CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
