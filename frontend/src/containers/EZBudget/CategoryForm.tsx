import * as React from 'react';
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FormikValues,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { CategoryOption, AppState, Category, CategoryRequest } from 'src/types';
import { ValueType } from 'react-select/lib/types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createCategories } from 'src/actions/budget';

interface Props {
  categories: Category[];
  createCategories: (schedules: CategoryRequest[]) => Promise<void>;
}

const categoryValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  categoryLimit: Yup.number()
    .positive()
    .required(),
  parentCategoryId: Yup.number().nullable(true),
});

const initialFormState = {
  name: '',
  categoryLimit: 0,
  parentCategoryId: null,
};

class CategoryForm extends React.PureComponent<Props> {
  handleSubmit = (values: FormikValues) => {
    console.log('Submit values ', values);
    this.props.createCategories([values as CategoryRequest]);
  };

  render() {
    // Generate category options for react-select
    const categoryOptions: CategoryOption[] = R.map(category => {
      return { value: category.id, label: category.name };
    }, this.props.categories);

    const categoryNames: {
      [categoryId: number]: string;
    } = this.props.categories.reduce(
      (acc: { [categoryId: number]: string }, category: Category) => {
        acc[category.id] = category.name;
        return acc;
      },
      {}
    );

    return (
      <div>
        <Formik
          initialValues={initialFormState}
          isInitialValid={false}
          validationSchema={categoryValidationSchema}
          onSubmit={this.handleSubmit}
          render={(formikProps: FormikProps<FormikValues>) => {
            const { values, setFieldValue, isValid } = formikProps;
            console.log('Values ', values, ' formikProps', formikProps);

            return (
              <Form>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary"
                >
                  Submit
                </button>

                {/* Category Name */}
                <label htmlFor="">Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="form-control"
                />

                {/* Category Limit */}
                <label htmlFor="">Category Limit</label>
                <Field
                  name="categoryLimit"
                  type="number"
                  placeholder="Category Limit"
                  className="form-control"
                />

                {/* Parent Category */}
                <label htmlFor="">Parent Category</label>
                <Select
                  classNamePrefix="select"
                  value={{
                    value: values.parentCategoryId,
                    label: categoryNames[values.parentCategoryId],
                  }}
                  isClearable={true}
                  isSearchable={true}
                  options={categoryOptions}
                  onChange={(option: ValueType<CategoryOption>) => {
                    setFieldValue(
                      'parentCategoryId',
                      // @ts-ignore
                      option ? option.value : null
                    );
                  }}
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
    categories: state.budget.categories,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, Action>
) => {
  return {
    createCategories: (categoryRequests: CategoryRequest[]) =>
      dispatch(createCategories(categoryRequests)),
    // updateSchedule: (id: number, schedule: ScheduleRequest) =>
    //   dispatch(updateSchedule(id, schedule)),
    // deleteSchedule: (ids: number[]) => dispatch(deleteSchedule(ids)),
    // changeRoute: (path: string) => dispatch(push(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryForm);
