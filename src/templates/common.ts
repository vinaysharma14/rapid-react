export const commonTemplates = (name: string, ts: boolean, namedExport: boolean) => ({
  rootImport: `import React${ts ? ', { FC }' : ''} from \'react\';\n\n`,
  cmpDefinition: `${namedExport ? 'export ' : ''}const ${name}${ts ? ': FC' : ''} = () => (`,
  cmpExport: `${!namedExport ? `\nexport default ${name};\n` : ''}`,
})