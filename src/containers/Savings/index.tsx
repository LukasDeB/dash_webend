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
  stickyRef;
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

  editGoal = selectedGoal => this.setState({ selectedGoal, isModalOpen: true });

  showModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  handleSubmit = (data: SavingsGoalModalState) => {
    this.setState((state: State): State => {
      const {
        id,
        title,
        reason,
        amount,
        progress,
        dueDate: date,
        selectedQuests,
      } = data;
      const dueDate = moment(date || '');
      if (id && state.savingsGoals.find(itm => itm.id === id)) {
        const savingsGoals = state.savingsGoals.map(itm => itm.id === id ? {
          ...itm,
          title,
          reason,
          dueDate,
          amount: +amount,
          progress: +progress,
          relatedQuests: selectedQuests,
        } : itm);
        return {
          ...state,
          savingsGoals,
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

  handleContextRef = ref => { this.stickyRef = ref; };

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
      <Segment basic={true} ref={this.handleContextRef}>
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
        <Sticky context={this.stickyRef}>
          <Button.Group className="btnGroupResourceOptions" floated="right" vertical={true}>
            <Button onClick={this.showModal} circular={true} icon={true}>
              <Icon name="add" />
            </Button>
          </Button.Group>
        </Sticky>
        <Card fluid={true} centered={true}>
          <Card.Content textAlign="center">
            <h2>{`Tu economía actual es de: $ ${money}`}</h2>
          </Card.Content>
        </Card>
        <Card.Group>
          {
            savingsGoals.map(itm => {
              const onClick = () => this.editGoal(itm);
              return (
                <Card key={`savingsGoal_${itm.id}`}>
                  <Card.Content>
                    {itm.title && <Card.Header>{itm.title}</Card.Header>}
                    {itm.dueDate && (
                      <Card.Meta>Vence: {itm.dueDate.format(DateTime.displayDate)}</Card.Meta>
                    )}
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
