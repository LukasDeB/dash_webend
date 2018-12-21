import * as React from 'react';
import { get, cloneDeep } from 'lodash';
import * as moment from 'moment';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react';
import {
  DateInput,
} from 'semantic-ui-calendar-react';
import { SavingsGoal, Transaction, Quest } from '@/models';
import 'draft-js/dist/Draft.css';
import QuestPicker from '@/components/Quest/QuestPicker';
import QuestTags from '@/components/Quest/QuestTags';
import { DateTime } from '@/constants';

export interface SavingsGoalModalState {
  id?: string;
  title: string;
  amount: number;
  progress: number;
  reason: string;
  dueDate: moment.Moment;
  selectedQuests: Quest[];
}

export interface Props {
  selected?: SavingsGoal | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (savingsGoal: SavingsGoalModalState) => void;
}

const initialState: SavingsGoalModalState = {
  id: undefined,
  title: '',
  reason: '',
  amount: 0,
  progress: 0,
  dueDate: moment(),
  selectedQuests: [],
};

class SavingsGoalModal extends React.Component<Props, SavingsGoalModalState> {
  state = { ...initialState };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected && nextProps.selected !== this.props.selected) {
      if (nextProps.selected.id !== get(this.props, 'selected.id', null)) {
        return this.getState(nextProps.selected);
      }
    } else if (this.props.selected || !nextProps.selected) {
      this.getState();
    }
  }

  getState(goal?: SavingsGoal) {
    if (!goal) {
      this.setState({ ...initialState });
      return;
    }
    this.setState({
      id: goal.id,
      title: goal.title || '',
      amount: goal.amount,
      progress: goal.progress,
      reason: goal.reason,
      dueDate: goal.dueDate ? moment(goal.dueDate) : moment(),
      selectedQuests: goal.relatedQuests,
    });
  }

  onChangeDate = (e, data: { value: string, dateFormat: string }) => this.setState({
    dueDate: moment(data.value, data.dateFormat),
  })

  onChangeForm = (e, { name, value }) => this.setState(prevState => {
    const state = cloneDeep(prevState);
    state[name] = value;
    return state;
  })

  onSelectQuest = (quest: Quest) => this.setState(state => {
    const exists = state.selectedQuests.find(itm => itm.id === quest.id);
    return {
      ...state,
      selectedQuests: exists
        ? state.selectedQuests.filter(itm => itm.id !== quest.id)
        : [...this.state.selectedQuests, quest],
    };
  })

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const {
      title,
      amount,
      reason,
      dueDate,
      progress,
      selectedQuests,
    } = this.state;
    return (
      <Modal
        size="large"
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
      >
        <Header icon="money bill alternate" content="Meta" />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <Form.Input
              type="text"
              name="title"
              label="Título"
              onChange={this.onChangeForm}
              value={title}
            />
            <Form.Input
              type="number"
              name="amount"
              label="Monto (positivo o negativo)"
              onChange={this.onChangeForm}
              value={amount}
            />
            <Form.Input
              type="number"
              name="progress"
              label="Progreso"
              onChange={this.onChangeForm}
              max={amount}
              value={progress}
            />
            <Form.TextArea
              type="text"
              name="reason"
              label="Razón"
              value={reason}
              onChange={this.onChangeForm}
            />
            <Form.Field>
              <label>Relacionado a:</label>
              <QuestPicker
                selected={selectedQuests}
                onSelect={this.onSelectQuest}
              />
              <QuestTags quests={selectedQuests} />
            </Form.Field>
            <Form.Field>
              <label>Fecha Límite</label>
              <DateInput
                name="date"
                iconPosition="left"
                closeOnMouseLeave={false}
                popupPosition="top center"
                onChange={this.onChangeDate}
                // dateFormat={DateTime.displayDate}
                value={dueDate.format(DateTime.DatePicker)}
                minDate={moment().format(DateTime.DatePicker)}
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
export default SavingsGoalModal;