import ScheduleSection from '../../components/Budget/ScheduleSection';
import { connect } from 'react-redux';
import { AppState } from 'src/types';

const mapStateToProps = (state: AppState) => {
  return {
    schedules: state.budget.schedules,
  };
};
export default connect(mapStateToProps)(ScheduleSection);
