export const commonTemplates = (name: string, ts: boolean, defaultExport: boolean) => ({
  rootImport: `import React${ts ? ', { FC }' : ''} from \'react\';\n\n`,
  cmpDefinition: `${!defaultExport ? 'export ' : ''}const ${name}${ts ? ': FC' : ''} = () => (`,
  cmpExport: `${defaultExport ? `\nexport default ${name};\n` : ''}`,
})