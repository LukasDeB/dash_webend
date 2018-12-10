import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Segment,
  Sidebar,
  Container,
} from 'semantic-ui-react';
import { AuthActions } from '@/redux/actions';

import TopNavigation from '@/components/Common/TopNavigation';
import HorizontalSidebar from '@/components/Common/HorizontalSidebar';
import PrivateRoute from '@/components/Core/PrivateRoute';
import Dashboard from '../Dashboard';
import Goals from '../Goals';
import Quests from '../Quests';
import Journal from '../Journal';
import Profile from '../Profile';
import Feeds from '../Feeds';
import Feed from '../Feed';
import SongBook from '../SongBook';
import Economy from '../Economy';
import Savings from '../Savings';
import './styles.css';

interface Props {
  history: any;
  getUserInfo: () => void;
}
interface State {
  isSidebarOpen: boolean;
}

class DashboardLayout extends React.Component<Props, State> {
  state = {
    isSidebarOpen: true,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  toggleSidebar = () => this.setState({ isSidebarOpen: !this.state.isSidebarOpen });

  logOut = () => {
    localStorage.removeItem('accessToken');
    this.props.history.push('/login');
  }

  render() {
    const { isSidebarOpen } = this.state;
    const pusherClass = isSidebarOpen ? 'sideBarOpen' : 'sideBarClosed';
    return (
      <Container id="dashboard" fluid={true}>
        <TopNavigation toggleSidebar={this.toggleSidebar} />
        <Sidebar.Pushable as={Segment} padded={false} style={{ marginTop: '0' }} basic={true}>
          <HorizontalSidebar logout={this.logOut} isOpen={isSidebarOpen} />
          <Sidebar.Pusher className={pusherClass}>
            <Segment basic={true}>
              <PrivateRoute exact={true} path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact={true} path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact={true} path="/dashboard/goals" component={Goals} />
              <PrivateRoute exact={true} path="/dashboard/quests" component={Quests} />
              <PrivateRoute exact={true} path="/dashboard/journal" component={Journal} />
              <PrivateRoute path="/dashboard/feeds/:id" component={Feed} />
              <PrivateRoute exact={true} path="/dashboard/feeds" component={Feeds} />
              <PrivateRoute exact={true} path="/dashboard/profile" component={Profile} />
              <PrivateRoute exact={true} path="/dashboard/song-book" component={SongBook} />
              <PrivateRoute exact={true} path="/dashboard/economy" component={Economy} />
              <PrivateRoute exact={true} path="/dashboard/savings" component={Savings} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(AuthActions.getUserInfo()),
});
export default withRouter(connect(null, mapDispatchToProps)(DashboardLayout));
