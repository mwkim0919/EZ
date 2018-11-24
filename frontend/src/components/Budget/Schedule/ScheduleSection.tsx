import * as React from 'react';
import { Schedule, Category, ScheduleRequest } from 'src/types';
import { Link, RouteComponentProps } from 'react-router-dom';
import { recurringPatternMap } from 'src/constants/budget';
import ScheduleForm from './ScheduleForm';

interface Props {
  schedules: Schedule[];
  categories: Category[];
  createSchedule: (scheduleRequest: ScheduleRequest[]) => Promise<void>;
  updateSchedule: (
    id: number,
    scheduleRequest: ScheduleRequest
  ) => Promise<void>;
  deleteSchedule: (scheduleIds: number[]) => Promise<void>;
  changeRoute: (path: string) => void;
}

interface State {
  showScheduleForm: boolean;
  editingSchedule: Schedule | null;
}

class ScheduleSection extends React.Component<
  Props & RouteComponentProps,
  State
> {
  state = {
    showScheduleForm: false,
    editingSchedule: null,
  };

  handleEdit = (schedule: Schedule | null) => {
    this.setState({ editingSchedule: schedule, showScheduleForm: true });
  };

  cancelEdit = () => {
    this.setState({ editingSchedule: null, showScheduleForm: false });
  };

  render() {
    const { schedules } = this.props;

    if (this.state.showScheduleForm) {
      return (
        <ScheduleForm
          editingSchedule={this.state.editingSchedule}
          createSchedule={this.props.createSchedule}
          updateSchedule={this.props.updateSchedule}
          finishEditing={this.cancelEdit}
          categories={this.props.categories}
        />
      );
    }
    return (
      <div>
        <button
          onClick={this.handleEdit.bind(this, null)}
          className="btn btn-primary btn-lg btn-block"
        >
          <i className="material-icons">add</i>
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Recurring Pattern</th>
              <th scope="col">Start Date</th>
              <th scope="col">Last Processed</th>
              <th scope="col">Next Transaction Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule: Schedule) => {
              const {
                id,
                categoryName,
                deposit,
                withdraw,
                description,
                lastProcessedDate,
                nextRecurringDate,
                recurringPattern,
                startDate,
              } = schedule;
              return (
                <tr key={id}>
                  <th>{categoryName}</th>
                  <td>{description}</td>
                  <td>{withdraw ? 'Withdraw' : 'Deposit'}</td>
                  <td>{withdraw || deposit}</td>
                  <td>{recurringPatternMap[recurringPattern]}</td>
                  <td>{startDate}</td>
                  <td>{lastProcessedDate}</td>
                  <td>{nextRecurringDate}</td>
                  <td>
                    <button
                      onClick={this.handleEdit.bind(this, schedule)}
                      className="btn btn-success"
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      onClick={(e: React.SyntheticEvent) => {
                        this.props.deleteSchedule([id]);
                      }}
                      className="btn btn-danger"
                    >
                      <i className="material-icons">clear</i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ScheduleSection;
