import { ScaffoldConfig } from '../types';
import { componentTemplate, rootExportTemplate, routerTemplate } from '../templates';

// TODO: stylesheets based on CSS script type b/w CSS and SCSS(SASS)

export const generateScaffoldConfig = (routesArr: string[], ts: boolean, namedExport: boolean): ScaffoldConfig[] => {
  // component and general file extensions
  const [cmpExt, fileExt] = [ts ? 'tsx' : 'js', ts ? 'ts' : 'js'];

  return [
    {
      name: 'router',
      children: [
        {
          name: `index.${cmpExt}`,
          children: routerTemplate(routesArr, ts, namedExport)
        },
      ]
    },
    {
      name: 'routes',
      children: [
        // route components
        ...routesArr.map(route => ({
          name: `${route}.${cmpExt}`,
          children: componentTemplate(route, ts, namedExport),
        })),
        // conditionally add a root export file in case of named exports
        ...namedExport ? [{
          name: `index.${fileExt}`,
          children: rootExportTemplate('routes', routesArr)
        }] : [],
      ]
    },
  ];
};