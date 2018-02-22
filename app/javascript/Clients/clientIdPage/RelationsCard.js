import React from 'react';
import { Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var relationshipData = [
  {
    name: 'Jason',
    relationship: 'father',
    age: 45,
    city: 'Sacramento',
    address: 'K st',
    phone: 9162917674,
    actions: '',
  },
  {
    name: 'Jimmy',
    relationship: 'Mother',
    age: 40,
    city: 'Sacramento',
    address: 'L st',
    phone: 9165671238,
    actions: '',
  },
  {
    name: 'Jack',
    relationship: 'Brother',
    age: 10,
    city: 'Sacramento',
    address: 'M st',
    phone: 9167651298,
    actions: '',
  },
  {
    name: 'Ben',
    relationship: 'Brother',
    age: 20,
    city: 'Sacramento',
    address: 'N st',
    phone: 9164919111,
    actions: '',
  },
];
export default class RelationsCard extends React.Component {
  render() {
    return (
      <Cards
        cardHeaderText="Relationships View"
        cardHeaderButton={false}
        cardActionButtons={true}
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
          data={relationshipData}
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
  }
}
