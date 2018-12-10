import * as React from 'react';
import { get, cloneDeep } from 'lodash';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react';
import { Editor, EditorState, ContentState } from 'draft-js';
import { JournalEntry, CreateJournalEntryDto, UpdateJournalEntryDto } from '@/models';
import 'draft-js/dist/Draft.css';

export interface State extends CreateJournalEntryDto {
  editorState: EditorState;
}

export interface Props {
  selected?: {
    id?: number | null;
    title: string;
    body: string;
  } | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (quest: CreateJournalEntryDto | UpdateJournalEntryDto) => void;
}

class JournalEntryModal extends React.Component<Props, State> {
  state = {
    editorState: EditorState.createEmpty(),
    title: '',
    body: '',
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected) {
      if (nextProps.selected.id !== get(this.props, 'selected.id', null)) {
        return this.setState({
          title: nextProps.selected.title,
          body: nextProps.selected.body,
          editorState: EditorState.createWithContent(
            ContentState.createFromText(nextProps.selected.body),
          ),
        });
      }
    } else if (this.props.selected || !nextProps.selected) {
      this.setState({
        title: '',
        body: '',
        editorState: EditorState.createEmpty(),
      });
    }
  }

  get title() {
    return this.props.selected
      ? this.props.selected.title : 'Add Entry';
  }

  onChangeEditor = (editorState: EditorState) => this.setState({ editorState });

  onChangeForm = e => this.setState(state => {
    switch (e.target.name) {
      case 'title':
        return {
          ...state,
          title: e.target.value,
        };
      case 'body':
        return {
          ...state,
          body: e.target.value,
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
      title,
      body,
      editorState,
    } = this.state;
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="large"
      >
        <Header icon="book" content={this.title} />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <Form.Field>
              <Form.Input
                type="text"
                name="title"
                label="Title"
                onChange={this.onChangeForm}
                required={true}
                value={title}
                placeholder="Entry Title"
              />
              <Form.TextArea
                name="body"
                onChange={this.onChangeForm}
                required={true}
                autoHeight={true}
                rows={25}
                placeholder="Write about whatever"
                value={body}
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
export default JournalEntryModal;