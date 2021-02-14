export const thunkTemplate = (name: string, ts: boolean) => `
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: \`dispatch(${name}Thunk(10))\`. This
// will call the thunk with the \`dispatch\` function as the first argument. Async
// code can then be executed and other actions can be dispatched.
export const ${name}Thunk = (amount${ts ? ': number' : ''})${ts ? ': AppThunk' : ''} => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};`;
