export const componentTemplate = (name: string, ts: boolean, defaultExport: boolean) => {
  const rootImport = ts ? 'import { FC } from \'react\';\n\n' : '';
  const cmpDefinition = `${!defaultExport ? 'export ' : ''}const ${name}${ts ? ': FC' : ''} = () => (`;

  return `${rootImport}${cmpDefinition}
  <div className='${name.toLowerCase()}-container'>
  {/* JSX goes here */}
  </div>
);
${defaultExport ? '\nexport default ${name};' : ''}`;
}
