import { ScaffoldConfig } from '../types';
import { componentTemplate, rootExportTemplate, routerTemplate, stylesheetTemplate } from '../templates';

export const generateScaffoldConfig = (
  routes: string[],
  ts: boolean,
  namedExport: boolean,
  scss: boolean,
): ScaffoldConfig[] => {
  // file extensions
  const cmpExt = ts ? 'tsx' : 'js';         // component file
  const fileExt = ts ? 'ts' : 'js';         // general file
  const stylesExt = scss ? 'scss' : 'css';  // stylesheet

  return [
    // conditionally scaffold router and routes if any route present
    ...routes.length ? [
      {
        name: 'router',
        children: [
          {
            name: `index.${cmpExt}`,
            children: routerTemplate(routes, ts, namedExport)
          },
        ]
      },
      {
        name: 'routes',
        children: [
          ...routes.map(route => ({
            name: route,
            children: [{
              // component
              name: `index.${cmpExt}`,
              children: componentTemplate(route, ts, namedExport, stylesExt),
            }, {
              // stylesheet
              name: `styles.${stylesExt}`,
              children: stylesheetTemplate(route),
            }],
          })),
          // conditionally add a root export file in case of named exports
          ...namedExport ? [{
            name: `index.${fileExt}`,
            children: rootExportTemplate('routes', routes)
          }] : [],
        ]
      },
    ] : [],
  ]
};