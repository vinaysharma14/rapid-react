import { Extensions } from 'types';
import { toKebabCase } from 'utils';
import { commonTemplates } from './common';

export const componentTemplate = (name: string, ts: boolean, namedExport: boolean, styleExt: Extensions['stylesExt']) => {
  const {
    cmpExport,
    rootImport,
    cmpDefinition,
  } = commonTemplates(name, ts, namedExport);

  return `${rootImport}

import './styles.${styleExt}';

${cmpDefinition}
  <div className='${toKebabCase(name)}-container'>
    {/* JSX goes here */}
  </div>
);
${cmpExport}`;
};
