import moment from 'moment';
import { sortByDate, sortByAmount, setEndDate, setStartDate, setTextFilter } from '../../actions/filters';

test('should setup sortByDate action object', () => {
    const action = sortByDate();
    expect(action).toEqual({type: 'SORT_BY_DATE'})
});

test('should setup setTextFilter action object', () => {
    const text = 'rent';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
});

test('should generate set text filter object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    });
  });

test('should setup setStartDate action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    })
});

test('should setup setEndDate action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
});

test('should setup sortByAmount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({type: 'SORT_BY_AMOUNT'})
});