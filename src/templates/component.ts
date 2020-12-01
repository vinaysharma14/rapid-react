import { commonTemplates } from './common';

export const componentTemplate = (name: string, ts: boolean, defaultExport: boolean) => {
  const {
    cmpExport,
    rootImport,
    cmpDefinition,
  } = commonTemplates(name, ts, defaultExport);

  return `${rootImport}${cmpDefinition}
  <div className='${name.toLowerCase()}-container'>
  {/* JSX goes here */}
  </div>
);
${cmpExport}`;
}
