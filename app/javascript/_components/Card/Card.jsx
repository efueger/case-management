import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const defaultProps = {};

const Card = ({ children, renderHeader, renderFooter }) => {
  return (
    <div className="panel panel-default">
      {renderHeader && <div className="panel-heading">{renderHeader()}</div>}
      <div className="panel-body">{children}</div>
      {renderFooter && (
        <div className="panel-footer clearfix">{renderFooter()}</div>
      )}
    </div>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
