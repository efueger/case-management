import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Cards } from 'react-wood-duck';

const propTypes = {
  cardHeaderText: PropTypes.string,
  status: PropTypes.oneOf(['idle', 'waiting', 'ready', 'error']),
  empty: PropTypes.bool,
  renderOnError: PropTypes.func,
  renderOnEmpty: PropTypes.func,
  render: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
};

const defaultRenderOnEmpty = () => (
  <Alert
    alertClassName="info"
    alertMessage="No records found!"
    alertCross={null}
    faIcon="fa-info-circle"
  />
);

const defaultRenderOnError = () => (
  <Alert
    alertClassName="error"
    alertMessage="An unexpected error occured!"
    alertCross={null}
    faIcon="fa-info-circle"
  />
);

const defaultProps = {
  status: 'idle',
  renderOnEmpty: defaultRenderOnEmpty,
  renderOnError: defaultRenderOnError,
  render: () => {},
};

const DataGridCard = ({
  cardHeaderText,
  status,
  empty,
  renderOnError,
  renderOnEmpty,
  render,
}) => {
  const content = (() => {
    switch (status) {
      case 'idle':
        return false;
      case 'error':
        return renderOnError();
      case 'waiting':
        return 'waiting...';
      default:
        return empty ? renderOnEmpty() : render();
    }
  })();
  return (
    <Cards cardHeaderText={cardHeaderText} cardbgcolor="transparent">
      {content}
    </Cards>
  );
};

DataGridCard.propTypes = propTypes;
DataGridCard.defaultProps = defaultProps;

export default DataGridCard;
