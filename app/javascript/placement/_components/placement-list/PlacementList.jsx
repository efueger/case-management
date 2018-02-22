import React from 'react';
import PropTypes from 'prop-types';
import Filters from '../filters/Filters';
import { RelatedClientShape } from '../../shapes';
import RelatedClientCard from './RelatedClientCard';

const propTypes = {
  relatedClients: PropTypes.arrayOf(RelatedClientShape),
};

const defaultProps = {
  relatedClients: [],
};

const PlacementList = ({ relatedClients }) => {
  return (
    <div>
      <div className="col-md-3">
        <Filters />
      </div>
      <div className="col-md-9" style={{ paddingTop: '2.5rem' }}>
        {relatedClients &&
          relatedClients.map((relatedClient, i) => (
            <RelatedClientCard key={i} relatedClient={relatedClient} />
          ))}
      </div>
    </div>
  );
};
PlacementList.propTypes = propTypes;
PlacementList.defaultProps = defaultProps;

export default PlacementList;
