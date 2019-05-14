import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    <h2>Expense List</h2>
    {props.expenses.length === 0 && <p>No expenses</p>}
    {
      props.expenses.map((expense) => (
        <ExpenseListItem {...expense} key={expense.id}/>)
      )
    }
  </div>
);

const mapStateToProps = (state) => { // This HOC has access to the returned object
    return {
      expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);