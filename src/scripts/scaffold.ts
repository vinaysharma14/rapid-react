import { toKebabCase } from '../utils';
import { Extensions, ScaffoldConfig } from '../types';
import { REDUX_ADDONS, STATE_MANAGEMENT } from '../constants';

import {
  mobxTemplate,
  storeTemplate,
  reduxTemplate,
  routerTemplate,
  componentTemplate,
  stylesheetTemplate,
  rootExportTemplate,
} from '../templates';

type StateType = {
  sagas: string[],
  storesOrReducers: string[],
  type: keyof typeof STATE_MANAGEMENT,
}

export const generateScaffoldConfig = (
  routes: string[],
  folders: string[],
  ts: boolean,
  namedExport: boolean,
  fileExtensions: Extensions,
  stateManagement?: StateType,
  reduxAddons?: [keyof typeof REDUX_ADDONS],
): ScaffoldConfig[] => {
  const { cmpExt, fileExt, stylesExt } = fileExtensions;

  return [
    // conditionally scaffold router and routes if any route present
    ...routes.length ? [
      {
        name: 'router',
        children: [{
          name: `index.${cmpExt}`,
          children: routerTemplate(routes, ts, namedExport),
        }],
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
            children: rootExportTemplate('routes', routes),
          }] : [],
        ],
      },
    ] : [],
    // scaffold folder(s) if user chose any
    ...folders.length ? folders.map(name => ({
      name,
      // conditionally add a root export file in case of named exports
      children: namedExport ? [{
        name: `index.${fileExt}`,
        children: rootExportTemplate(name),
      }] : undefined,
    })) : [],
    // generate MobX template
    ...stateManagement?.type === STATE_MANAGEMENT.MobX.label ? [{
      name: 'store',
      children: [{
        name: `index.${fileExt}`,
        children: mobxTemplate(stateManagement.storesOrReducers, namedExport),
      }, ...stateManagement?.storesOrReducers.length ?
        stateManagement.storesOrReducers.map(name => ({
          name: `${toKebabCase(name)}.${fileExt}`,
          children: storeTemplate(name, ts, namedExport),
        })) : []],
    }] : [],
    // generate Redux template
    ...stateManagement?.type === STATE_MANAGEMENT.Redux.label ? [{
      name: 'store',
      children: [{
        name: `index.${fileExt}`,
        children: reduxTemplate(
          stateManagement.storesOrReducers,
          stateManagement.sagas,
          ts,
          namedExport,
          reduxAddons,
        ),
      }],
    }] : [],
  ];
};
