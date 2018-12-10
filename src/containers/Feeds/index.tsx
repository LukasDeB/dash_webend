import * as React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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

import { Feed, CreateFeedDto, UpdateFeedDto } from '@/models';
import { FeedsActions } from '@/redux/actions';
import { bindActionCreators } from 'redux';
import FeedModal from '@/modals/FeedModal';

interface Props {
  history: any;
  actions: FeedsActions;
  isLoading: boolean;
  feeds: Feed[];
  id: number;
}

interface State {
  isModalOpen: boolean;
  contextRef: any;
  selectedFeed: UpdateFeedDto | null;
}

class Feeds extends React.Component<Props, State> {
  state = {
    isModalOpen: false,
    contextRef: undefined,
    selectedFeed: null,
  };

  componentDidMount() {
    this.fetch();
  }

  addFeed = () => this.setState({ selectedFeed: null }, this.openModal);

  fetch = () => this.props.actions.getFeeds();

  handleContextRef = contextRef => this.setState({ contextRef });

  handleModifyFeed = selectedFeed => this.setState({ selectedFeed, isModalOpen: true });

  handleDeleteFeed = id => {
    this.props.actions.deleteFeed(id);
  }

  handleModalSubmit = (entry: CreateFeedDto | UpdateFeedDto) => {
    const {
      selectedFeed,
    } = this.state;
    if (selectedFeed) {
      return this.props.actions.updateFeed(get(selectedFeed, 'id', 0), entry);
    }
    return this.props.actions.createFeed(entry as CreateFeedDto);
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.feeds.length !== this.props.feeds.length
    ) {
      this.forceUpdate();
    }
  }

  render() {
    const { isModalOpen, contextRef, selectedFeed } = this.state;
    const { isLoading, feeds } = this.props;
    return (
      <Segment loading={isLoading} basic={true} ref={this.handleContextRef}>
        <FeedModal
          isLoading={isLoading}
          selected={selectedFeed}
          isOpen={isModalOpen}
          handleOpen={this.openModal}
          handleClose={this.closeModal}
          onSubmit={this.handleModalSubmit}
        />
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="rss" circular={true} />
            Feeds
          </Header.Content>
        </Header>
        <Sticky context={contextRef}>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.fetch} circular={true} icon={true}>
              <Icon name="sync" />
            </Button>
            <Button onClick={this.addFeed} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Card.Group centered={true}>
          {
            feeds.map((feed: Feed) => {
              const handleModify = () => this.handleModifyFeed(feed);
              const handleDelete = () => this.handleDeleteFeed(feed.id);
              return (
                <Card key={`card_${feed.id}`} fluid={true}>
                  <Card.Content>
                    <Card.Header as="h2">
                      <Link to={`feeds/${feed.id}`}>{feed.alias || 'Feed'}</Link>
                      <Button.Group floated="right">
                        <Button onClick={handleModify} icon={true}>
                          <Icon size="small" name="edit" /> Edit
                        </Button>
                        <Button onClick={handleDelete} icon={true}>
                          <Icon size="small" name="delete" /> Delete
                        </Button>
                      </Button.Group>
                    </Card.Header>
                    <Card.Meta>
                      {moment(feed.created).format('dddd, MMMM Do - hh:mm A')}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    {feed.url}
                  </Card.Content>
                </Card>
              );
            })
          }
        </Card.Group>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state.feeds.isLoading,
  feeds: state.feeds.feeds,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...FeedsActions }, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feeds));
