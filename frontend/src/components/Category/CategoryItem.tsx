import * as React from 'react';

interface Props {
  displayName: string;
  limit: number;
  amount: number;
}

export default class CategoryItem extends React.Component<Props> {
  getProgressLevel(percent: number) {
    if (percent < 50) {
      return 'bg-success';
    } else if (percent < 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
  render() {
    const { displayName, limit, amount } = this.props;
    const percent = (amount / (limit || 1)) * 100;
    const percentString = percent > 100 ? '100%' : percent.toFixed(0) + '%';
    const limitString = limit ? 'out of $' + limit : '';
    return (
      <div className="media text-muted pt-3">
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong className="d-block text-gray-dark">{displayName}</strong>
          You have spent ${amount.toFixed(2)} {limitString}
          <div className="progress media-body">
            <div
              className={'progress-bar ' + this.getProgressLevel(percent)}
              role="progressbar"
              style={{ width: percentString }}
              aria-valuenow={amount}
              aria-valuemin={0}
              aria-valuemax={limit}
            >
              {percentString}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
