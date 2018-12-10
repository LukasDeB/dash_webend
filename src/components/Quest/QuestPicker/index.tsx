import * as React from 'react';
import { debounce, includes } from 'lodash';
import { connect } from 'react-redux';
import {
  Search, Header, Icon, SearchProps,
} from 'semantic-ui-react';
import {
  QuestsActions,
} from '../../../redux/actions';
import { Quest } from '../../../models';

export interface QuestPickerProps extends SearchProps {
  isLoading: boolean;
  quests: Quest[];
  value: string;
  getQuests: () => void;
  onChange: (value: string) => void;
  onSelect: (quest: Quest) => void;
}

export interface QuestPickerState {
  search: string;
}

class QuestPicker extends React.Component<QuestPickerProps, QuestPickerState> {
  state = { search: '' };

  componentDidMount() {
    this.fetchQuests();
  }

  onChange = (e, data: SearchProps) => this.setState({ search: data.value || '' });

  componentWillReceiveProps(nextProps: QuestPickerProps) {
    const {
      isLoading: nextIsLoading, quests: nextQuests,
    } = nextProps;
    const {
      isLoading, quests,
    } = this.props;
    if (
      nextIsLoading !== isLoading ||
      nextQuests !== quests
    ) {
      this.forceUpdate();
    }
  }

  get results() {
    const {
      quests,
    } = this.props;
    const { search } = this.state;
    const list = search !== ''
      ? quests.filter(itm => includes(itm.name.toLowerCase(), search.toLowerCase()))
      : quests;
    return list.map(itm => ({
      id: itm.id,
      title: itm.name,
    }));
  }

  fetchQuests = () => this.props.getQuests();

  handleResultSelect = (e, props) => {
    if (!props.result.id) {
      return;
    }
    const quest = this.props.quests.find(itm => itm.id === props.result.id);
    if (quest) {
      this.props.onSelect(quest);
    }
  }

  renderQuest = ({ title }) => <Header as="h5"><Icon name="trophy" size="small" />{title}</Header>;

  render() {
    const {
      isLoading,
    } = this.props;
    const { search } = this.state;
    return (
      <Search
        loading={isLoading}
        value={search}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.onChange}
        results={this.results}
        resultRenderer={this.renderQuest}
        defaultOpen={false}
      />
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getQuests: () => dispatch(QuestsActions.getQuests()),
});
const mapStateToProps = state => ({
  isLoading: state.quests.isLoading,
  quests: state.quests.quests,
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestPicker);