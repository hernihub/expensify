import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('abc123', {description: 'rent', amount: 1564});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {description: 'rent', amount: 1564}
    })
});

test('should setup add expense action object', () => {
    const testExpense = { description: 'cocaine', note: 'to party', amount: 100000, createdAt: 13500000 };
    const action = addExpense(testExpense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...testExpense,
            id: expect.any(String)
        }
    })
});

test('should setup add expense action object with default values', () => {
    const testExpense = {};
    const action = addExpense(testExpense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    })
});
