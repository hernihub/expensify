// in case of complex expenses states, a default object is in order
const expensesReducerDefault = [];

export default (state = expensesReducerDefault, action) => {
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
            return { // new object with the old expense object spreaded plus some of its properties overriden by putting them after the spreaded object
              ...expense,
              ...action.updates // object spread
            };
          } else {
            return expense;
          };
        });
      case 'SET_EXPENSES':
        return action.expenses;
      default:
        return state;
  }
};