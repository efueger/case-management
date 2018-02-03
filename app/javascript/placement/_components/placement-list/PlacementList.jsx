import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../../_components';

const RelatedClientCard = () => {
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
          <h4>THE NAME</h4>
          <div className="label-bank">
            <span className="label label-default">Default</span>
            <span className="label label-default">Default</span>
          </div>
          <div className="indicator-bank" />
          <hr />
          <div className="row">
            <div className="col-md-4">Gender</div>
            <div className="col-md-2">Cell:</div>
            <div className="col-md-6">555-555-5555</div>
            <div className="col-md-4">42 yrs old (DOB: 5/1/1975)</div>
            <div className="col-md-2">Home:</div>
            <div className="col-md-6">555-55-5555</div>
            <div className="col-md-4">Language: English (Primary)</div>
            <div className="col-md-2">Home:</div>
            <div className="col-md-6">2234 1st Street, Sacramento CA 95819</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PlacementList = ({ relatedClients }) => {
  return (
    <div>
      {relatedClients &&
        relatedClients.map((relatedClient, i) => <RelatedClientCard key={i} />)}
    </div>
  );
};

PlacementList.propTypes = {
  relatedClients: PropTypes.array,
};

export default PlacementList;
