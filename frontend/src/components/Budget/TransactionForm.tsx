import * as React from 'react';
// import * as R from 'ramda';
import TransactionFormItem from './TransactionFormItem';

interface Props {
  transactions: any;
}

interface State {
  count: number;
  editing: boolean;
  temp: string;
}

export default class TransactionForm extends React.Component<Props, State> {
  addTransactionFormItem(e: any) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={e => this.addTransactionFormItem(e)}
        >
          Add more
        </button>
        <hr />
        <form>
          <TransactionFormItem />
          <button className="btn btn-primary btn-lg btn-block">Submit</button>
        </form>
      </div>
    );
  }
}
