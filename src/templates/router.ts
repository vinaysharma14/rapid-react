import { toKebabCase } from 'utils';
import { commonTemplates } from './common';

export const routerTemplate = (routes: string[], ts: boolean, namedExport: boolean) => {
  const {
    cmpExport,
    rootImport,
    cmpDefinition,
  } = commonTemplates('Router', ts, namedExport);

  return `${rootImport}

import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

${namedExport ? `import {
${routes.map(route => `  ${route},`).join('\n')}  
} from '../routes';` : routes.map((route) => `import ${route} from '..routes/${route}';`).join('\n')}

${cmpDefinition}
  <BrowserRouter>
    <Switch>
${routes.map((route) => `      <Route path="/${toKebabCase(route)}" component={${route}} />`).join('\n')}
    </Switch>
  </BrowserRouter>
);
${cmpExport}`;
};
