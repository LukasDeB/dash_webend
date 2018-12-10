import * as React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Dropdown,
  Header,
  Sticky,
  Segment,
  Icon,
  Button,
  Card,
} from 'semantic-ui-react';
import { Quest, CreateQuestDto, UpdateQuestDto } from '@/models';
import { QuestsActions } from '@/redux/actions';
import { bindActionCreators } from 'redux';
import CreateQuestModal from '../../modals/CreateQuestModal';
import { QuestsReducer } from '@/redux/reducers/quests';

interface Props {
  history: any;
  questsState: QuestsReducer;
  actions: any;
}

interface State {
  isModalOpen: boolean;
  selectedQuest: Quest | null;
  contextRef: any;
  openQuest: CreateQuestDto | UpdateQuestDto;
}

class Quests extends React.Component<Props, State> {
  state = {
    selectedQuest: null,
    isModalOpen: false,
    contextRef: undefined,
    openQuest: {
      id: null,
      name: '',
      description: '',
      currentDifficulty: 0,
    },
  };

  componentDidMount() {
    this.fetch();
  }

  addQuest = () => this.setState({ selectedQuest: null }, this.handleQuestModalOpen);

  fetch = () => this.props.actions.getQuests();

  handleContextRef = contextRef => this.setState({ contextRef });

  handleModifyQuest = selectedQuest => this.setState({ selectedQuest, isModalOpen: true });

  handleDeleteQuest = id => {
    this.props.actions.deleteQuest(id);
  }

  handleQuestModalSubmit = (quest: CreateQuestDto) => {
    const {
      selectedQuest,
    } = this.state;
    if (selectedQuest) {
      return this.props.actions.updateQuest(get(selectedQuest, 'id'), quest);
    }
    return this.props.actions.createQuest(quest);
  }

  handleQuestModalOpen = () => this.setState({ isModalOpen: true });

  handleQuestModalClose = () => this.setState({ isModalOpen: false });

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.questsState.isLoading !== this.props.questsState.isLoading ||
      nextProps.questsState.quests.length !== this.props.questsState.quests.length
    ) {
      this.setState({});
    }
  }

  render() {
    const { isModalOpen, contextRef, selectedQuest } = this.state;
    const { isLoading, quests } = this.props.questsState;
    return (
      <Segment loading={isLoading} basic={true} ref={this.handleContextRef}>

        <CreateQuestModal
          isOpen={isModalOpen}
          isLoading={isLoading}
          selected={selectedQuest}
          onSubmit={this.handleQuestModalSubmit}
          handleOpen={this.handleQuestModalOpen}
          handleClose={this.handleQuestModalClose}
        />

        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="trophy" circular={true} />
            Quests
          </Header.Content>
        </Header>
        <Sticky
          context={contextRef}
        >
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.fetch} circular={true} icon={true}>
              <Icon name="sync" />
            </Button>
            <Button onClick={this.addQuest} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Card.Group centered={true}>
          {
            quests.map(quest => {
              const handleModify = () => this.handleModifyQuest(quest);
              const handleDelete = () => this.handleDeleteQuest(quest.id);
              return (
                <Card key={`card_${quest.id}`}>
                  <Card.Content>
                    <Card.Header >
                      <Icon name="hourglass start" circular={true} />
                      {quest.name}
                    </Card.Header>
                    <div style={{ textAlign: 'right', alignSelf: 'center' }}>
                      <Dropdown icon={<Icon name="options" />}>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleModify} text="Update Goal" />
                          <Dropdown.Item onClick={handleDelete} text="Delete Goal" />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <Card.Description>{quest.description}</Card.Description>
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
  questsState: state.quests,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...QuestsActions }, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quests));
