import ora from 'ora';

import { jsConfig, tsConfig } from '../templates';
import { LANG_CONFIG, STATE_MANAGEMENT } from '../constants';

import { Extensions, ScaffoldConfig } from '../types';
import { createDir, writeToFile, deleteFile, replaceFileContents } from '../utils';

const directories: { path: string }[] = [];
const files: { path: string, data: string }[] = [];

const flattenScaffoldConfig = (
  dir: string,
  children: ScaffoldConfig['children'],
) => {
  if (typeof children === 'string') {
    // return the file with it's path
    return { path: dir, isFile: true };
  } else {
    // recursively traverse children until a file is not found
    children && children.reverse().forEach(({ name, children }) => {
      const { path, isFile } = flattenScaffoldConfig(`${dir}/${name}`, children);

      if (isFile && typeof children === 'string') {
        // maintain all files in an array with path & data
        files.push({ path, data: children });
      }
      else {
        // maintain all directories with path
        directories.push({ path });
      }
    });

    // return the directory with it's path
    return { path: dir, isFile: false };
  }
};

const enableExperimentalDecorators = async(projectName: string, ts: boolean) => {
  const path = `${projectName}/${LANG_CONFIG[ts ? 'ts' : 'js']}`;

  if(ts) {
    await replaceFileContents(path, [{
      subStr: /"compilerOptions": {/g,
      newSubStr: tsConfig(),
    }]);
  } else {
    await writeToFile(path, jsConfig());
  }
};

export const writeFolderStructure = async (
  projectName: string,
  scaffoldConfig: ScaffoldConfig[],
  fileExtensions: Extensions,
  isRoutingNeeded: boolean,
  namedExport: boolean,
  stateManagement?: keyof typeof STATE_MANAGEMENT,
) => {
  const spinner = ora('Scaffolding the folder structure...').start();
  spinner.start();

  const { cmpExt, fileExt } = fileExtensions;
  const rootPath = `${projectName}/src`;

  // flatten the nested scaffold into arrays of dir and files
  flattenScaffoldConfig(rootPath, scaffoldConfig);

  if (isRoutingNeeded) {
    // delete following files as now we'll import router
    // in index file of src instead of App.js/tsx
    const filesToBeDeleted = [`App.${cmpExt}`, `App.test.${cmpExt}`, 'App.css', 'logo.svg'];
    await Promise.all(filesToBeDeleted.map(fileName => deleteFile(`${rootPath}/${fileName}`)));
  };

  // write all the directories and the sub-directories first
  await Promise.all(directories.map(({ path }) => createDir(path, true)));

  // decorators need to be enabled explicitly
  if(stateManagement === 'MobX') {
    await enableExperimentalDecorators(projectName, fileExt === 'ts');
  }

  // wrap the app with provider in case redux is used
  if(stateManagement === 'Redux') {
    await replaceFileContents(`${rootPath}/index.${cmpExt}`, [{
      subStr: /import ReactDOM from 'react-dom';/g,
      newSubStr: 'import ReactDOM from \'react-dom\';\nimport { Provider } from \'react-redux\';\n',
    }, {
      subStr: /ReactDOM.render\(/g,
      newSubStr: `import ${namedExport ? '{ store }' : 'store'} from './store';\n\nReactDOM.render(`,
    }, {
      subStr: /\<App \/\>/g,
      newSubStr: `<Provider store={store}>
      <App />
    </Provider>`,
    }]);
  }

  // replace default app imports by router if routing needed
  if(isRoutingNeeded) {
    await replaceFileContents(`${rootPath}/index.${cmpExt}`, [{
      subStr: /import App from '.\/App';/g,
      newSubStr: `import ${namedExport ? '{ Router }' : 'Router'} from './router';`,
    }, {
      subStr: /\<App \/\>/g,
      newSubStr: '<Router />',
    }]);
  }

  // write all the files
  await Promise.all(files.map(({ path, data }) => writeToFile(path, data)));

  spinner.succeed('Folder structure successfully scaffolded!');
};
