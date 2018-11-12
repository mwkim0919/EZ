import * as React from 'react';
import * as R from 'ramda';
import { Transaction, Category } from 'src/types/budget';
import CategoryItem from 'src/components/Category/CategoryItem';

interface Props {
  fetchCategories: () => void;
  categories: Category[];
  transactions: Transaction[];
}

export default class CategoryList extends React.Component<Props> {
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
      acc[category.name] = this.storeAllSubCategoryNames(category, [category.name]);
      // acc.push(this.storeAllSubCategoryNames(category, [category.name]));
      return acc;
    }, {});
  }

  groupAmountByCategory(transactions: Transaction[]): object {
    return transactions.reduce((acc: object, transaction: Transaction) => {
      const key = transaction.categoryName || 'others';
      acc[key] = Number(transaction.withdraw).toFixed(2);
      return acc;
    }, {});
  }

  resolveCategoryAndAmount(categorySets: object, amountByCategory: object) {
    const result = {};
    for (const categorySet of Object.keys(categorySets).map(key => categorySets[key])) {
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

  render() {
    const { categories, transactions } = this.props;
    const categorySets = this.getAllCategorySets(categories);
    console.log(categorySets);
    const categoryAmountMap = this.resolveCategoryAndAmount(
      categorySets,
      this.groupAmountByCategory(transactions)
    );
    return (
      <div>
        {categories.map((category: Category) => {
          return (
            <CategoryItem
              key={category.id}
              categoryLimit={category.categoryLimit}
              categorySet={categorySets[category.name]}
              amount={categoryAmountMap[category.name]}
            />
          );
        })}
      </div>
    );
  }
}
