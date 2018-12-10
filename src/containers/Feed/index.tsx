import * as React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import * as Parser from 'rss-parser';
import {
  Dropdown,
  Header,
  Sticky,
  Segment,
  Icon,
  Button,
  Card,
} from 'semantic-ui-react';

import { Feed as FeedModel, CreateFeedDto, UpdateFeedDto } from '@/models';
import { FeedsActions } from '@/redux/actions';
import { bindActionCreators } from 'redux';
import { DateTime } from '@/constants';

interface Props {
  history: any;
  actions: FeedsActions;
  isLoading: boolean;
  feeds: FeedModel[];
  id: number;
}

interface State {
  isModalOpen: boolean;
  contextRef: any;
  feedContent: any;
  isLoading: boolean;
}

class Feed extends React.Component<Props, State> {
  private parser = new Parser();
  private selectedFeed: FeedModel;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      isModalOpen: false,
      contextRef: undefined,
      feedContent: null,
    };
  }

  componentDidMount() {
    this.fetchFeeds();
  }

  updateFeed = async () => {
    const { feeds, id } = this.props;
    const selectedFeed = feeds.find(itm => itm.id === id);
    if (selectedFeed) {
      this.selectedFeed = selectedFeed;
      this.setState({ isLoading: true }, () => {
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        this.parser.parseURL(CORS_PROXY + selectedFeed.url, (error, feed) => {
          console.log(error, feed);
          this.setState({ isLoading: false, feedContent: feed });
        });
      });
    }
  }

  fetchFeeds = () => this.props.actions.getFeeds();

  handleContextRef = contextRef => this.setState({ contextRef });

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.feeds.length !== this.props.feeds.length ||
      nextProps.id !== this.props.id
    ) {
      this.updateFeed();
    }
  }

  render() {
    const { contextRef, feedContent, isLoading } = this.state;
    const { isLoading: isLoadingState } = this.props;
    return (
      <Segment loading={isLoading || isLoadingState} basic={true} ref={this.handleContextRef}>
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="rss" circular={true} />
            {get(this.selectedFeed, 'alias', get(this.selectedFeed, 'url', 'Selected Feed'))}
          </Header.Content>
        </Header>
        <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
          <Button onClick={this.updateFeed} circular={true} icon={true}>
            <Icon name="sync" />
          </Button>
        </Button.Group>
        <Card.Group fluid={true}>
          {
            this.selectedFeed &&
            get(feedContent, 'items', []).map((itm, index) => {
              return (
                <Card key={`feed_item_${index}`} fluid={true}>
                  <Card.Content>
                    <Card.Header as="a" href={itm.link} target="_blank">{itm[this.selectedFeed.titleKey]}</Card.Header>
                    <Card.Meta>
                      {this.selectedFeed.authorKey && `Author: ${itm[this.selectedFeed.authorKey]}`}
                      &nbsp;
                      {
                        this.selectedFeed.dateKey &&
                        `Date: ${moment(itm[this.selectedFeed.dateKey]).format(DateTime.fullDisplayDateTime)}`
                      }
                    </Card.Meta>
                    <Card.Description>
                      {itm[this.selectedFeed.bodyKey]}
                    </Card.Description>
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
const mapStateToProps = (state, { match: { params: { id } } }) => ({
  isLoading: state.feeds.isLoading,
  feeds: state.feeds.feeds,
  id: isNaN(Number(id)) ? null : Number(id),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...FeedsActions }, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feed));
