import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate} from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {

  state = {
    calendarFocused: null
  };
  onDatesChange = ({startDate, endDate}) => { // destructuring the object
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  };
  onSortChange = (e) => { 
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input className="text-input" placeholder="Search expenses" type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
          </div>
          <div className="input-group__item">
            <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate())
});

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);