import React from 'react';
import { RaceForm } from 'react-wood-duck';
import { RACE_DETAILS } from './RaceDetails';

const raceDetailOptions = Object.keys(RACE_DETAILS).reduce(
  (raceDetails, race) => ({
    ...raceDetails,
    [race]: RACE_DETAILS[race].map(value => ({ label: value, value })),
  }),
  {}
);

const personId = '1';

const getIsRaceIndeterminateValueSelector = races => {
  const isUnknown = races.Unknown;
  const isAbandoned = races.Abandoned;
  const isDeclinedToAnswer = races['Declined to answer'];
  return Boolean(isUnknown || isAbandoned || isDeclinedToAnswer);
};

const racesStatic = {
  White: false,
  'Black or African American': false,
  Asian: false,
  'American Indian or Alaska Native': false,
  'Native Hawaiian or Other Pacific Islander': false,
  Unknown: false,
  Abandoned: false,
  'Declined to answer': false,
};

const raceStaticDetails = {
  White: '',
  'Black or African American': '',
  Asian: '',
  'American Indian or Alaska Native': '',
  'Native Hawaiian or Other Pacific Islander': '',
  Unknown: '',
  Abandoned: '',
  'Declined to answer': '',
};

class Race extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: personId,
      raceDetailOptions,
      racesDisabled: getIsRaceIndeterminateValueSelector(racesStatic),
      races: JSON.parse(JSON.stringify(racesStatic)),
      raceDetails: JSON.parse(JSON.stringify(raceStaticDetails)),
    };
    this.onRaceChange = this.onRaceChange.bind(this);
    this.onRaceDetailChange = this.onRaceDetailChange.bind(this);
  }

  onRaceChange(changedRace, value) {
    let races = this.state.races;
    let raceDetails = this.state.raceDetails;
    let racesDisabled;
    races[changedRace] = value;
    this.setState({ races: races, raceDetails: raceDetails });
    if (
      changedRace === 'Unknown' ||
      changedRace === 'Abandoned' ||
      changedRace === 'Declined to answer'
    ) {
      races = JSON.parse(JSON.stringify(racesStatic));
      races[changedRace] = value;
      raceDetails = JSON.parse(JSON.stringify(raceStaticDetails));
      racesDisabled = getIsRaceIndeterminateValueSelector(races);
    }
    this.setState({
      races: races,
      raceDetails: raceDetails,
      racesDisabled: racesDisabled,
    });
  }

  onRaceDetailChange(changedRace, value) {
    let raceDetails = this.state.raceDetails;
    raceDetails[changedRace] = value;
    this.setState({ raceDetails: raceDetails });
  }

  render() {
    return (
      <div>
        <RaceForm
          {...this.state}
          onRaceChange={this.onRaceChange}
          onRaceDetailChange={this.onRaceDetailChange}
        />
      </div>
    );
  }
}

export default Race;
