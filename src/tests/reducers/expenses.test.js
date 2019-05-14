import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default expense reducer', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[1].id });
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: 4 });
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Ketamine',
    note: '',
    amount: 40100,
    createdAt: 0
  };
  const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense});
  expect(state).toEqual([...expenses,expense]);
});

test('should edit an expense by id', () => {
  const updates = {
    description: 'heroin',
    amount: 21580,
    createdAt: moment(0).add(14, 'days').valueOf()
  };
  const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: expenses[1].id, updates });
  expect(state[1].description).toBe(updates.description);
  expect(state[1].amount).toBe(updates.amount);
  expect(state[1].createdAt).toBe(updates.createdAt);
});

test('should not edit an expense if id not found', () => {
  const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: 36, updates: {description: 'methamphetamine'}});
  expect(state).toEqual(expenses);
});