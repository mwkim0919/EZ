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
  withdraw: number;
  deposit: number;
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
  categoryLimit: number;
  parentCategory?: Category;
  createDatetime: Date | string;
}
