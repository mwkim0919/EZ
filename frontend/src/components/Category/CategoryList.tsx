import * as React from 'react';
import * as R from 'ramda';
import { Transaction, Category } from 'src/types/budget';
import CategoryItem from 'src/components/Category/CategoryItem';

interface Props {
  fetchCategories: () => void;
  categories: Category[];
  transactions: Transaction[];
}

interface State {
  date: string;
  selectedTransactions: Transaction[]
}

export default class CategoryList extends React.Component<Props, State> {
  state = {
    date: '',
    selectedTransactions: []
  };

  componentDidMount() {
    const { categories, transactions } = this.props;
    console.log(categories, transactions);
    this.setState({ date: this.getTransactionDateSet(transactions)[0] });
  }

  storeAllSubCategoryNames(
    category: Category,
    resultArray: string[]
  ): string[] {
    if (category.parentCategory != null) {
      resultArray.push(category.parentCategory.name);
      this.storeAllSubCategoryNames(category.parentCategory, resultArray);
    }
    return resultArray;
  }

  getAllCategorySets(categories: Category[]): object {
    return categories.reduce((acc: object, category: Category) => {
      acc[category.name] = this.storeAllSubCategoryNames(category, [
        category.name,
      ]);
      return acc;
    }, {});
  }

  groupAmountByCategory(transactions: Transaction[]): object {
    const filtered = transactions
    .filter(
      (transaction: Transaction) =>
        transaction.transactionDatetime.toString().substring(0, 7) ===
        this.state.date
    );
    // console.log(this.state.date, filtered);
    return transactions
      .filter(
        (transaction: Transaction) =>
          transaction.transactionDatetime.toString().substring(0, 7) ===
          this.state.date
      )
      .reduce((acc: object, transaction: Transaction) => {
        const key = transaction.categoryName || 'others';
        acc[key] = Number(transaction.withdraw).toFixed(2);
        return acc;
      }, {});
  }

  resolveCategoryAndAmount(
    categorySets: object,
    amountByCategory: object
  ): object {
    const result = {};
    for (const categorySet of Object.keys(categorySets).map(
      key => categorySets[key]
    )) {
      // @ts-ignore
      const amounts = R.props(categorySet, amountByCategory);
      const amountToAdd = amounts[0] === undefined ? 0 : Number(amounts[0]);
      for (const category of categorySet) {
        if (result[category] === undefined) {
          result[category] = amountToAdd;
        } else {
          result[category] += amountToAdd;
        }
      }
    }
    return result;
  }

  getTransactionDateSet(transactions: Transaction[]): Set<string> {
    const dateSet = new Set();
    transactions
      .map((transaction: Transaction) =>
        transaction.transactionDatetime.toString().substring(0, 7)
      )
      .sort((a: string, b: string) => b.localeCompare(a))
      .forEach((transaction: string) => {
        dateSet.add(transaction);
      });
    return dateSet;
  }

  // @ts-ignore
  selectDate(e) {
    e.preventDefault();
    this.setState({ date: e.target.value });
  }

  render() {
    const { categories, transactions } = this.props;
    const categorySets = this.getAllCategorySets(categories);
    const categoryAmountMap = this.resolveCategoryAndAmount(
      categorySets,
      this.groupAmountByCategory(transactions)
    );
    // console.log(this.state.date, categoryAmountMap);
    const dateSet = this.getTransactionDateSet(transactions);
    return (
      <div>
        <label htmlFor="exampleFormControlSelect1">Date</label>
        <select
          className="form-control"
          id="date"
          onChange={e => this.selectDate(e)}
        >
          {Array.from(dateSet).map((date: string) => {
            return <option key={date}>{date}</option>;
          })}
        </select>
        {categories.map((category: Category) => {
          return (
            <CategoryItem
              key={category.id}
              categorySet={categorySets[category.name]}
              categoryLimit={category.categoryLimit}
              amount={categoryAmountMap[category.name]}
            />
          );
        })}
      </div>
    );
  }
}
