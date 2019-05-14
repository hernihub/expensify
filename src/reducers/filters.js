import moment from 'moment';

const filtersReducerDefault = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefault, action) => {
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