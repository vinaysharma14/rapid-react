import ora from 'ora';

import { jsConfig } from '../templates';
import { LANG_CONFIG } from '../constants';

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
  if(ts) {
    // TODO:
  } else {
    await writeToFile(`${projectName}/${LANG_CONFIG.js}`, jsConfig());
  }
};

export const writeFolderStructure = async (
  projectName: string,
  scaffoldConfig: ScaffoldConfig[],
  fileExtensions: Extensions,
  isRoutingNeeded: boolean,
  namedExport: boolean,
  mobxUsed: boolean,
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
  if(mobxUsed) {
    await enableExperimentalDecorators(projectName, fileExt === 'ts');
  }

  // write all the files afterwards
  await Promise.all([
    ...files.map(({ path, data }) => writeToFile(path, data)),
    // replace default app imports by router if routing needed
    ...isRoutingNeeded ? [replaceFileContents(`${rootPath}/index.${cmpExt}`, [{
      subStr: /import App from '.\/App';/g,
      newSubStr: `import ${namedExport ? '{ Router }' : 'Router'} from './router';`,
    }, {
      subStr: /\<App \/\>/g,
      newSubStr: '<Router />',
    }])] : [],
  ]);

  spinner.succeed('Folder structure successfully scaffolded!');
};
