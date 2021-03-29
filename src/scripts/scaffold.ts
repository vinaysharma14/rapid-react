import { MAPPED_ANSWERS } from './mapper';
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

export const generateScaffoldConfig = (fileExtensions: Extensions): ScaffoldConfig[] => {
  const { cmpExt, fileExt, stylesExt } = fileExtensions;

  const {
    ts,
    routes,
    folders,
    sagaUsed,
    useLogger,
    namedExport,
    stateManagement,
    storesOrReducers,
  } = MAPPED_ANSWERS;

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
    ...folders.map(folder =>
      node(
        folder,
        // named folder exports
        namedExport ? [
          node(`index.${fileExt}`, rootExportTemplate(folder)),
        ] : [],
      ),
    ),

    // * ---------- MobX ---------- * //
    ...stateManagement === STATE_MANAGEMENT.MobX.label ? [
      node(
        'store',
        [
          node(`index.${fileExt}`, mobxTemplate(storesOrReducers, namedExport)),
          // stores
          ...storesOrReducers.map(name =>
            node(`${toKebabCase(name)}.${fileExt}`, storeTemplate(name, ts, namedExport)),
          ),
        ],
      ),
    ] : [],

    // * ---------- Redux ---------- * //
    ...stateManagement === STATE_MANAGEMENT.Redux.label ? [
      node(
        'store',
        [
          node(
            `index.${fileExt}`,
            reduxTemplate(ts, sagaUsed, useLogger, namedExport, storesOrReducers),
          ),
          ...storesOrReducers.length ? [
            node(
              'features',
              [
                // slices
                ...storesOrReducers.map(name =>
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
                    rootExportTemplate('reducers', storesOrReducers.map(name => toKebabCase(name))),
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
