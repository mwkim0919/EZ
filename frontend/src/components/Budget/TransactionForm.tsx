import * as React from 'react';
import { Formik, Form, Field, FieldArray, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Transaction, TransactionRequest } from 'src/types/transaction';

interface Props {
  transactions: Transaction[];
}

const transactionsValidationSchema = Yup.object().shape({
  transactions: Yup.array().of(
    Yup.object().shape({
      withdraw: Yup.number()
        .positive('This field must be positive number')
        .required(),
      deposit: Yup.number()
        .positive('This field must be positive number')
        .required(),
      transactionDatetime: Yup.date().required(),
    })
  ),
});

const generateTransactionRequest = () => ({
  categoryId: null,
  description: '',
  withdraw: 0,
  deposit: 0,
  transactionDatetime: new Date(),
});

const initialTransactionFormValues: TransactionRequest[] = [
  generateTransactionRequest(),
];

export default class TransactionForm extends React.Component<Props> {
  render() {
    return (
      <div>
        <hr />
        <form>
          <Formik
            initialValues={{ transactions: initialTransactionFormValues }}
            isInitialValid={true}
            validationSchema={transactionsValidationSchema}
            onSubmit={(values: any) =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500)
            }
            render={(formikProps: FormikProps<any>) => {
              const { values, setValues, isValid } = formikProps;
              console.log('FormikProps ', formikProps);
              const { transactions } = values;
              console.log('Transactioins ', transactions);
              return (
                <Form>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => {
                      setValues({
                        transactions: [
                          generateTransactionRequest(),
                          ...transactions,
                        ],
                      });
                    }}
                  >
                    Add more
                  </button>
                  <FieldArray
                    name="transactions"
                    render={arrayHelpers => (
                      <div>
                        {transactions.map((friend: any, index: any) => (
                          <div key={index}>
                            <div>
                              <div className="form-group">
                                <div className="row">
                                  {/* Transaction Date */}
                                  <div className="col">
                                    <label htmlFor="transactionDate">
                                      Date
                                    </label>
                                    <Field
                                      className="form-control"
                                      name={`transactions.${index}.transactionDate`}
                                    />
                                  </div>

                                  {/* Type */}
                                  <div className="col">
                                    <label htmlFor="transactionType">
                                      Type
                                    </label>
                                    {/* <select
                                        className="form-control"
                                        id="transactionType"
                                      >
                                        <option>Deposit</option>
                                        <option>Withdrawal</option>
                                      </select> */}
                                  </div>

                                  {/* Category */}
                                  <div className="col">
                                    <label htmlFor="category">Category</label>
                                    <select
                                      className="form-control"
                                      id="category"
                                    >
                                      <option>Food</option>
                                      <option>Transportation</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="row">
                                  <div className="col">
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                    <Field
                                      className="form-control"
                                      name={`transactions.${index}.description`}
                                    />
                                  </div>
                                  <div className="col">
                                    <label htmlFor="amount">Withdraw</label>
                                    <Field
                                      className="form-control"
                                      name={`transactions.${index}.withdraw`}
                                    />
                                  </div>
                                  <div className="col">
                                    <label htmlFor="amount">Deposit</label>
                                    <Field
                                      className="form-control"
                                      name={`transactions.${index}.deposit`}
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </div>
                            <button
                              type="button"
                              className="btn btn-danger btn-lg btn-block"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                          </div>
                        ))}
                        <div>
                          <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </Form>
              );
            }}
          />
        </form>
      </div>
    );
  }
}
