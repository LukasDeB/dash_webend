import * as React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Sticky,
  Segment,
  Icon,
  Button,
  Card,
  Rail,
} from 'semantic-ui-react';

import { Goal, CreateGoalDto, GoalStatuses } from '@/models';
import { GoalsActions } from '@/redux/actions';
import { GoalsReducer } from '@/redux/reducers/goals';
import CreateGoalModal from '@/modals/CreateGoalModal';

interface Props {
  history: any;
  goalsState: GoalsReducer;
  actions: any;
}

interface State {
  isModalOpen: boolean;
  selectedGoal: Goal | null;
  contextRef: any;
  openGoal: {
    id: number | null,
    title: string;
    description: string;
    awards: number;
  };
}

class Goals extends React.Component<Props, State> {
  state = {
    selectedGoal: null,
    isModalOpen: false,
    contextRef: undefined,
    openGoal: {
      id: null,
      title: '',
      description: '',
      awards: 0,
    },
  };

  componentDidMount() {
    this.fetchGoals();
  }

  addGoal = () => this.setState({ selectedGoal: null }, this.handleGoalModalOpen);

  fetchGoals = () => this.props.actions.getGoals();

  handleContextRef = contextRef => this.setState({ contextRef });

  handleModifyGoal = selectedGoal => this.setState({ selectedGoal, isModalOpen: true });

  handleDeleteGoal = id => {
    this.props.actions.deleteGoal(id);
  }

  handleFailGoal = id => {
    this.props.actions.failGoal(id);
  }

  handleCompleteGoal = id => {
    this.props.actions.completeGoal(id);
  }

  handleGoalModalSubmit = (goal: CreateGoalDto) => {
    const {
      selectedGoal,
    } = this.state;
    if (selectedGoal) {
      return this.props.actions.updateGoal(get(selectedGoal, 'id'), goal);
    }
    return this.props.actions.createGoal(goal);
  }

  handleGoalModalOpen = () => this.setState({ isModalOpen: true });

  handleGoalModalClose = () => this.setState({ isModalOpen: false });

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.goalsState.isLoading !== this.props.goalsState.isLoading ||
      nextProps.goalsState.goals.length !== this.props.goalsState.goals.length
    ) {
      this.setState({});
    }
  }

  render() {
    const { isModalOpen, contextRef, selectedGoal } = this.state;
    const { isLoading, goals } = this.props.goalsState;
    return (
      <Segment loading={isLoading} basic={true} ref={this.handleContextRef}>

        <CreateGoalModal
          isOpen={isModalOpen}
          isLoading={isLoading}
          selectedGoal={selectedGoal}
          onSubmit={this.handleGoalModalSubmit}
          handleOpen={this.handleGoalModalOpen}
          handleClose={this.handleGoalModalClose}
        />

        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="arrow alternate circle up" circular={true} />
            Goals
          </Header.Content>
        </Header>
        <Sticky
          context={contextRef}
        >
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.fetchGoals} circular={true} icon={true}>
              <Icon name="sync" />
            </Button>
            <Button onClick={this.addGoal} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Card.Group centered={true}>
          {
            goals.map(goal => {
              const handleModify = () => this.handleModifyGoal(goal);
              const handleDelete = () => this.handleDeleteGoal(goal.id);
              const handleComplete = () => this.handleCompleteGoal(goal.id);
              const handleFail = () => this.handleFailGoal(goal.id);
              return (
                <Card key={`card_${goal.id}`}>
                  <Card.Content>
                    <Card.Header >
                      <Icon name="hourglass start" circular={true} />
                      {goal.title}
                    </Card.Header>
                    <div style={{ textAlign: 'right', alignSelf: 'center' }}>
                      <Dropdown icon={<Icon name="options" />}>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleFail} text="Mark as Failed" />
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleModify} text="Update Goal" />
                          <Dropdown.Item onClick={handleDelete} text="Delete Goal" />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <Card.Meta>{`Awards: ${goal.awards} XP - Status: ${GoalStatuses[goal.status]}`}</Card.Meta>
                    <Card.Description>{goal.description}</Card.Description>
                  </Card.Content>
                  <Card.Content textAlign="center">
                    <Button onClick={handleComplete} color="green">Completed</Button>
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
  goalsState: state.goals,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...GoalsActions }, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Goals));
