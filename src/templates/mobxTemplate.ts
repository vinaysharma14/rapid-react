import {
  toKebabCase,
  capitalizeFirstLetter,
  unCapitalizeFirstLetter,
} from '../utils';

export const mobxTemplate = (stores: string[], namedExport: boolean) => (
  `import { observable } from 'mobx';

// import all stores here

${
  stores.length ? stores
    .map(store => {
      const storeName = `${capitalizeFirstLetter(store)}Store`;

      return `import ${
        namedExport ? `{ ${storeName} }` : `${storeName}`
      } from './${toKebabCase(store)}';`;
    })
    .join('\n') : `// import ${namedExport ? '{ FooStore }' : 'FooStore'} from './foo';
// import ${namedExport ? '{ BarStore }' : 'BarStore'} from './bar';`
  }

class Store {
  // instantiate all the stores here

  ${
  stores.length ?
    stores.map(store =>
      `@observable ${unCapitalizeFirstLetter(store)} = new ${capitalizeFirstLetter(store)}Store();`,
    ).join('\n  ') :
    `// @observable foo = new FooStore();
  // @observable bar = new BarStore();`
  }
}

export ${namedExport ? 'const store =' : 'default'} new Store();\n`
);
