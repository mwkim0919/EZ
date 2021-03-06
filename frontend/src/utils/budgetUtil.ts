import { Category, Transaction } from 'src/types/budget';

export interface MonthlyDepositWithdraw {
  [month: string]: DepositWithdraw;
}

export interface DepositWithdraw {
  deposit: number;
  withdraw: number;
}

export interface ExpenseLimit {
  expense: number;
  limit: number;
}

export interface CategoryExpenseLimit {
  [categoryKey: string]: ExpenseLimit;
}

export interface CategoryWithdrawMap {
  [categoryName: string]: number;
}

interface CategoryMap {
  [id: string]: Category;
}

export const generateCategoryMaps = (
  categories: Category[],
  transactions: Transaction[]
) => {
  const result = initializeCategoryMaps(categories);
  const categoryMap = mapCategories(categories);
  for (const transaction of transactions) {
    const categoryNames = transaction.categoryId
      ? putRelatedCategoryNamesInArray(categoryMap[transaction.categoryId])
      : ['Others'];
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
  const categoryMap = mapCategories(categories);
  return transactions.reduce(
    (acc: CategoryWithdrawMap, transaction: Transaction) => {
      const amount = transaction.withdraw ? Number(transaction.withdraw) : 0;
      const categoryName = transaction.categoryId
        ? getParentCategoryName(categoryMap[transaction.categoryId])
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

export const sumMonthlyDepositAndWithdraw = (
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

export const sumDepositAndWithdraw = (
  transactions: Transaction[]
): DepositWithdraw => {
  return transactions.reduce(
    (acc: DepositWithdraw, transaction: Transaction) => {
      acc.deposit +=
        transaction.deposit == null ? 0 : Number(transaction.deposit);
      acc.withdraw +=
        transaction.withdraw == null ? 0 : Number(transaction.withdraw);
      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
    }
  );
};

export const filterTransactions = (
  transactions: Transaction[],
  selectedDate: string,
  description: string,
  transactionType: 'deposit' | 'withdraw' | ''
): Transaction[] => {
  let filteredTransactions = transactions;
  
  if (selectedDate) {
    filteredTransactions = filteredTransactions.filter(
      (transaction: Transaction) =>
        String(transaction.transactionDatetime).substring(0, 7) === selectedDate
    );
  }
  if (description) {
    filteredTransactions = filteredTransactions.filter((transaction: Transaction) =>
      transaction.description.toLowerCase().includes(description.toLowerCase())
    );
  }
  if (transactionType) {
    filteredTransactions = filteredTransactions.filter(
      (transaction: Transaction) => {
        if (transactionType === 'deposit') {
          return transaction.withdraw == null
        } else {
          return transaction.deposit == null
        }
      }
    );
  }
  return filteredTransactions;
};

function mapCategories(categories: Category[]): CategoryMap {
  return categories.reduce((acc: CategoryMap, category: Category) => {
    acc[category.id] = category;
    return acc;
  }, {});
}

function initializeCategoryMaps(categories: Category[]): CategoryExpenseLimit {
  const result = {
    Others: {
      expense: 0,
      limit: 0,
    },
  };
  for (const category of categories) {
    const keyArray = putRelatedCategoryNamesInArray(category);
    const key = keyArray.join(' / ');
    result[key] = {
      expense: 0,
      limit: category.categoryLimit ? Number(category.categoryLimit) : 0,
    };
  }
  return result;
}

function putRelatedCategoryNamesInArray(category: Category): string[] {
  const keyArray = [category.name];
  while (category.parentCategory) {
    keyArray.push(category.parentCategory.name);
    category = category.parentCategory;
  }
  return keyArray.reverse();
}

function getParentCategoryName(category: Category): string {
  return category.parentCategory == null
    ? category.name
    : getParentCategoryName(category.parentCategory);
}
