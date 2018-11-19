import { Category, Transaction } from 'src/types/budget';

export interface MonthlyDepositWithdraw {
  [month: string]: DepositWithdraw;
}

export interface DepositWithdraw {
  deposit: number;
  withdraw: number;
}

export interface CategoryMap {
  expense: number;
  limit: number;
}

export interface CategoryMaps {
  [categoryKey: string]: CategoryMap;
}

export interface CategoryWithdrawMap {
  [categoryName: string]: number;
}

export const generateCategoryMaps = (
  categories: Category[],
  transactions: Transaction[]
) => {
  const result = initializeCategoryMaps(categories);
  for (const transaction of transactions) {
    const categoryNames = getCategoryNames(transaction.categoryId, categories);
    const amount = transaction.withdraw ? Number(transaction.withdraw) : 0;
    let key = '';
    for (const categoryName of categoryNames) {
      key += categoryName;
      result[key].expense += amount;
      key += ' / ';
    }
  }
  return result;
};

export const generateParentCategoryWithdrawMaps = (
  transactions: Transaction[],
  categories: Category[]
): CategoryWithdrawMap => {
  return transactions.reduce(
    (acc: CategoryWithdrawMap, transaction: Transaction) => {
      const amount = transaction.withdraw ? Number(transaction.withdraw) : 0;
      const categoryName = transaction.categoryId
        ? getParentCategoryNameById(transaction.categoryId, categories)
        : 'Others';
      acc[categoryName] = acc[categoryName]
        ? acc[categoryName] + amount
        : amount;
      return acc;
    },
    {}
  );
};

export const getTransactionMonths = (transactions: Transaction[]): string[] => {
  const dateSet = new Set();
  transactions
    .map((transaction: Transaction) =>
      transaction.transactionDatetime.toString().substring(0, 7)
    )
    .sort((a: string, b: string) => b.localeCompare(a))
    .forEach((transaction: string) => {
      dateSet.add(transaction);
    });
  return Array.from(dateSet);
};

export const sumDepositAndWithdraw = (
  transactions: Transaction[],
  months: string[]
): MonthlyDepositWithdraw => {
  const result = {};
  for (const month of months) {
    result[month] = transactions.reduce(
      (acc: DepositWithdraw, transaction: Transaction) => {
        if (
          transaction.transactionDatetime.toString().substring(0, 7) === month
        ) {
          acc.deposit += Number(transaction.deposit) || 0;
          acc.withdraw += Number(transaction.withdraw) || 0;
        }
        return acc;
      },
      {
        deposit: 0,
        withdraw: 0,
      }
    );
  }
  return result;
};

function initializeCategoryMaps(categories: Category[]): CategoryMaps {
  const result = {
    Others: {
      expense: 0,
      limit: 0,
    },
  };
  for (const category of categories) {
    let categoryTemp = category;
    const keyArray = [categoryTemp.name];
    while (categoryTemp.parentCategory) {
      keyArray.push(categoryTemp.parentCategory.name);
      categoryTemp = categoryTemp.parentCategory;
    }
    const key = keyArray.reverse().join(' / ');
    result[key] = {
      expense: 0,
      limit: category.categoryLimit ? Number(category.categoryLimit) : 0,
    };
  }
  return result;
}

function getCategoryNames(
  categoryId: number | null,
  categories: Category[]
): string[] {
  if (categoryId === null) {
    return ['Others'];
  }
  let selectedCategory = categories.filter(
    category => category.id === categoryId
  )[0];
  return putRelatedCategoryNamesInArray();

  function putRelatedCategoryNamesInArray(): string[] {
    const keyArray = [selectedCategory.name];
    while (selectedCategory.parentCategory) {
      keyArray.push(selectedCategory.parentCategory.name);
      selectedCategory = selectedCategory.parentCategory;
    }
    return keyArray.reverse();
  }
}

function getParentCategoryNameById(id: number, categories: Category[]): string {
  for (const category of categories) {
    if (category.id === id) {
      return getParentCategoryName(category);
    }
  }
  return 'Others';
}

function getParentCategoryName(category: Category): string {
  return category.parentCategory == null
    ? category.name
    : getParentCategoryName(category.parentCategory);
}
