import * as React from 'react';
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
import SavingsIcon from '@/components/Economy/SavingsIcon';

export interface Props {
  isOpen: boolean;
  logout: () => void;
}
class HorizontalSidebar extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.isOpen !== nextProps.isOpen;
  }

  render() {
    const { isOpen, logout } = this.props;
    return (
      <Sidebar
        as={Menu}
        visible={true}
        inverted={true}
        vertical={true}
        animation="push"
        direction="left"
        icon={isOpen ? 'labeled' : true}
        width={isOpen ? 'thin' : 'very thin'}
      >
        <Menu.Item name="home" href="/dashboard">
          <Icon size="small" name="home" />
          {isOpen && 'Inicio'}
        </Menu.Item>
        <Menu.Item name="profile" href="/dashboard/profile">
          <Icon size="small" name="user" />
          {isOpen && 'Perfil'}
        </Menu.Item>
        <Menu.Item name="economy" href="/dashboard/economy">
          <Icon size="small" name="dollar sign" circular={true} />
          {isOpen && 'Economía'}
        </Menu.Item>
        <Menu.Item name="savings" href="/dashboard/savings">
          <SavingsIcon style={{ marginBottom: isOpen ? '5px' : '0' }} size={isOpen ? 'large' : 'small'} />
          {isOpen && 'Metas de Ahorro'}
        </Menu.Item>
        <Menu.Item name="song-book" href="/dashboard/song-book">
          <Icon size="small" name="music" />
          {isOpen && 'Repertorio Musical'}
        </Menu.Item>
        <Menu.Item name="quests" href="/dashboard/quests">
          <Icon size="small" name="trophy" />
          {isOpen && 'Metas'}
        </Menu.Item>
        <Menu.Item name="goals" href="/dashboard/goals">
          <Icon size="small" name="list ul" />
          {isOpen && 'Tareas'}
        </Menu.Item>
        <Menu.Item name="journal" href="/dashboard/journal">
          <Icon size="small" name="book" />
          {isOpen && 'Diario'}
        </Menu.Item>
        <Menu.Item name="feeds" href="/dashboard/feeds">
          <Icon size="small" name="rss" />
          {isOpen && 'Feeds'}
        </Menu.Item>
        <Menu.Item name="logout" onClick={() => logout()}>
          <Icon size="small" name="log out" />
          {isOpen && 'Cerrar Sesión'}
        </Menu.Item>
      </Sidebar>
    );
  }
}
export default HorizontalSidebar;
