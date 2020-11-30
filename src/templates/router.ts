export const routerTemplate = (routes: string[], ts: boolean, defaultExport: boolean) => {
  const rootImport = ts ? 'import { FC } from \'react\';\n\n' : '';
  const cmpDefinition = `${!defaultExport ? 'export ' : ''}const Routes${ts ? ': FC' : ''} = () => (`;

  return `${rootImport}import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

${routes.map((route) => `import ${route} from './${route}';`).join('\n')}

${cmpDefinition}
  <Router>
    <Switch>
${routes.map((route) => `      <Route path="/${route.toLowerCase()}" component={${route}} />`).join('\n')}
    </Switch>
  </Router>
);
${defaultExport ? '\nexport default Routes;' : ''}`;
}
