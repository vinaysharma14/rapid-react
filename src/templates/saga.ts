import { commonTemplates } from "./common";
import { unCapitalizeFirstLetter } from "../utils";

export const sagaTemplate = (name: string, ts: boolean, namedExport: boolean) => {
  const reducer = 'xyz';
  const sagaPrefix = unCapitalizeFirstLetter(name);

  const { cmpExport } = commonTemplates(`${sagaPrefix}Saga`, ts, namedExport);

  return `import { takeLatest, put } from 'redux-saga/effects';

import { onSuccessAction, onErrorAction } from '../../reducers/${reducer}/actions';
import actionTypes${ts ? ', { FooActionCreatorType }' : ''} from '../../reducers/${reducer}/types';

function* ${sagaPrefix}Middleware(action${ts ? ': FooActionCreatorType' : ''})${ts ? ': Generator' : ''} {
  const bar = action.payload;

  try {
    const result = yield someAsyncTask(bar);
    yield put(onSuccessAction(result));
  } catch (error) {
    yield put(onErrorAction(error));
  }
}

${namedExport ? 'export ' : ''}function* ${sagaPrefix}Saga()${ts ? ': Generator' : ''} {
  // ${sagaPrefix}Saga would listen to FOO_ACTION and call ${sagaPrefix}Middleware()
  yield takeLatest(actionTypes.FOO_ACTION, ${sagaPrefix}Middleware);
}
${cmpExport}`;
};
