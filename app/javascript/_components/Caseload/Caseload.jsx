import React from 'react';
import PropTypes from 'prop-types';
import { Cards } from 'react-wood-duck';
import Table from '../../_components/Table';

const CaseType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assignmentType: PropTypes.string.isRequired,
  assignmentDate: PropTypes.string.isRequired,
  serviceComponent: PropTypes.string,
});

const propTypes = {
  cases: PropTypes.arrayOf(CaseType),
  status: PropTypes.string,
  renderEmpty: PropTypes.func,
  renderWaiting: PropTypes.func,
};
const defaultProps = {
  renderWaiting: () => 'waiting...',
  renderEmpty: () => 'empty!',
};

const CaseloadCard = ({ status, cases, renderWaiting, renderEmpty }) => {
  const getHeaderText = () => {
    return status === 'ready' && cases && cases.length
      ? `Cases (${cases.length})`
      : 'Cases';
  };
  const renderRecords = () => {
    if (!cases || !cases.length) {
      return renderEmpty();
    }
    return (
      <Table
        colNames={['Name', 'Service Component', 'Type']}
        data={cases.map(
          ({
            identifier,
            case_name,
            active_service_component,
            assignment_type,
          }) => {
            return [case_name, active_service_component, assignment_type];
          }
        )}
      />
    );
  };
  return (
    <Cards cardHeaderText={getHeaderText()} cardbgcolor="transparent">
      {status === 'ready' ? renderRecords() : renderWaiting()}
    </Cards>
  );
};

CaseloadCard.propTypes = propTypes;
CaseloadCard.defaultProps = defaultProps;

export default CaseloadCard;
