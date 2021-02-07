export const sagaTemplate = (name: string, ts: boolean) => `
function* incrementHandler(action${ts ? ': ReturnType<typeof incrementByAmount>' : ''}) {
  yield delay(1000);
  // perform side effects here
}

// The function below is called a saga and allows us to perform async logic. It
// can be dispatched like a regular action: \`dispatch(${name}Saga(10))\`. This
// will call the async incrementHandler with the \`action\` as the first argument.
// Async code can then be executed and other actions can be dispatched with yield method.
export function* ${name}Saga() {
  // ${name}Saga would listen to incrementByAmount action and call incrementHandler()
  yield takeLatest(incrementByAmount, incrementHandler);
}`;
