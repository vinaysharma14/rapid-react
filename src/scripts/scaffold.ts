import { componentTemplate, routerTemplate } from '../templates';

// TODO: stylesheets based on CSS script type b/w CSS and SCSS(SASS)

export const generateScaffoldConfig = (routesArr: string[], ts: boolean, defaultExport: boolean) => {
  // component and general file extensions
  const [cmpExt, fileExt] = [ts ? 'tsx' : 'js', ts ? 'ts' : 'js'];

  return {
    router: routerTemplate(routesArr, ts, defaultExport),
    routes: routesArr.map((route) => ({
      file: `${route}.${cmpExt}`,
      data: componentTemplate(route, ts, defaultExport)
    }))
  }
};