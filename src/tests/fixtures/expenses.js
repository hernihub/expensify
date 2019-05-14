import moment from 'moment';

export default [{
    id: '1',
    description: 'Marijuana',
    note: 'cannabis like crazy',
    amount: 191500,
    createdAt: 0
  }, {
    id: '2',
    description: 'ecstasy',
    note: 'too feel good',
    amount: 1580,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  }, {
    id: '3',
    description: 'LSD',
    note: 'to spirituality journeys',
    amount: 2580,
    createdAt: moment(0).add(4, 'days').valueOf()
}];