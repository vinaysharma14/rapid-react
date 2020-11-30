import { componentTemplate, routerTemplate } from '../templates';

// TODO: stylesheets based on CSS script type b/w CSS and SCSS(SASS)

export const generateScaffoldConfig = (routesArr: string[], ts: boolean, defaultExport: boolean) => {
  // component and general file extensions
  const [cmpExt, fileExt] = [ts ? 'tsx' : 'js', ts ? 'ts' : 'js'];

  return {
    router: [{
      name: `index.${cmpExt}`,
      data: routerTemplate(routesArr, ts, defaultExport)
    }],
    routes: routesArr.map((route) => ({
      name: `${route}.${cmpExt}`,
      data: componentTemplate(route, ts, defaultExport)
      // TODO: conditionally add an index file here incase of named exports
    }))
  }
};