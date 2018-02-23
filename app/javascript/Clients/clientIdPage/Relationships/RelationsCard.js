import React from 'react';
import { Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

const propTypes = {
  anchorId: PropTypes.string,
  relatedClients: PropTypes.array,
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
        <div className="ChildName col-md-6">Allie Hendrixson</div>
      </div>
      <BootstrapTable
        data={relatedClients}
        searchPlaceholder="Quick Filter"
        search={true}
      >
        <TableHeaderColumn dataField="name" isKey={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="relationship">
          Relationship
        </TableHeaderColumn>
        <TableHeaderColumn dataField="age">Age</TableHeaderColumn>
        <TableHeaderColumn dataField="city">City</TableHeaderColumn>
        <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
        <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
        <TableHeaderColumn dataField="actions">Actions</TableHeaderColumn>
      </BootstrapTable>
    </Cards>
  );
};
RelationsCard.propTypes = propTypes;

export default RelationsCard;
