import React from 'react';
import PropTypes from 'prop-types';
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
      {relatedClients &&
        relatedClients.map((relatedClient, i) => (
          <RelatedClientCard key={i} relatedClient={relatedClient} />
        ))}
    </div>
  );
};
PlacementList.propTypes = propTypes;
PlacementList.defaultProps = defaultProps;

export default PlacementList;
