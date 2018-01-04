import React from 'react';
import PropTypes from 'prop-types';
import { Cards } from 'react-wood-duck';
import Table from '../../_components/Table';

const CaseType = PropTypes.shape({
  identifier: PropTypes.string.isRequired,
  case_name: PropTypes.string.isRequired,
  assignment_type: PropTypes.string.isRequired,
  active_service_component: PropTypes.string,
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

const Caseload = ({ status, cases, renderWaiting, renderEmpty }) => {
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
        data={toTableData(cases)}
      />
    );
  };
  return (
    <Cards cardHeaderText={getHeaderText()} cardbgcolor="transparent">
      {status === 'ready' ? renderRecords() : renderWaiting()}
    </Cards>
  );
};

Caseload.propTypes = propTypes;
Caseload.defaultProps = defaultProps;

export default Caseload;

/**
 * @todo(de): camel-case-ify payloads at Java or Ruby layer
 */

/* eslint-disable camelcase */
function toTableData(cases) {
  return cases.map(
    ({ identifier, case_name, active_service_component, assignment_type }) => {
      return [case_name, active_service_component, assignment_type];
    }
  );
}
/* eslint-enable camelcase */
