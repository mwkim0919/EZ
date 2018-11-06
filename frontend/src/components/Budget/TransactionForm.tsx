import * as React from 'react';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikProps,
  FieldArrayRenderProps,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { Transaction, TransactionRequest, Category } from 'src/types/budget';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

interface Props {
  transactions: Transaction[];
  categories: Category[];
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

interface TransactionFormFormikValues {
  transactions: Transaction[];
}

class TransactionForm extends React.Component<Props> {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <hr />
        <Formik
          initialValues={{ transactions: initialTransactionFormValues }}
          isInitialValid={true}
          validationSchema={transactionsValidationSchema}
          onSubmit={(values: FormikValues) =>
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500)
          }
          render={(formikProps: FormikProps<FormikValues>) => {
            const { values, setValues, setFieldValue, isValid } = formikProps;
            console.log('FormikProps ', formikProps);
            const { transactions } = values;
            console.log('Transactioins ', transactions);
            return (
              <Form>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setFieldValue('transactions', [
                      generateTransactionRequest(),
                      ...transactions,
                    ]);
                    // setValues({
                    //   transactions: [
                    //     generateTransactionRequest(),
                    //     ...transactions,
                    //   ],
                    // });
                  }}
                >
                  <i className="material-icons">add</i>
                </button>
                <FieldArray
                  name="transactions"
                  render={(arrayHelpers: FieldArrayRenderProps) => (
                    <div>
                      {transactions.map(
                        (transaction: TransactionRequest, index: number) => (
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
                                      type="date"
                                      name={`transactions.${index}.transactionDatetime`}
                                    />
                                  </div>

                                  {/* Type */}
                                  <div className="col">
                                    <label htmlFor="transactionType">
                                      Transaction type
                                    </label>

                                    <label>Withdraw</label>
                                    <Field
                                      type="radio"
                                      name="type"
                                      value="withdraw"
                                    />
                                    <label>Deposit</label>
                                    <Field
                                      type="radio"
                                      name="type"
                                      value="deposit"
                                    />
                                  </div>

                                  {/* Category */}
                                  <div className="col">
                                    <label htmlFor="category">Category</label>
                                    <Field
                                      className="form-control"
                                      component="select"
                                      name="category"
                                    >
                                      {categories.map(
                                        (category: Category, i: number) => {
                                          return (
                                            <option key={i}>
                                              {category.name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Field>
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
                        )
                      )}
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
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    transactions: state.budget.transactions,
    categories: state.budget.categories,
  };
};
export default connect(mapStateToProps)(TransactionForm);
