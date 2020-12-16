import { name as appName } from '../messages';
import { capitalizeFirstLetter } from '../utils';

export const storeTemplate = (name: string, ts: boolean, namedExport: boolean) => (
  `import { action, observable } from 'mobx';

${namedExport ? 'export ' : ''}class ${capitalizeFirstLetter(name)}Store {
  // define all the properties here

  @observable property1${ts ? ': boolean' : ''} = true;
  @observable property2${ts ? ': string' : ''} = '${appName} is amazing!';

  // setter for property1
  @action setProperty1 = (value${ts ? ': boolean' : ''})${ts ? ': void' : ''} => {
    this.property1 = value;
  };

  // setter for property2
  @action setProperty2 = (value${ts ? ': string' : ''})${ts ? ': void' : ''} => {
    this.property2 = value;
  };
}
${!namedExport ? `\nexport default ${capitalizeFirstLetter(name)}Store;\n` : ''}`
);
