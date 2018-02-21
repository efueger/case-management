import React from 'react';
import { Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class Relations extends React.Component {
  render() {
    return (
      <Cards
        cardHeaderText="Relationships View"
        cardHeaderButton={false}
        cardActionButtons={false}
      >
        <div className="ChildName">
          <b> Focus Child </b>
        </div>
        <div className="ChildName">Allie Hendrixson</div>
        <BootstrapTable>
          <TableHeaderColumn dataField="Name" isKey={true}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField=" Relationship">
            Relationship
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Age">Age</TableHeaderColumn>
          <TableHeaderColumn dataField="City">City</TableHeaderColumn>
          <TableHeaderColumn dataField="Address">Address</TableHeaderColumn>
          <TableHeaderColumn dataField="Phone">Phone</TableHeaderColumn>
          <TableHeaderColumn dataField="Actions">Actions</TableHeaderColumn>
        </BootstrapTable>
      </Cards>
    );
  }
}
