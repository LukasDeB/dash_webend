import * as React from 'react';
import { get, cloneDeep } from 'lodash';
import {
  Modal,
  Button,
  Icon,
  Header,
  Form,
  Grid,
} from 'semantic-ui-react';
import { Feed, CreateFeedDto, UpdateFeedDto } from '@/models';
import 'draft-js/dist/Draft.css';

export interface State extends CreateFeedDto {
}

export interface Props {
  selected?: Feed | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (quest: CreateFeedDto | UpdateFeedDto) => void;
}

class FeedModal extends React.Component<Props, State> {
  state = {
    url: '',
    alias: '',
    titleKey: '',
    bodyKey: '',
    dateKey: '',
    imageKey: '',
    authorKey: '',
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected) {
      if (nextProps.selected.id !== get(this.props, 'selected.id', null)) {
        return this.setState({
          url: nextProps.selected.url,
          alias: nextProps.selected.alias,
          titleKey: nextProps.selected.titleKey,
          bodyKey: nextProps.selected.bodyKey,
          dateKey: nextProps.selected.dateKey,
          imageKey: nextProps.selected.imageKey,
          authorKey: nextProps.selected.authorKey,
        });
      }
    } else if (this.props.selected || !nextProps.selected) {
      this.setState({
        alias: '',
        url: '',
        titleKey: '',
        bodyKey: '',
        dateKey: '',
        imageKey: '',
        authorKey: '',
      });
    }
  }

  get title() {
    return this.props.selected
      ? this.props.selected.alias || 'Add Feed' : 'Add Feed';
  }

  onChangeForm = (e, { name, value }) => this.setState(state => {
    switch (name) {
      case 'url':
        return {
          ...state,
          url: value,
        };
      case 'alias':
        return {
          ...state,
          alias: value,
        };
      case 'titleKey':
        return {
          ...state,
          titleKey: value,
        };
      case 'bodyKey':
        return {
          ...state,
          bodyKey: value,
        };
      case 'dateKey':
        return {
          ...state,
          dateKey: value,
        };
      case 'imageKey':
        return {
          ...state,
          imageKey: value,
        };
      case 'authorKey':
        return {
          ...state,
          authorKey: value,
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
      url,
      alias,
      titleKey,
      bodyKey,
      dateKey,
      imageKey,
      authorKey,
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
            <Form.Input
              type="text"
              name="url"
              label="Feed URL"
              onChange={this.onChangeForm}
              required={true}
              value={url}
              placeholder="Feed URL"
            />
            <Form.Group fluid={true}>

              <Form.Input
                type="text"
                name="titleKey"
                label="Title Key"
                onChange={this.onChangeForm}
                required={true}
                value={titleKey}
                placeholder="Feed key for title"
              />
              <Form.Input
                type="text"
                name="bodyKey"
                label="Body Key"
                onChange={this.onChangeForm}
                required={true}
                value={bodyKey}
                placeholder="Feed key for the news body"
              />
            </Form.Group>
            <Form.Group fluid={true}>
              <Form.Input
                type="text"
                name="alias"
                label="Alias"
                onChange={this.onChangeForm}
                value={alias}
                placeholder="Alias for feed"
              />
              <Form.Input
                type="text"
                name="imageKey"
                label="Image Key"
                onChange={this.onChangeForm}
                value={imageKey}
                placeholder="Feed key for the news Image"
              />
            </Form.Group>
            <Form.Group fluid={true}>
              <Form.Input
                type="text"
                name="dateKey"
                label="Date Key"
                onChange={this.onChangeForm}
                value={dateKey}
                placeholder="Date key for feed"
              />
              <Form.Input
                type="text"
                name="authorKey"
                label="Author Key"
                onChange={this.onChangeForm}
                value={authorKey}
                placeholder="Feed key for the news Author"
              />
            </Form.Group>
          </Form >
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Cancel</Button>
          <Button color="green" onClick={this.onSubmit}><Icon name="checkmark" /> Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default FeedModal;