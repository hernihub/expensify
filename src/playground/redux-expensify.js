import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD EXPENSE action generator
const addExpense = ( { description = '', note = '', amount = 0, createadAt = 0 } = {} ) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount, // pennies
    createadAt
  }
});

// REMOVE EXPENSE action generator
const removeExpense = ( { id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSE action generator
const editExpense = ( id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// EDIT FILTER TEXT action generator
const setTextFilter = ( text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT BY AMOUNT FILTER action generator
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SORT BY AMOUNT FILTER action generator
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});

const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});


// in case of complex expenses states, a default object is in order
const expensesReducerDefault = [];
const filtersReducerDefault = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: undefined,
  endDate: undefined
};

const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id ); // destructuring the expense
    // return state.filter( (currenExpense) => currenExpense.id !== action.id ); // without destructuring
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id) {
          return { // new object with the old expense objected spreaded plus some of its properties overriden by putting them after the spreaded object
            ...expense,
            ...action.updates // object spread
          };
        } else {
          return expense;
        };
      });
    default:
      return state;
  }
};

const filtersReducer = (state = filtersReducerDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text // override text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount' // override text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date' // override text
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => { // destructuring the filters array
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createadAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createadAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch; // all three are true, then return the new array with matches
  }).sort((a, b) => {
    if (sortBy == 'date') {
      return a.createadAt < b.createadAt ? 1 : -1;
    }
    else if (sortBy == 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', note: 'fuck yea', amount: 500000, createadAt: -200}));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', note: 'oh fuck yea', amount: 5000, createadAt: -1000}));

//store.dispatch(removeExpense({text: expenseOne.expense.id}));
/* store.dispatch(removeExpense({id: expenseOne.expense.id}));

store.dispatch(editExpense(expenseTwo.expense.id, {amount:500 }));
*/
//store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(2000));
/* store.dispatch(setEndDate({date: '28888'}));
store.dispatch(setEndDate()); */

const demoState = {
  expenses: [{
    id: 'pjodufvjv',
    description: 'January rent',
    note: 'This was the final payment for this address',
    amount: 54500, // pennies
    createadAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};