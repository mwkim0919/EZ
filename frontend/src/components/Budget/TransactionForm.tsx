import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikProps,
  FieldArrayRenderProps,
  FormikValues,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import {
  TransactionRequest,
  Category,
  TransactionFormItem,
} from 'src/types/budget';
import { AppState, APIProps } from 'src/types';
import * as R from 'ramda';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { saveTransactions } from 'src/actions/budget';
import { createLoadingSelector } from 'src/selectors';

interface Props {
  categories: Category[];
  saveTransactions: (transactions: TransactionRequest[]) => void;
}

const transactionsValidationSchema = Yup.object().shape({
  transactions: Yup.array().of(
    Yup.object().shape({
      categoryId: Yup.number().required(),
      type: Yup.string()
        .oneOf(['deposit', 'withdraw'])
        .required(),
      amount: Yup.number()
        .positive('This field must be positive number')
        .required(),
      description: Yup.string(),
      transactionDatetime: Yup.date().required(),
    })
  ),
});

const generateTransaction = (categoryId: number): TransactionFormItem => ({
  categoryId,
  description: '',
  type: 'deposit',
  amount: 0,
  transactionDatetime: new Date(),
});

interface CategoryOption {
  value: Category;
  label: string;
}

class TransactionForm extends React.Component<Props & APIProps> {
  handleSubmit = (values: FormikValues) => {
    const transactions = values.transactions.map(
      (value: TransactionFormItem): TransactionRequest => {
        const {
          categoryId,
          type,
          amount,
          description,
          transactionDatetime,
        } = value;
        return {
          categoryId,
          withdraw: type === 'withdraw' ? amount : 0,
          deposit: type === 'deposit' ? amount : 0,
          description,
          transactionDatetime,
        };
      }
    );
    this.props.saveTransactions(transactions);
  };

  render() {
    // TODO: This check should be done somewhere else
    if (this.props.categories.length === 0) {
      return 'throw';
    }

    if (this.props.loading) {
      return ' Loading ... ';
    }

    const categories: CategoryOption[] = R.map(([categoryId, category]) => {
      return { value: category, label: category.name };
    }, R.toPairs(this.props.categories));

    console.log('Categories ', categories);
    const initialFormState = {
      transactions: [generateTransaction(categories[0].value.id)],
    };

    return (
      <div>
        <hr />
        <Formik
          initialValues={initialFormState}
          isInitialValid={true}
          validationSchema={transactionsValidationSchema}
          onSubmit={this.handleSubmit}
          render={(formikProps: FormikProps<FormikValues>) => {
            const { values, setFieldValue, isValid } = formikProps;
            const { transactions } = values;
            console.log('Transactioins ', transactions);
            return (
              <Form>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setFieldValue('transactions', [
                      generateTransaction(categories[0].value.id),
                      ...transactions,
                    ]);
                  }}
                >
                  <i className="material-icons">add</i>
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Description</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray
                      name="transactions"
                      render={(arrayHelpers: FieldArrayRenderProps) => {
                        return transactions.map(
                          (transaction: TransactionFormItem, index: number) => {
                            return (
                              <tr key={index}>
                                {/* DatePicker */}
                                <td>
                                  <Field
                                    name={`transactions.${index}.transactionDatetime`}
                                    render={({ field }: FieldProps) => {
                                      return (
                                        <DayPickerInput
                                          format={'YYYY-MM-DD'}
                                          value={field.value}
                                          onDayChange={(day: Date) => {
                                            setFieldValue(
                                              `transactions.${index}.transactionDatetime`,
                                              day
                                            );
                                          }}
                                        />
                                      );
                                    }}
                                  />
                                </td>

                                {/* Category */}
                                <td>
                                  <Select
                                    classNamePrefix="select"
                                    defaultValue={categories[0]}
                                    isClearable={false}
                                    isSearchable={true}
                                    name="color"
                                    options={categories}
                                    onChange={(option: any) => {
                                      const { value, label } = option;
                                      console.log('Option => ', option);
                                      arrayHelpers.replace(index, {
                                        ...transaction,
                                        categoryId: value.id,
                                      });
                                    }}
                                  />
                                </td>

                                {/* Type */}
                                <td>
                                  <label htmlFor="withdrawField">
                                    Withdraw
                                  </label>
                                  <Field
                                    id="withdrawField"
                                    type="radio"
                                    checked={transaction.type === 'withdraw'}
                                    name={`transactions.${index}.type`}
                                    value="withdraw"
                                  />
                                  <label htmlFor="depositField">Deposit</label>
                                  <Field
                                    id="depositField"
                                    type="radio"
                                    checked={transaction.type === 'deposit'}
                                    name={`transactions.${index}.type`}
                                    value="deposit"
                                  />
                                </td>

                                {/* Amount */}
                                <td>
                                  <Field
                                    className="form-control"
                                    name={`transactions.${index}.amount`}
                                  />
                                </td>
                                {/* Description */}
                                <td>
                                  <Field
                                    className="form-control"
                                    name={`transactions.${index}.description`}
                                  />
                                </td>

                                {/* Remove Button */}
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    <i className="material-icons">clear</i>
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        );
                      }}
                    />
                  </tbody>
                </table>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['SAVE_TRANSACTIONS']);
const mapStateToProps = (state: AppState) => {
  return {
    loading: loadingSelector(state),
    categories: state.budget.categories,
  };
};
export default connect(
  mapStateToProps,
  { saveTransactions }
)(TransactionForm);
