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
import { Feed, CreateFeedDto, UpdateFeedDto, Transaction } from '@/models';
import 'draft-js/dist/Draft.css';

export interface State {
  id?: string;
  amount: number;
  description: string;
}

export interface Props {
  selected?: Transaction | null;
  isOpen: boolean;
  isLoading: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onSubmit: (transaction: State) => void;
}

class MoneyTransactionModal extends React.Component<Props, State> {
  state = {
    description: '',
    amount: 0,
  };

  form: any = null;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected) {
      if (nextProps.selected.id !== get(this.props, 'selected.id', null)) {
        return this.getState(nextProps.selected);
      }
    } else if (this.props.selected || !nextProps.selected) {
      this.getState();
    }
  }

  getState(transaction?: Transaction) {
    const data = transaction || {};
    this.setState({
      id: get(data, 'id'),
      amount: get(data, 'amount', 0),
      description: get(data, 'description', ''),
    });
  }

  onChangeForm = (e, { name, value }) => this.setState(prevState => {
    const state = cloneDeep(prevState);
    state[name] = value;
    return state;
  })

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const {
      amount,
      description,
    } = this.state;
    return (
      <Modal
        closeIcon={true}
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        size="large"
      >
        <Header icon="money" content="Transacción" />
        <Modal.Content>
          <Form
            ref={ref => { this.form = ref; }}
            onSubmit={this.onSubmit}
            loading={this.props.isLoading}
          >
            <Form.TextArea
              type="text"
              name="description"
              label="Descripción"
              onChange={this.onChangeForm}
              value={description}
              placeholder="En qué gastaste la plata o qué te generó ingresos"
            />
            <Form.Input
              type="number"
              name="amount"
              label="Monto (positivo o negativo)"
              onChange={this.onChangeForm}
              value={amount}
            />
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
export default MoneyTransactionModal;