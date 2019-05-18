import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseSummary} from '../../components/ExpenseSummary';

test('should render ExpenseSummary page for 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={12500}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary for multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={3} expensesTotal={1250000}/>);
  expect(wrapper).toMatchSnapshot();
});