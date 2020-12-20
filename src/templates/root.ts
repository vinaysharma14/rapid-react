export const rootExportTemplate = (dir: string, exports?: string[]) => (
  `// all the named exports of ${dir} ${exports ? 'are' : 'would be'} present here
${exports ? `\n${exports.map((val) => `export * from './${val}';`).join('\n')}\n` : ''}`
);
