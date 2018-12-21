import * as React from 'react';
import {
  Transaction,
  TransactionRequest,
  DeleteTransactions,
  UpdateTransactions,
  Category,
  CategoryOption,
} from 'src/types/budget';
import {
  Formik,
  FormikProps,
  FormikValues,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { updateTransactions } from 'src/actions/budget/Transaction';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { AppState } from 'src/types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { ValueType } from 'react-select/lib/types';
import * as R from 'ramda';
import Select from 'react-select';

interface Props {
  transaction: Transaction;
  deleteTransactions: DeleteTransactions;
  updateTransactions: UpdateTransactions;
  categories: Category[];
}

interface State {
  isEditing: boolean;
}

const transactionSchema = Yup.object().shape({
  categoryId: Yup.number().required(),
  transactionType: Yup.string()
    .oneOf(['deposit', 'withdraw'])
    .required(),
  amount: Yup.number()
    .positive('This field must be positive number')
    .required(),
  description: Yup.string(),
  transactionDatetime: Yup.date().required(),
});

const RadioButton = (fieldProps: FieldProps & FormikValues) => {
  const {
    field: { name, value, onChange, onBlur },
    id,
    label,
  } = fieldProps;
  return (
    <div>
      <input
        name={name}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

class TransactionItem extends React.Component<Props, State> {
  state: State = {
    isEditing: false,
  };

  handleSubmit = (values: FormikValues) => {
    const {
      categoryId,
      description,
      withdraw,
      deposit,
      transactionDatetime,
      amount,
    } = values;
    const transaction: TransactionRequest = {
      categoryId,
      description,
      withdraw: values.transactionType === 'withdraw' ? values.amount : null,
      deposit: values.transactionType === 'deposit' ? values.amount : null,
      transactionDatetime,
    };
    this.props.updateTransactions(values.id, transaction);
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };

  deleteTransactions = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.deleteTransactions([id]);
    }
  };

  render() {
    const { transaction } = this.props;

    const categoryOptions: CategoryOption[] = R.map(
      ([categoryId, category]) => {
        return { value: Number(categoryId), label: category.name };
      },
      R.toPairs(this.props.categories)
    );

    const {
      id,
      categoryName,
      description,
      withdraw,
      deposit,
      transactionDatetime,
    } = transaction;

    if (this.state.isEditing) {
      return (
        <tr>
          <td colSpan={7}>
            <Formik
              initialValues={{
                ...transaction,
                transactionType: withdraw ? 'withdraw' : 'deposit',
                amount: withdraw || deposit,
              }}
              isInitialValid={true}
              validationSchema={transactionSchema}
              onSubmit={this.handleSubmit}
              render={(formikProps: FormikProps<FormikValues>) => {
                const { setFieldValue, values } = formikProps;
                return (
                  <Form>
                    <div className="row">
                      <div className="col">
                        <Field
                          name="transactionDatetime"
                          render={({ field }: FieldProps) => {
                            return (
                              <DayPickerInput
                                format={'YYYY-MM-DD'}
                                value={new Date(field.value)}
                                onDayChange={(day: Date) => {
                                  setFieldValue('transactionDatetime', day);
                                }}
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="col">
                        <Field type="text" name="description" />
                      </div>
                      <div className="col">
                        <Select
                          classNamePrefix="select"
                          defaultValue={
                            categoryOptions.filter(
                              (categoryOption: CategoryOption) =>
                                categoryOption.label === values.categoryName
                            )[0]
                          }
                          isClearable={false}
                          isSearchable={true}
                          name="categoryId"
                          options={categoryOptions}
                          onChange={(option: ValueType<CategoryOption>) => {
                            const { value } = option as CategoryOption;
                            setFieldValue('categoryId', value);
                          }}
                        />
                      </div>
                      <div className="col text-center">
                        <Field
                          component={RadioButton}
                          name="transactionType"
                          id="withdraw"
                          label="Withdraw"
                        />
                        <Field
                          component={RadioButton}
                          name="transactionType"
                          id="deposit"
                          label="Deposit"
                          defaultValue={values.transactionType}
                        />
                      </div>
                      <div className="col">
                        <Field type="text" name="amount" />
                      </div>
                      <div className="col">
                        <button type="submit" className="btn btn-primary">
                          <i className="material-icons">done</i>
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            this.setState(prevState => {
                              return { isEditing: !prevState.isEditing };
                            });
                          }}
                          className="btn btn-danger"
                        >
                          <i className="material-icons">clear</i>
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            />
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td>{(transactionDatetime as string).split('T')[0]}</td>
        <td>{description}</td>
        <td>{categoryName}</td>
        <td>{withdraw}</td>
        <td>{deposit}</td>
        <td>
          <button
            onClick={e => {
              e.stopPropagation();
              this.setState(prevState => {
                return { isEditing: !prevState.isEditing };
              });
            }}
            className="btn btn-success"
          >
            <i className="material-icons">edit</i>
          </button>
        </td>
        <td>
          <button
            onClick={e => {
              e.stopPropagation();
              this.deleteTransactions(id);
            }}
            className="btn btn-danger"
          >
            <i className="material-icons">clear</i>
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    categories: state.budget.categories,
  };
};

export default connect(
  mapStateToProps,
  { updateTransactions }
)(TransactionItem);
