import { componentTemplate, rootExportTemplate, routerTemplate } from '../templates';

// TODO: stylesheets based on CSS script type b/w CSS and SCSS(SASS)

export const generateScaffoldConfig = (routesArr: string[], ts: boolean, namedExport: boolean) => {
  // component and general file extensions
  const [cmpExt, fileExt] = [ts ? 'tsx' : 'js', ts ? 'ts' : 'js'];

  return {
    router: [{
      name: `index.${cmpExt}`,
      data: routerTemplate(routesArr, ts, namedExport)
    }],
    routes: [
      // route components
      ...routesArr.map((route) => ({
        name: `${route}.${cmpExt}`,
        data: componentTemplate(route, ts, namedExport),
      })),
      // conditionally add a root export file in case of named exports
      ...namedExport ? [{
        name: `index.${fileExt}`,
        data: rootExportTemplate('routes', routesArr)
      }] : [],
    ]
  }
};