import { node, toKebabCase } from '../utils';
import { STATE_MANAGEMENT } from '../constants';
import { Extensions, ScaffoldConfig } from '../types';

import {
  mobxTemplate,
  storeTemplate,
  reduxTemplate,
  sliceTemplate,
  routerTemplate,
  componentTemplate,
  stylesheetTemplate,
  rootExportTemplate,
} from '../templates';

type StateType = {
  storesOrReducers: string[],
  type: keyof typeof STATE_MANAGEMENT,
}

export const generateScaffoldConfig = (
  ts: boolean,
  routes: string[],
  folders: string[],
  sagaUsed: boolean,
  useLogger: boolean,
  namedExport: boolean,
  fileExtensions: Extensions,
  stateManagement?: StateType,
): ScaffoldConfig[] => {
  const { cmpExt, fileExt, stylesExt } = fileExtensions;

  return [
    ...routes.length ? [
      // * ---------- router ---------- * //
      node(
        'router', [
          node(`index.${cmpExt}`, routerTemplate(routes, ts, namedExport)),
        ],
      ),

      // * ---------- routes ---------- * //
      node(
        'routes',
        [
          ...routes.map(route => (
            node(
              route, [
                // component
                node(`index.${cmpExt}`, componentTemplate(route, ts, namedExport, stylesExt)),
                // stylesheet
                node(`styles.${stylesExt}`, stylesheetTemplate(route)),
              ],
            )
          )),
          // named route exports
          ...namedExport ? [
            node(`index.${fileExt}`, rootExportTemplate('routes', routes)),
          ] : [],
        ],
      ),
    ] : [],

    // * ---------- folders ---------- * //
    ...folders.length ? folders.map(folder =>
      node(
        folder,
        // named folder exports
        namedExport ? [
          node(`index.${fileExt}`, rootExportTemplate(folder)),
        ] : [],
      ),
    ) : [],

    // * ---------- MobX ---------- * //
    ...stateManagement?.type === STATE_MANAGEMENT.MobX.label ? [
      node(
        'store',
        [
          node(`index.${fileExt}`, mobxTemplate(stateManagement.storesOrReducers, namedExport)),
          // stores
          ...stateManagement?.storesOrReducers.length ? stateManagement.storesOrReducers.map(name =>
            node(`${toKebabCase(name)}.${fileExt}`, storeTemplate(name, ts, namedExport)),
          ) : [],
        ],
      ),
    ] : [],

    // * ---------- Redux ---------- * //
    ...stateManagement?.type === STATE_MANAGEMENT.Redux.label ? [
      node(
        'store',
        [
          node(
            `index.${fileExt}`,
            reduxTemplate(ts, sagaUsed, useLogger, namedExport, stateManagement.storesOrReducers),
          ),
          ...stateManagement?.storesOrReducers.length ? [
            node(
              'features',
              [
                // slices
                ...stateManagement.storesOrReducers.map(name =>
                  node(
                    toKebabCase(name), [
                      node(`index.${fileExt}`, sliceTemplate(name, ts, namedExport, sagaUsed)),
                    ],
                  ),
                ),
                // named slice exports
                ...namedExport ? [
                  node(
                    `index.${fileExt}`,
                    rootExportTemplate('reducers', stateManagement.storesOrReducers.map(name => toKebabCase(name))),
                  ),
                ] : [],
              ],
            ),
          ] : [],
        ],
      ),
    ] : [],
  ];
};

// TODO:
// templates can be grouped into folders and scaffolding can be made
// modular by shifting logic to index files of each template folder
// e.g. redux folder can contain files for it's templates: reducer and redux store
// and it's index file can scaffold redux related templates
