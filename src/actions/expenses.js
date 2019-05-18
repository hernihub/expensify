import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD EXPENSE action generator
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => { // this functions gets called internally by Redux with dispatch as an argument
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return database.ref('expenses').push(expense).then((ref) => { // Returning the promise to it can be chained downstream
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    });
  };
};
  
  // REMOVE EXPENSE action generator
export const removeExpense = ( { id } = {} ) => ({
  type: 'REMOVE_EXPENSE',
  id
});
  
// EDIT EXPENSE action generator
export const editExpense = ( id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});