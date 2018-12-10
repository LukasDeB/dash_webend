import * as React from 'react';
import { get, cloneDeep } from 'lodash';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react';
import { UpdateQuestDto, CreateQuestDto, Quest } from '@/models';

export interface State extends CreateQuestDto {

}

export interface Props {
  selected?: Quest | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (quest: CreateQuestDto | UpdateQuestDto) => void;
}

class CreateQuestModal extends React.Component<Props, State> {
  state = {
    name: '',
    description: '',
    currentDifficulty: 0,
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected) {
      if (nextProps.selected.id !== get(this.props, 'selected.id', null)) {
        return this.setState({
          name: nextProps.selected.name,
          currentDifficulty: nextProps.selected.currentDifficulty,
          description: nextProps.selected.description,
        });
      }
    } else if (this.props.selected || !nextProps.selected) {
      this.setState({
        name: '',
        currentDifficulty: 0,
        description: '',
      });
    }
  }

  get title() {
    return this.props.selected
      ? this.props.selected.name : 'Add Quest';
  }

  onChangeForm = (e, { name = '', value = '' }) => this.setState(state => {
    switch (name) {
      case 'name':
        return {
          ...state,
          name: value,
        };
      case 'description':
        return {
          ...state,
          description: value,
        };
      case 'currentDifficulty':
        return {
          ...state,
          currentDifficulty: +value,
        };
      default:
        return state;
    }
  })

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const {
      name,
      description,
      currentDifficulty,
    } = this.state;
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="small"
      >
        <Header icon="trophy" content={this.title} />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <Form.Field>
              <Form.Input
                type="text"
                name="name"
                label="Name"
                onChange={this.onChangeForm}
                required={true}
                value={name}
                placeholder="Quest Name"
              />
              <Form.Input
                type="number"
                name="currentDifficulty"
                required={true}
                onChange={this.onChangeForm}
                label="Current Difficulty"
                value={currentDifficulty}
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
export default CreateQuestModal;