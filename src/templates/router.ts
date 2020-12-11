import { toKebabCase } from '../utils';
import { commonTemplates } from './common';

export const routerTemplate = (routes: string[], ts: boolean, namedExport: boolean) => {
  const {
    cmpExport,
    rootImport,
    cmpDefinition,
  } = commonTemplates('Routes', ts, namedExport);

  return `${rootImport}

import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

${namedExport ? `export {
${routes.map(route => `  ${route},`).join('\n')}  
} from '../routes';` : routes.map((route) => `import ${route} from '..routes/${route}';`).join('\n')}

${cmpDefinition}
  <Router>
    <Switch>
${routes.map((route) => `      <Route path="/${toKebabCase(route)}" component={${route}} />`).join('\n')}
    </Switch>
  </Router>
);
${cmpExport}`;
};
