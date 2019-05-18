import getExpensesTotalAmount from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const expensesTotal = getExpensesTotalAmount([]);
  expect(expensesTotal).toBe(0);
});

test('should add a single expense', () => {
  const expensesTotal = getExpensesTotalAmount([expenses[0]]);
  expect(expensesTotal).toBe(expenses[0].amount);
});

test('should add a single expense', () => {
  const expensesTotal = getExpensesTotalAmount(expenses);
  expect(expensesTotal).toBe(191500+1580+2580);
});