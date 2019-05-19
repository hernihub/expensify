import authReducer from '../../reducers/auth';
import uuid from 'uuid';

test('should set uid for login', () => {
  const uid = uuid();
  const state = authReducer(undefined, {type: 'LOGIN', uid});
  expect(state.uid).toEqual(uid);
});

test('should clear uid for logout', () => {
  const state = authReducer(undefined, {type: 'LOGOUT'});
  expect(state).toEqual({});
});