import React from 'react';
import PropTypes from 'prop-types';
import { Cards } from 'react-wood-duck';
import Race from './Race';
import Ethnicity from './Ethnicity';
import ICWA from './ICWA';

export default class RaceEthnicityForm extends React.Component {
  render() {
    return (
      <Cards
        cardHeaderText="Race and Ethnicity"
        id={this.props.anchorId}
        cardHeaderButton={false}
        cardActionButtons={true}
      >
        <div>
          <Race />
          <Ethnicity />
          <ICWA />
        </div>
      </Cards>
    );
  }
}
RaceEthnicityForm.propTypes = {
  anchorId: PropTypes.string,
};
