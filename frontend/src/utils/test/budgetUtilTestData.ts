import { Transaction, Category } from 'src/types/budget';

export const transactions: Transaction[] = [
  {
    id: 26,
    categoryId: null,
    categoryName: null,
    description: 'test',
    withdraw: '123.45',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 25,
    categoryId: 2,
    categoryName: 'FOOD',
    description: 'The Keg',
    withdraw: '123.45',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 24,
    categoryId: 2,
    categoryName: 'FOOD',
    description: 'Pasta',
    withdraw: '24.56',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 23,
    categoryId: 2,
    categoryName: 'FOOD',
    description: 'Pizza Hut',
    withdraw: '30.32',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 22,
    categoryId: 2,
    categoryName: 'FOOD',
    description: 'Tim Horton',
    withdraw: '2.34',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 21,
    categoryId: 3,
    categoryName: 'ENTERTAINMENT',
    description: 'Bowling',
    withdraw: '21.23',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 14,
    categoryId: 4,
    categoryName: 'Coffee',
    description: 'Starbucks',
    withdraw: '8.99',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-10-11T00:00:00.000Z',
  },
  {
    id: 13,
    categoryId: 4,
    categoryName: 'Coffee',
    description: 'Blenz',
    withdraw: '5.67',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-10-02T00:00:00.000Z',
  },
  {
    id: 12,
    categoryId: 9,
    categoryName: 'UTILITY',
    description: 'Fido',
    withdraw: '50.50',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-09-15T00:00:00.000Z',
  },
  {
    id: 20,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-09-01T00:00:00.000Z',
  },
  {
    id: 11,
    categoryId: 9,
    categoryName: 'UTILITY',
    description: 'Fido',
    withdraw: '50.50',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-08-15T00:00:00.000Z',
  },
  {
    id: 19,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-08-01T00:00:00.000Z',
  },
  {
    id: 10,
    categoryId: 9,
    categoryName: 'UTILITY',
    description: 'Fido',
    withdraw: '50.50',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-07-15T00:00:00.000Z',
  },
  {
    id: 18,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-07-01T00:00:00.000Z',
  },
  {
    id: 9,
    categoryId: 9,
    categoryName: 'UTILITY',
    description: 'Fido',
    withdraw: '50.50',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-06-15T00:00:00.000Z',
  },
  {
    id: 17,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-06-01T00:00:00.000Z',
  },
  {
    id: 8,
    categoryId: 9,
    categoryName: 'UTILITY',
    description: 'Fido',
    withdraw: '50.50',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-05-15T00:00:00.000Z',
  },
  {
    id: 16,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-05-01T00:00:00.000Z',
  },
  {
    id: 15,
    categoryId: 1,
    categoryName: 'TRANSPORTATION',
    description: 'Compass Card',
    withdraw: '98.00',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-04-01T00:00:00.000Z',
  },
  {
    id: 6,
    categoryId: 2,
    categoryName: 'FOOD',
    description: 'McDonalds',
    withdraw: '12.34',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-03-22T00:00:00.000Z',
  },
  {
    id: 5,
    categoryId: 5,
    categoryName: 'Pizza',
    description: 'Dominos',
    withdraw: '22.03',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-03-21T00:00:00.000Z',
  },
  {
    id: 4,
    categoryId: 6,
    categoryName: 'INCOME',
    description: 'EZ Paycheck',
    withdraw: null,
    deposit: '4321.12',
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-02-28T00:00:00.000Z',
  },
  {
    id: 3,
    categoryId: 6,
    categoryName: 'INCOME',
    description: 'EZ Paycheck',
    withdraw: null,
    deposit: '4321.12',
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-02-13T00:00:00.000Z',
  },
  {
    id: 2,
    categoryId: 6,
    categoryName: 'INCOME',
    description: 'EZ Paycheck',
    withdraw: null,
    deposit: '4321.12',
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-01-30T00:00:00.000Z',
  },
  {
    id: 1,
    categoryId: 6,
    categoryName: 'INCOME',
    description: 'EZ Paycheck',
    withdraw: null,
    deposit: '4321.12',
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-01-14T00:00:00.000Z',
  },
  {
    id: 7,
    categoryId: 7,
    categoryName: 'EDUCATION',
    description: 'Textbook',
    withdraw: '78.54',
    deposit: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
    transactionDatetime: '2018-01-03T00:00:00.000Z',
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: 'TRANSPORTATION',
    categoryLimit: '200.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 2,
    name: 'FOOD',
    categoryLimit: '400.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 3,
    name: 'ENTERTAINMENT',
    categoryLimit: '130.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 4,
    name: 'Coffee',
    categoryLimit: '100.00',
    parentCategory: {
      id: 2,
      name: 'FOOD',
      categoryLimit: '400.00',
      parentCategory: null,
      createDatetime: '2018-11-12T17:18:10.000Z',
    },
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 5,
    name: 'Pizza',
    categoryLimit: '50.00',
    parentCategory: {
      id: 2,
      name: 'FOOD',
      categoryLimit: '400.00',
      parentCategory: null,
      createDatetime: '2018-11-12T17:18:10.000Z',
    },
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 6,
    name: 'INCOME',
    categoryLimit: null,
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 7,
    name: 'EDUCATION',
    categoryLimit: '200.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 8,
    name: 'HOUSING',
    categoryLimit: '1200.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 9,
    name: 'UTILITY',
    categoryLimit: '350.00',
    parentCategory: null,
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
  {
    id: 10,
    name: 'Starbucks',
    categoryLimit: '20.00',
    parentCategory: {
      id: 4,
      name: 'Coffee',
      categoryLimit: '100.00',
      parentCategory: {
        id: 2,
        name: 'FOOD',
        categoryLimit: '400.00',
        parentCategory: null,
        createDatetime: '2018-11-12T17:18:10.000Z',
      },
      createDatetime: '2018-11-12T17:18:10.000Z',
    },
    createDatetime: '2018-11-12T17:18:10.000Z',
  },
];