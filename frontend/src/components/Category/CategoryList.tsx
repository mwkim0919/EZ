import * as React from 'react';
import { Transaction, Category } from 'src/types/budget';
import {
  storeAllSubCategoryNames,
  generateCategoryMaps,
  getTransactionMonths,
  resolveCategoryAndAmount,
  groupAmountByCategory,
} from 'src/utils/categoryUtil';
import CategoryItem from 'src/components/Category/CategoryItem';

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

  // @ts-ignore
  selectDate(e) {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }

  render() {
    const { categories, transactions } = this.props;
    const categoryMaps = generateCategoryMaps(categories);
    const months = getTransactionMonths(transactions);
    const selectedMonth = this.state.date || months[0];
    const selectedTransactions = transactions.filter(
      (transaction: Transaction) =>
        String(transaction.transactionDatetime).substring(0, 7) ===
        selectedMonth
    );
    const categoryAmountMap = resolveCategoryAndAmount(
      categoryMaps,
      groupAmountByCategory(selectedTransactions)
    );
    console.log(categoryAmountMap);
    return (
      <div>
        <label htmlFor="exampleFormControlSelect1">Date</label>
        <select
          className="form-control"
          id="date"
          onChange={e => this.selectDate(e)}
        >
          {Array.from(months).map((date: string) => {
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
