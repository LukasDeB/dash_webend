import * as React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

import { JournalEntry, CreateJournalEntryDto, UpdateJournalEntryDto } from '@/models';
import { JournalActions } from '@/redux/actions';
import { bindActionCreators } from 'redux';
import JournalEntryModal from '@/modals/JournalEntryModal';
import { DateTime } from '@/constants';

interface Props {
  history: any;
  actions: any;
  isLoading: boolean;
  entries: JournalEntry[];
}

interface State {
  isModalOpen: boolean;
  contextRef: any;
  selectedEntry: UpdateJournalEntryDto | null;
}

class Journal extends React.Component<Props, State> {
  state = {
    isModalOpen: false,
    contextRef: undefined,
    selectedEntry: {
      title: '',
      body: '',
    },
  };

  componentDidMount() {
    this.fetch();
  }

  addEntry = () => this.setState({ selectedEntry: null }, this.openModal);

  fetch = () => this.props.actions.getJournal();

  handleContextRef = contextRef => this.setState({ contextRef });

  handleModifyEntry = selectedEntry => this.setState({ selectedEntry, isModalOpen: true });

  handleDeleteEntry = id => {
    this.props.actions.deleteEntry(id);
  }

  handleModalSubmit = (entry: CreateJournalEntryDto | UpdateJournalEntryDto) => {
    const {
      selectedEntry,
    } = this.state;
    if (selectedEntry) {
      return this.props.actions.updateEntry(get(selectedEntry, 'id'), entry);
    }
    return this.props.actions.createEntry(entry);
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.isLoading !== this.props.isLoading ||
      nextProps.entries.length !== this.props.entries.length
    ) {
      this.setState({});
    }
  }

  render() {
    const { isModalOpen, contextRef, selectedEntry } = this.state;
    const { isLoading, entries } = this.props;
    return (
      <Segment loading={isLoading} basic={true} ref={this.handleContextRef}>

        <JournalEntryModal
          isOpen={isModalOpen}
          isLoading={isLoading}
          selected={selectedEntry}
          onSubmit={this.handleModalSubmit}
          handleOpen={this.openModal}
          handleClose={this.closeModal}
        />

        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="book" circular={true} />
            Journal
          </Header.Content>
        </Header>
        <Sticky context={contextRef}>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.fetch} circular={true} icon={true}>
              <Icon name="sync" />
            </Button>
            <Button onClick={this.addEntry} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Card.Group centered={true}>
          {
            entries.map((entry: JournalEntry) => {
              const handleModify = () => this.handleModifyEntry(entry);
              const handleDelete = () => this.handleDeleteEntry(entry.id);
              return (
                <Card key={`card_${entry.id}`} fluid={true}>
                  <Card.Content>
                    <Card.Header as="h2">
                      {entry.title}
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
                      {moment(entry.created).format(DateTime.fullDisplayDateTime)}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    {entry.body}
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
  isLoading: state.journal.isLoading,
  entries: state.journal.entries,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...JournalActions }, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));
