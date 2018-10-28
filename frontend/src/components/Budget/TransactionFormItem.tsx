import * as React from 'react';
// import * as R from 'ramda';

const TransactionFormItem = () => {
  return (
    <div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label htmlFor="transactionDate">Date</label>
            <input type="date" className="form-control" id="transactionDate" />
          </div>
          <div className="col">
            <label htmlFor="transactionType">Type</label>
            <select className="form-control" id="transactionType">
              <option>Deposit</option>
              <option>Withdrawal</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="category">Category</label>
            <select className="form-control" id="category">
              <option>Food</option>
              <option>Transportation</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" />
          </div>
          <div className="col">
            <label htmlFor="amount">Amount</label>
            <input type="number" className="form-control" id="amount" />
          </div>
        </div>
      </div>
      <button className="btn btn-danger btn-lg btn-block">Remove</button>
      <hr />
    </div>
  );
};

export default TransactionFormItem;
