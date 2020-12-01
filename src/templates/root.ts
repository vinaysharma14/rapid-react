export const rootExportTemplate = (dir: string, exports: string[]) => {
  return `// all the named exports of ${dir} are present here\n
${exports.map((val) => `export * from './${val}';`).join('\n')}
`
}