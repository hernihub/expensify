// SET TEXT FILTER action generator
export const setTextFilter = ( text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
  
// SORT BY AMOUNT FILTER action generator
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
  
// SORT BY DATE FILTER action generator
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
      
// SET START DATE FILTER action generator
export const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});
  
// SET END DATE FILTER action generator
export const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});