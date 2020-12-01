import { toKebabCase } from '../utils';
import { commonTemplates } from './common';

export const componentTemplate = (name: string, ts: boolean, defaultExport: boolean) => {
  const {
    cmpExport,
    rootImport,
    cmpDefinition,
  } = commonTemplates(name, ts, defaultExport);

  return `${rootImport}${cmpDefinition}
  <div className='${toKebabCase(name)}-container'>
  {/* JSX goes here */}
  </div>
);
${cmpExport}`;
}
