import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('abc123', {description: 'rent', amount: 1564});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {description: 'rent', amount: 1564}
    })
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  });
});

test('should add expense to database and store', (done) => { // considered success or failure until done is called
  const store = createMockStore({});
  const dummyExpense = {description: 'pcp', amount: 100, note: 'phenylcyclidine', createdAt: 1000000};
  // Promise chaining to wait for the asynchronous function to finish
  store.dispatch(startAddExpense(dummyExpense)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...dummyExpense
        }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value'); // promise returned and managed below
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(dummyExpense);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpense = {description: '', amount: 0, note: '', createdAt: 0};
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpense
        }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value'); // promise returned and managed below
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense);
    done();
  });  
});