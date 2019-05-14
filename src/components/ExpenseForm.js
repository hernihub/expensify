import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      errorMessage: ''
    }
  }

  onDescriptionChange = (e) => {
      const description = e.target.value;
      this.setState(() => ({description})); // ES6 object shorthand
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note})); // ES6 object shorthand
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    // !amount to let the user delete the amount
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { // regex for N digits follows by one group of one point and two digits only -- https://regex101.com 
      this.setState(() => ({amount})); // ES6 object shorthand
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({errorMessage: 'Please type a description and an amount'}))
    } else {
      this.setState(() => ({errorMessage: ''}))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100, // Base 10
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  };
  
  render() {
    return (
      <div>
      {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text" 
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text" 
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />          
          <SingleDatePicker
            date={this.state.createdAt} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange} // PropTypes.func.isRequired
            focused={this.state.calendarFocused} // PropTypes.bool
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            type="text" 
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}