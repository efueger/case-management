import React from 'react';
import { RaceForm } from 'react-wood-duck';
import { RACE_DETAILS } from './RaceDetails';
import ChildClientService from '../../../_services/child_client';
import SystemCodeService from '../../../_services/system_code';

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
  'American Indian or Alaskan Native': false,
  'Native Hawaiian or Other Pacific Islander': false,
  Unknown: false,
  Abandoned: false,
  'Declined to answer': false,
};

const raceStaticDetails = {
  White: '',
  'Black or African American': '',
  Asian: '',
  'American Indian or Alaskan Native': '',
  'Native Hawaiian or Other Pacific Islander': '',
  Unknown: '',
  Abandoned: '',
  'Declined to answer': '',
};

export default class Race extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      raceResponse: { XHRStatus: 'idle' },
      primaryEthnicityType: 0,
      raceLongDescription: '',
      raceShortDescription: '',
      raceCopy: {},
      raceLongDescriptionValue: false,
      personId: personId,
      racesStatic,
      raceDetailOptions,
      racesDisabled: getIsRaceIndeterminateValueSelector(racesStatic),
      races: JSON.parse(JSON.stringify(racesStatic)),
      raceDetails: JSON.parse(JSON.stringify(raceStaticDetails)),
    };
    this.onRaceChange = this.onRaceChange.bind(this);
    this.onRaceDetailChange = this.onRaceDetailChange.bind(this);
    // this.handleRaceChange = this.handleRaceChange.bind(this);
  }

  componentDidMount() {
    this.fetchClientData();
    this.fetchRaceData();
  }

  fetchClientData = () => {
    return ChildClientService.fetch()
      .then(clientResponse =>
        this.setState({
          clientResponse,
          primaryEthnicityType: clientResponse.primary_ethnicity_type,
        })
      )
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  // dummy = this.state.races[this.state.raceLongDescription]

  fetchRaceData = () => {
    // console.log('1_primaryEthnicityType: ', this.state.primaryEthnicityType);
    console.log('races Before Filter: ', this.state.races);
    return SystemCodeService.fetch()
      .then(raceResponse => {
        // console.log('raceResponse Before Filter: ', raceResponse);
        this.setState({
          raceResponse: raceResponse.filter(
            race =>
              // race.system_id === this.state.primaryEthnicityType
              race.system_id === 821
          ),

          raceLongDescription: raceResponse[0].long_description,
          // raceCopy: raceResponse,

          // raceCopy: raceResponse.filter(
          //   race =>
          //     // race.system_id === this.state.primaryEthnicityType
          //     race.system_id === 821
          // ),
        });
        // console.log('races After Filter: ', this.state.races);
        // console.log('raceLongDescription: ', this.state.raceLongDescription);
      })
      .then(raceResponse => {
        Object.entries(this.state.races).map(racekv => {
          // console.log('racekv:', racekv[1].long_description);
          // console.log('racek before IF: ', racekv[0]);
          // console.log(
          //   'long_description before IF: ',
          //   this.state.raceLongDescription
          // );
          if (racekv[0] === this.state.raceLongDescription) {
            racekv[1] = true;
            // console.log('racek inside IF: ', racekv[0]);
            // console.log(
            //   'long_description inside IF: ',
            //   this.state.raceLongDescription
            // );
            // console.log(
            //   'racek & long_description inside IF: ',
            //   racekv[0] === this.state.raceLongDescription
            // );
            // this.setState({
            //   raceCopy: Object.assign({}, racekv),
            // });
          }
          console.log('racekv after IF: ', racekv);
          // this.setState({
          //   raceCopy: Object.assign({}, racekv),
          // });
          // console.log('races after IF: ', this.state.races);
        });
      })
      .catch(() => this.setState({ raceResponse: { XHRStatus: 'error' } }));
  };

  // handleRaceChange(event) {
  //   if (this.state.raceLongDescriptionValue) {
  //     this.setState({
  //       races: {
  //         raceLongDescription: true,
  //       },
  //     });
  //     console.log('dynntt:', this.state.raceLongDescription);
  //   }
  // }

  onRaceChange(changedRace, value) {
    let races = this.state.races;
    let raceDetails = this.state.raceDetails;
    let racesDisabled;
    races[changedRace] = value;
    this.setState({
      races: races,
      raceDetails: raceDetails,
    });
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
    // console.log('this.raceLong at Last: ', this.state.raceLong);
    // console.log('clientResponse: ', this.state.clientResponse);
    // console.log('raceResponse: ', this.state.raceResponse);
    console.log('raceCopy: ', this.state.raceCopy);
    // console.log('raceLongDescription: ', this.state.raceLongDescription);
    // console.log('raceLongDescription: ', this.state.raceLongDescription);
    console.log('Races at the bottom End:', this.state.races);
    // console.log(
    // 'raceLongDescriptionValue: ',
    // this.state.races[this.state.raceLongDescription]
    // this.state.races[this.state.raceLongDescription]
    // );
    console.log(
      'raceLongDescriptionValue:',
      this.state.raceLongDescriptionValue,
      this.state.races[JSON.stringify(this.state.raceLongDescriptionValue)]
    );

    return (
      <div>
        <RaceForm
          {...this.state}
          // onRaceChange={this.onRaceChange}
          onRaceDetailChange={this.onRaceDetailChange}
          handleRaceChange={this.handleRaceChange}
        />
      </div>
    );
  }
}
