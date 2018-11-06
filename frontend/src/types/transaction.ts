export interface Transaction {
  id: number;
  categoryId: number | null;
  categoryName: string | null;
  description: string;
  withdraw: string | null;
  deposit: string | null;
  createDatetime: Date;
  transactionDatetime: Date;
}

export interface TransactionRequest {
  categoryId: number | null;
  description: string;
  withdraw: number;
  deposit: number;
  transactionDatetime: Date;
}
