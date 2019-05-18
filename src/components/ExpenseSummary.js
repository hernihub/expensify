import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => { // destructure the props object
  const expensesWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1>Viewing {expenseCount} {expensesWord} totalling {formattedExpensesTotal}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);