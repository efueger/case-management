import React from 'react';
import { Card } from '../../../_components';
import { RelatedClientShape } from '../../shapes';

const propTypes = {
  relatedClient: RelatedClientShape.isRequired,
};

/* eslint-disable camelcase */
const RelatedClientCard = ({ relatedClient }) => {
  const {
    common_first_name,
    common_last_name,
    gender_code,
    address,
  } = relatedClient;
  return (
    <Card
      renderFooter={() => (
        <a className="pull-right" href="some-url">
          View Details
        </a>
      )}
    >
      <div className="row">
        <div className="col-md-2 text-center">
          <div
            className="img-circle"
            style={{ paddingTop: '100%', backgroundColor: 'pink' }}
          />
        </div>
        <div className="col-md-10">
          <h4>{`${common_first_name} ${common_last_name}`}</h4>
          <div className="label-bank">
            <span className="label label-default">Related Client</span>
          </div>
          <div className="indicator-bank" />
          <hr />
          <div className="row">
            <div className="col-md-4">{gender_code}</div>
            <div className="col-md-2">Cell:</div>
            <div className="col-md-6">{address && address.primary_phone}</div>
            <div className="col-md-4">42 yrs old (DOB: 5/1/1975)</div>
            <div className="col-md-2">Home:</div>
            <div className="col-md-6">{address && address.primary_phone}</div>
            <div className="col-md-4">Language: English (Primary)</div>
            <div className="col-md-2">Home:</div>
            <div className="col-md-6">{printStreetAddress(address)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
/* eslint-enable camelcase */
RelatedClientCard.propTypes = propTypes;

export default RelatedClientCard;

//
// Helpers
//

function printStreetAddress(address) {
  return (
    address &&
    `${address.street_number} ${address.street_name}, ${address.city} ${
      address.state
    } ${address.zip}`
  );
}
