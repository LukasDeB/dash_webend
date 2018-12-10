import * as React from 'react';
import { connect } from 'react-redux';
import {
  Menu, Icon, Button,
} from 'semantic-ui-react';
import { State as AuthState } from '@/redux/reducers/auth';

export interface Props {
  toggleSidebar: () => void;
  authState: AuthState;
}

class TopNavigation extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.authState.isLoading !== this.props.authState.isLoading ||
      nextProps.authState.currentUser !== this.props.authState.currentUser
    );
  }
  render() {
    let userText = '';
    if (this.props.authState.currentUser) {
      const { authState: { currentUser: { firstName, lastName, currentLevel, currentXP, xpUntilNextLevel } } } = this.props;
      userText = `${firstName} ${lastName} - Level: ${currentLevel} (${currentXP} XP - ${xpUntilNextLevel} until next level) `;
    }
    return (
      <Menu inverted={true} stackable={true} fluid={true} style={{ borderRadius: '0', marginBottom: '0' }}>
        <Menu.Item>
          <Button onClick={() => this.props.toggleSidebar()} color="teal" >
            <Icon name="compass outline" size="big" />
            Dashboard
          </Button>
        </Menu.Item>
        <Menu.Item position="right" name="user">{userText}</Menu.Item>
      </Menu>
    );
  }
}
const mapStateToProps = state => ({
  authState: state.auth,
});
export default connect(mapStateToProps)(TopNavigation);
