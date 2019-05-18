export default (expenses) => expenses.map((expense) => expense.amount).reduce((sumSoFar, next) => sumSoFar + next, 0);
