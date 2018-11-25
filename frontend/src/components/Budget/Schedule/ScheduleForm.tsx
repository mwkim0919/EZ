import * as React from 'react';
import {
  Formik,
  Field,
  Form,
  FormikProps,
  FormikValues,
  FieldProps,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Category, ScheduleRequest, Schedule } from 'src/types';
import { recurringPatternMap } from 'src/constants/budget';
import * as R from 'ramda';
import { ValueType } from 'react-select/lib/types';
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const scheduleSchema = Yup.object().shape({
  categoryId: Yup.number().required(),
  description: Yup.string().required(),
  type: Yup.mixed()
    .oneOf(['withdraw', 'deposit'])
    .required(),
  amount: Yup.number()
    .positive()
    .required(),
  startDate: Yup.date(),
  recurringPattern: Yup.mixed().oneOf(R.keys(recurringPatternMap)),
});

const recurringPatternSelectOptions = R.map(([key, val]) => {
  return { value: key, label: val };
}, R.toPairs(recurringPatternMap));

interface Props {
  categories: Category[];
  editingSchedule: Schedule | null;
  createSchedule: (schedules: ScheduleRequest[]) => Promise<void>;
  updateSchedule: (
    id: number,
    scheduleRequest: ScheduleRequest
  ) => Promise<void>;
  finishEditing: () => void;
}

class ScheduleForm extends React.PureComponent<Props> {
  handleSubmit = (values: FormikValues) => {
    const {
      id,
      categoryId,
      description,
      amount,
      type,
      startDate,
      recurringPattern,
    } = values;

    const scheduleRequest = {
      categoryId,
      description,
      startDate: startDate && moment(startDate).format('YYYY-MM-DD'),
      recurringPattern,
      deposit: type === 'deposit' ? amount : null,
      withdraw: type === 'withdraw' ? amount : null,
      // We need to pass these attributes when updating
      ...(this.props.editingSchedule && {
        nextRecurringDate: this.props.editingSchedule.nextRecurringDate,
        lastProcessedDate: this.props.editingSchedule.lastProcessedDate,
      }),
    };

    // If schedule id exists, we're updating
    const submitAction: Promise<void> = id
      ? this.props.updateSchedule(id, scheduleRequest)
      : this.props.createSchedule([scheduleRequest]);

    submitAction.then(() => {
      this.props.finishEditing();
    });
  };

  cancelForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.finishEditing();
  };

  getInitialFormState = () => {
    // If we're editing form, populate the form with given schedule
    if (this.props.editingSchedule) {
      const {
        id,
        categoryId,
        withdraw,
        deposit,
        startDate,
        description,
        recurringPattern,
      } = this.props.editingSchedule;
      return {
        id,
        categoryId,
        description,
        startDate,
        type: withdraw ? 'withdraw' : 'deposit',
        amount: Number(withdraw || deposit),
        recurringPattern,
      };
    }
    return {
      description: '',
      type: 'withdraw',
      amount: 0,
      categoryId: this.props.categories[0].id,
      startDate: new Date(),
      recurringPattern: recurringPatternSelectOptions[0].value,
    };
  };

  render() {
    const categoryOptions = R.map(category => {
      return { value: category, label: category.name };
    }, this.props.categories);

    const initialFormState = this.getInitialFormState();

    return (
      <div className="schedule-form">
        <Formik
          initialValues={initialFormState}
          isInitialValid={!!this.props.editingSchedule}
          validationSchema={scheduleSchema}
          onSubmit={this.handleSubmit}
          render={(formikProps: FormikProps<FormikValues>) => {
            const { setFieldValue, values, isValid } = formikProps;
            console.log('Formik Props ', formikProps);
            const { type } = values;
            return (
              <Form>
                <div className="form-group">
                  <Select
                    classNamePrefix="select"
                    defaultValue={categoryOptions[0]}
                    isClearable={false}
                    isSearchable={true}
                    name="categoryId"
                    options={categoryOptions}
                    // TODO: FIX THIS
                    // tslint:disable-next-line
                    onChange={(option: ValueType<any>) => {
                      const { value } = option;
                      setFieldValue('categoryId', value.id);
                    }}
                  />
                  <ErrorMessage name="categoryId" />
                </div>

                <div className="form-group">
                  <Select
                    classNamePrefix="select"
                    defaultValue={recurringPatternSelectOptions[0]}
                    isClearable={false}
                    isSearchable={true}
                    name="recurringPattern"
                    options={recurringPatternSelectOptions}
                    // tslint:disable-next-line
                    onChange={(option: ValueType<any>) => {
                      const { value } = option;
                      setFieldValue('recurringPattern', value);
                    }}
                  />
                  <ErrorMessage name="recurringPattern" />
                </div>

                {/* Description */}
                <div className="form-group">
                  <Field
                    className="form-control"
                    placeholder="Schedule description"
                    type="text"
                    name="description"
                  />
                  <ErrorMessage name="description" />
                </div>

                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="depositField">
                    Withdraw
                  </label>
                  <Field
                    id="withdrawField"
                    className="form-check-input"
                    type="radio"
                    checked={type === 'withdraw'}
                    name="type"
                    value="withdraw"
                  />
                </div>

                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="depositField">
                    Deposit
                  </label>
                  <Field
                    id="depositField"
                    className="form-check-input"
                    type="radio"
                    checked={type === 'deposit'}
                    name="type"
                    value="deposit"
                  />
                </div>

                <ErrorMessage name="type" />

                <div className="form-group">
                  <Field
                    className="form-control"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                  />
                  <ErrorMessage name="amount" />
                </div>

                {!this.props.editingSchedule && (
                  <div className="form-group">
                    <Field
                      name="startDate"
                      render={({ field }: FieldProps) => {
                        return (
                          <DayPickerInput
                            format={'YYYY-MM-DD'}
                            dayPickerProps={{
                              disabledDays: { before: new Date() },
                            }}
                            value={field.value}
                            onDayChange={(day: Date) => {
                              setFieldValue('startDate', day);
                            }}
                          />
                        );
                      }}
                    />
                    <ErrorMessage name="startDate" />
                  </div>
                )}

                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <button className="btn btn-danger" onClick={this.cancelForm}>
                  Cancel
                </button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

export default ScheduleForm;
