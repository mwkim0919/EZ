import { Dispatch } from 'redux';
import { AppState } from '.';

export type DeleteTransactions = (
  ids: number[]
) => (dispatch: Dispatch, getState: () => AppState) => Promise<void>;

export type UpdateTransactions = (
  id: number,
  transaction: TransactionRequest
) => (dispatch: Dispatch, getState: () => AppState) => Promise<void>;

export type SaveTransactions = (
  transactions: TransactionRequest[]
) => Promise<void>;

export interface Transaction {
  id: number;
  categoryId: number | null;
  categoryName: string | null;
  description: string;
  withdraw: string | null;
  deposit: string | null;
  // TODO: Fix this
  createDatetime?: Date | string;
  transactionDatetime: Date | string;
}

export interface TransactionRequest {
  categoryId: number;
  description: string;
  withdraw: number | null;
  deposit: number | null;
  transactionDatetime: Date;
}

export interface TransactionFormItem {
  categoryId: number;
  type: 'deposit' | 'withdraw';
  amount: number;
  description: string;
  transactionDatetime: Date;
}

export interface Category {
  id: number;
  name: string;
  categoryLimit: number | string | null;
  parentCategory: Category | null;
  createDatetime: Date | string;
}

export interface CategoryOption {
  value: Category;
  label: string;
}

export type RecurringPattern =
  | 'yearly'
  | 'bi-monthly'
  | 'monthly'
  | 'bi-weekly'
  | 'weekly';

export interface Schedule {
  id: number;
  categoryId: number;
  categoryName: string;
  withdraw: number | null;
  deposit: number | null;
  startDate: Date;
  lastProcessed: Date;
  nextRecurringDate: Date;
  createDatetime: Date;
  recurringPattern: RecurringPattern;
}
