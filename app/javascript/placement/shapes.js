import PropTypes from 'prop-types';

export const AddressShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
});

export const RelatedClientShape = PropTypes.shape({
  identifier: PropTypes.string.isRequired,
  address: AddressShape.isRequired,
});

export const FocusChildShape = PropTypes.shape({
  identifier: PropTypes.string.isRequired,
  address: AddressShape.isRequired,
});
