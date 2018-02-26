import React from 'react';
import { Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

const propTypes = {
  anchorId: PropTypes.string,
  relatedClients: PropTypes.array,
};
const selectRow = {
  mode: 'checkbox', // multi select
};

const RelationsCard = ({ anchorId, relatedClients }) => {
  return (
    <Cards
      cardHeaderText="Relationships View"
      id={anchorId}
      cardHeaderButton={false}
      cardActionButtons={false}
    >
      <div className="FocusChild">
        <h4>
          <b> Focus Child </b>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-2 ">
          <div
            className="img-circle"
            style={{ paddingTop: '100%', backgroundColor: 'pink' }}
          />
        </div>
        <div className="ChildName col-md-6">
          <b> Allie Hendrixson </b>
        </div>
      </div>
      <BootstrapTable
        data={relatedClients}
        searchPlaceholder="Quick Filter"
        search={true}
        selectRow={selectRow}
      >
        <TableHeaderColumn dataField="name" isKey={true} width="150px">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="relationship" width="150px">
          Relationship
        </TableHeaderColumn>
        <TableHeaderColumn dataField="age" width="150px">
          Age
        </TableHeaderColumn>
        <TableHeaderColumn dataField="city" width="150px">
          City
        </TableHeaderColumn>
        <TableHeaderColumn dataField="address" width="150px">
          Address
        </TableHeaderColumn>
        <TableHeaderColumn dataField="phone" width="150px">
          Phone
        </TableHeaderColumn>
        <TableHeaderColumn dataField="actions" width="150px">
          Actions
        </TableHeaderColumn>
      </BootstrapTable>
    </Cards>
  );
};
RelationsCard.propTypes = propTypes;

export default RelationsCard;
