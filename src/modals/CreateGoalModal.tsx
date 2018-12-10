import * as React from 'react';
import { get, includes, cloneDeep } from 'lodash';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
  List,
  Card,
  Label,
} from 'semantic-ui-react';
import { UpdateGoalDto, CreateGoalDto, Goal, Quest } from '@/models';
import QuestPicker from '@/components/Quest/QuestPicker';

export interface State extends CreateGoalDto {
  questSearch: string;
  selectedQuests: Quest[];
}

export interface Props {
  selectedGoal?: Goal | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (goal: CreateGoalDto | UpdateGoalDto) => void;
}

class CreateGoalModal extends React.Component<Props, State> {
  state = {
    title: '',
    description: '',
    awards: 0,
    questSearch: '',
    selectedQuests: [],
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedGoal) {
      if (nextProps.selectedGoal.id !== get(this.props, 'selectedGoal.id', null)) {
        return this.setState({
          title: nextProps.selectedGoal.title,
          awards: nextProps.selectedGoal.awards,
          description: nextProps.selectedGoal.description,
        });
      }
    } else if (this.props.selectedGoal || !nextProps.selectedGoal) {
      this.setState({
        title: '',
        awards: 0,
        description: '',
      });
    }
  }

  get title() {
    return this.props.selectedGoal
      ? this.props.selectedGoal.title : 'Add Goal';
  }

  onChangeForm = (e, { name, value }) => {
    this.setState(state => {
      switch (name) {
        case 'title':
          return {
            ...state,
            title: value,
          };
        case 'description':
          return {
            ...state,
            description: value,
          };
        case 'awards':
          return {
            ...state,
            awards: +value,
          };
        default:
          return state;
      }
    });
  }

  onChangeQuestSearch = questSearch => {
    this.setState({ questSearch });
  }

  onSelectQuest = (quest: Quest) => this.setState(state => {
    if (includes(state.selectedQuests, quest)) {
      return {
        ...state,
        selectedQuests: state.selectedQuests.filter(itm => itm.id !== quest.id),
      };
    }
    return {
      ...state,
      selectedQuests: [...state.selectedQuests, quest],
    };
  })

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const {
      title,
      description,
      awards,
      questSearch,
      selectedQuests,
    } = this.state;
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="small"
      >
        <Header icon="checkmark" content={this.title} />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <QuestPicker
              onSelect={this.onSelectQuest}
              onChange={this.onChangeQuestSearch}
            />
            <Form.Field>
              <Form.Input
                type="text"
                name="title"
                label="Title"
                onChange={this.onChangeForm}
                required={true}
                value={title}
                placeholder="Goal Title"
              />
              <Form.Input
                type="number"
                name="awards"
                required={true}
                onChange={this.onChangeForm}
                label="Awards"
                value={awards}
                placeholder="How much XP will goal award on completion"
              />
              <Form.TextArea
                name="description"
                onChange={this.onChangeForm}
                required={true}
                label="Description"
                value={description}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Cancel</Button>
          <Button color="green" onClick={this.onSubmit}><Icon name="checkmark" /> Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default CreateGoalModal;