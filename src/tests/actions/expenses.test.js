import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id, description, amount, note, createdAt}) => {
    expensesData[id] = {description, amount, note, createdAt};
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    })
});

test('should remove expense from firebase', (done) => { // considered success or failure until done is called
  const store = createMockStore({ auth:{uid} });
  const id = expenses[2].id;
  // Promise chaining to wait for the asynchronous function to finish
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('abc123', {description: 'rent', amount: 1564});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {description: 'rent', amount: 1564}
  });
});

test('should edit expense from firebase', (done) => { // considered success or failure until done is called
  const store = createMockStore({auth: {uid}});
  const updates = {description: 'ketamine', amount: 12000};
  // Promise chaining to wait for the asynchronous function to finish
  store.dispatch(startEditExpense(expenses[1].id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expenses[1].id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toEqual(updates.description);
    done();
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  });
});

test('should add expense to database and store', (done) => { // considered success or failure until done is called
  const store = createMockStore({auth: {uid}});
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); // promise returned and managed below
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(dummyExpense);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({auth: {uid} });
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); // promise returned and managed below
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense);
    done();
  });
});

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({ auth:{uid} });
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
    done();
  });
});