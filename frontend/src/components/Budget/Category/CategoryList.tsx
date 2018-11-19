import * as React from 'react';
import { Transaction, Category } from 'src/types/budget';
import {
  getTransactionMonths,
  generateCategoryMaps,
} from 'src/utils/budgetUtil';
import CategoryItem from 'src/components/Budget/Category/CategoryItem';

interface Props {
  fetchCategories: () => void;
  categories: Category[];
  transactions: Transaction[];
}

interface State {
  date: string;
}

export default class CategoryList extends React.Component<Props, State> {
  state = {
    date: '',
  };

  selectDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }

  render() {
    const { categories, transactions } = this.props;
    const months = getTransactionMonths(transactions);
    const selectedMonth = this.state.date || months[0];
    const selectedTransactions = transactions.filter(
      (transaction: Transaction) =>
        String(transaction.transactionDatetime).substring(0, 7) ===
        selectedMonth
    );
    const categoryAmountMap = generateCategoryMaps(categories, selectedTransactions);
    return (
      <div>
        <label htmlFor="date">Date</label>
        <select
          className="form-control"
          id="date"
          onChange={this.selectDate}
        >
          {months.map((date: string) => {
            return <option key={date}>{date}</option>;
          })}
        </select>
        {Object.keys(categoryAmountMap)
          .sort((a, b) => a.localeCompare(b))
          .map(name => {
            return (
              <CategoryItem
                key={name}
                displayName={name}
                limit={categoryAmountMap[name].limit}
                amount={categoryAmountMap[name].expense}
              />
            );
          })}
      </div>
    );
  }
}
