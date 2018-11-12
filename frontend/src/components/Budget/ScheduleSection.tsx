import * as React from 'react';
import { Schedule } from 'src/types/budget';

interface Props {
  schedules: Schedule[];
}
const ScheduleSection: React.SFC<Props> = ({ schedules }) => {
  return (
    <div>
      {schedules.map((schedule: Schedule) => {
        return <div>Schedule: {schedule.id}</div>;
      })}
    </div>
  );
};

export default ScheduleSection;
