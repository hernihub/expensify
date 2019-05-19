import { login, logout } from '../../actions/auth';

test('should setup login action object', () => {
  const action = login('cba321');
  expect(action).toEqual({type: 'LOGIN', uid: 'cba321'})
});

test('should setup logout action object', () => {
    const action = logout();
    expect(action).toEqual({type: 'LOGOUT'})
  });