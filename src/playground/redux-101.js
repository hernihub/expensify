import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const reset = () => ({
    type: 'RESET'
});

const set = ({ setBy } = {}) => ({
    type: 'SET',
    setBy
});

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
          return {
            count: state.count + action.incrementBy
          };
        case 'RESET':
          return {
            count: 0
          };
        case 'SET':
          return {
            count: action.setBy
          };
        default:
          return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch(incrementCount());
store.dispatch(reset());
store.dispatch(set());
store.dispatch(set({ setBy: 22 }));
