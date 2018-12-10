import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import uuid from 'uuid/v4';
import { Transaction } from '@/models';

import {
  Header,
  Segment,
  Icon,
  Sticky,
  Button,
  Card,
  Feed,
  Message,
} from 'semantic-ui-react';
import MoneyTransactionModal from '@/modals/MoneyTransactionModal';

interface Props {
  history: any;
}

interface State {
  money: number;
  transactions: Transaction[];
  isModalOpen: boolean;
  selectedTransaction: Transaction | null;
}

interface CurrentEconomy {
  money: number;
}

class Economy extends React.Component<Props, State> {
  stickyRef;
  constructor(props: Props) {
    super(props);

    const money = Number(localStorage.getItem('money')) || 0;
    const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]') || [];
    this.state = {
      money,
      transactions: transactions.map(itm => ({
        ...itm,
        date: moment(itm.date),
      })),
      isModalOpen: false,
      selectedTransaction: null,
    };
  }

  getTotalMoney(transactions: Transaction[], base: number = 0): number {
    return transactions.reduce((money, trans) => {
      const isNeg = +trans.amount < 0;
      return money + +trans.amount;
    }, base);
  }

  showModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  handleSubmit = (data: { id?: string, description: string, amount: number }) => {
    this.setState(state => {
      const {
        id, description, amount,
      } = data;
      if (id && state.transactions.find(itm => itm.id === id)) {
        const transactions = state.transactions.map(itm => itm.id === id ? {
          ...itm,
          amount: +amount,
          description,
        } : itm);
        const money = this.getTotalMoney(transactions, 0);
        return {
          ...state,
          money,
          transactions,
          isModalOpen: false,
        };
      }
      const transaction: Transaction = {
        id: uuid(),
        description,
        amount: +amount,
        date: moment(),
      };
      return {
        ...state,
        isModalOpen: false,
        money: this.getTotalMoney([...state.transactions, transaction], 0),
        transactions: [...state.transactions, transaction],
      };
    }, this.persistData);
  }

  persistData() {
    localStorage.setItem('money', JSON.stringify(this.state.money));
    localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
  }

  render() {
    const {
      isModalOpen,
      money,
      transactions,
      selectedTransaction,
    } = this.state;
    return (
      <Segment basic={true} ref={ref => { this.stickyRef = ref; }}>
        <MoneyTransactionModal
          isOpen={isModalOpen}
          isLoading={false}
          onSubmit={this.handleSubmit}
          handleOpen={this.showModal}
          handleClose={this.closeModal}
        />
        <Header as="h2" textAlign="left">
          <Header.Content>
            <Icon color="teal" name="money bill alternate outline" circular={true} />
            Economía
          </Header.Content>
          <Header.Subheader>
            Para anotar transacciones de ingresos y gastos, y para gestionar metas de ahorro, madafaca.
          </Header.Subheader>
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
        <Feed>
          {
            transactions.map(itm => {
              const isNeg = +itm.amount < 0;
              const message = !isNeg
                ? (
                  <Message
                    success={true}
                    icon="plus circle"
                    header={itm.description}
                    content={`Ingreso de $ ${+itm.amount} - ${itm.date.fromNow()}`}
                  />
                ) : (
                  <Message
                    error={true}
                    icon="minus circle"
                    header={itm.description}
                    content={`Gasto de $ ${Math.abs(itm.amount)} - ${itm.date.fromNow()}`}
                  />
                );
              return (
                <Feed.Event key={`feed_${itm.id}`}>
                  {/* <Feed.Label icon={icon} /> */}
                  <Feed.Content>{message}</Feed.Content>
                </Feed.Event>
              );
            })
          }
        </Feed>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Economy));
