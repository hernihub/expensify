import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const currentState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, {type: 'SET_TEXT_FILTER', text: 'e'});
  expect(state.text).toBe('e');
});

test('should set startDate filter', () => {
  const startDateFilter = moment().add(4, 'days'); 
  const currentState = {
    text: '',
    sortBy: 'date',
    startDate: moment(),
    endDate: undefined
  };
  const state = filtersReducer(currentState, {type: 'SET_START_DATE', date: startDateFilter});
  expect(state.startDate).toEqual(startDateFilter);
});

test('should set endDate filter', () => {
    const endDateFilter = moment().subtract(5, 'days');
    const currentState = {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: moment().add(10, 'year')
    };
    const state = filtersReducer(currentState, {type: 'SET_END_DATE', date: endDateFilter});
    expect(state.endDate).toEqual(endDateFilter);
});