import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import uuid from 'uuid/v4';
import { Transaction, SavingsGoal } from '@/models';

import {
  Header,
  Segment,
  Icon,
  Sticky,
  Button,
  Card,
  Feed,
  Message,
  Progress,
} from 'semantic-ui-react';
import MoneyTransactionModal from '@/modals/MoneyTransactionModal';
import SavingsGoalModal, { SavingsGoalModalState } from '@/modals/SavingsGoalModal';
import SavingsIcon from '@/components/Economy/SavingsIcon';
import { DateTime } from '@/constants';
import QuestTags from '@/components/Quest/QuestTags';

interface Props {
  history: any;
}

interface State {
  money: number;
  savingsGoals: SavingsGoal[];
  isModalOpen: boolean;
  selectedGoal: SavingsGoal | null;
}

class Savings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const money = Number(localStorage.getItem('money')) || 0;
    const savingsGoals: SavingsGoal[] = JSON.parse(localStorage.getItem('savingsGoals') || '[]') || [];
    this.state = {
      money,
      savingsGoals: savingsGoals.map(itm => ({
        ...itm,
        dueDate: moment(itm.dueDate),
      })),
      isModalOpen: false,
      selectedGoal: null,
    };
  }

  getTotalMoney(transactions: Transaction[], base: number = 0): number {
    return transactions.reduce((money, trans) => {
      const isNeg = +trans.amount < 0;
      return money + +trans.amount;
    }, base);
  }

  addGoal = () => this.setState({ selectedGoal: null, isModalOpen: true });

  editGoal = selectedGoal => this.setState({ selectedGoal, isModalOpen: true });

  deleteGoal = id => {
    const savingsGoals = this.state.savingsGoals;
    const index = savingsGoals.findIndex(itm => itm.id === id);
    if (index >= 0) {
      savingsGoals.splice(index, 1);
      this.setState({
        savingsGoals,
      }, this.persistData);
    }
  }

  showModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  handleSubmit = (data: SavingsGoalModalState) => {
    this.setState((state: State): State => {
      const {
        id,
        title,
        reason,
        amount,
        dueDate,
        progress,
        selectedQuests,
      } = data;
      if (id) {
        const goalIndex = state.savingsGoals.findIndex(itm => itm.id === id);
        if (goalIndex >= 0) {
          state.savingsGoals.splice(goalIndex, 1, {
            ...state.savingsGoals[goalIndex],
            title,
            reason,
            dueDate,
            amount: +amount,
            progress: +progress,
            relatedQuests: selectedQuests,
          });
        }
        return {
          ...state,
          isModalOpen: false,
        };
      }
      const newGoal: SavingsGoal = {
        id: uuid(),
        title,
        reason,
        dueDate,
        amount: +amount,
        progress: +progress,
        relatedQuests: selectedQuests,
      };
      return {
        ...state,
        isModalOpen: false,
        savingsGoals: [...state.savingsGoals, newGoal],
      };
    }, this.persistData);
  }

  persistData() {
    localStorage.setItem('savingsGoals', JSON.stringify(this.state.savingsGoals));
  }

  render() {
    const {
      isModalOpen,
      money,
      savingsGoals,
      selectedGoal,
    } = this.state;
    return (
      <Segment basic={true}>
        <SavingsGoalModal
          isOpen={isModalOpen}
          isLoading={false}
          selected={selectedGoal}
          onSubmit={this.handleSubmit}
          handleOpen={this.showModal}
          handleClose={this.closeModal}
        />
        <Header as="h2" textAlign="left">
          <Header.Content>
            <SavingsIcon color="teal" />
            Metas de ahorro
          </Header.Content>
          <Header.Subheader
            content="Juntar todo peso posible hasta los 35, reventarlo todo y morirse de una sobredosis"
          />
        </Header>
        <Button.Group
          floated="right"
          vertical={true}
          style={{ marginBottom: '10px' }}
          className="btnGroupResourceOptions"
        >
          <Button onClick={this.addGoal} circular={true} icon={true}>
            <Icon name="add" />
          </Button>
        </Button.Group>
        <Card fluid={true} centered={true}>
          <Card.Content textAlign="center">
            <h2>{`Tu economía actual es de: $ ${money}`}</h2>
          </Card.Content>
        </Card>
        <Card.Group centered={true}>
          {
            savingsGoals.map(itm => {
              const onClick = () => this.editGoal(itm);
              const onDelete = () => this.deleteGoal(itm.id);
              return (
                <Card key={`savingsGoal_${itm.id}`}>
                  <Card.Content>
                    {itm.title && <Card.Header>{itm.title}</Card.Header>}
                    {itm.dueDate && (
                      <Card.Meta>Vence: {itm.dueDate.format(DateTime.displayDate)}</Card.Meta>
                    )}
                    <Button floated="right" size="mini" onClick={onDelete} icon="delete" circular={true} />
                    <Button floated="right" size="mini" onClick={onClick} icon={true} circular={true}>
                      <Icon name="edit" />
                    </Button>
                  </Card.Content>
                  <Card.Content description={itm.reason} />
                  <Card.Content extra={true}>
                    <Card.Description>{`${itm.progress} / ${itm.amount}`}</Card.Description>
                    <Progress
                      progress={true}
                      success={itm.progress === itm.amount}
                      indicating={itm.progress !== itm.amount}
                      percent={(itm.progress * 100 / itm.amount).toFixed(0)}
                    />
                    <QuestTags quests={itm.relatedQuests} />
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
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Savings));
