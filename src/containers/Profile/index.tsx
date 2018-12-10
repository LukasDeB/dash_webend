import * as React from 'react';
import Avatar, { AvatarStyle, Option, allOptions, OptionContext } from 'avataaars';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import {
  Dropdown,
  Header,
  Sticky,
  Segment,
  Icon,
  Button,
  Card,
} from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import JournalEntryModal from '@/modals/JournalEntryModal';
import AvatarGenerator from '@/components/Common/AvatarGenerator';

interface Props {
  history: any;
}

interface State {
  avatarStyle: AvatarStyle | null;
}

class Profile extends React.Component<Props, State> {
  state = {
    avatarStyle: AvatarStyle.Circle,
  };

  onChangeAvatarStyle = (avatarStyle: AvatarStyle) => this.setState({ avatarStyle });

  render() {
    return (
      <Segment basic={true}>
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="user" circular={true} />
            Profile
          </Header.Content>
        </Header>

        <Avatar
          style={{ height: '40px' }}
          avatarStyle="Circle"
          topType="ShortHairTheCaesarSidePart"
          accessoriesType="Sunglasses"
          hairColor="BlondeGolden"
          facialHairType="MoustacheFancy"
          facialHairColor="Brown"
          clotheType="BlazerSweater"
          eyeType="Close"
          eyebrowType="RaisedExcitedNatural"
          mouthType="Disbelief"
          skinColor="Yellow"
        />
        <AvatarGenerator
          avatarStyle={this.state.avatarStyle}
          onChangeAvatarStyle={this.onChangeAvatarStyle}
        />
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
