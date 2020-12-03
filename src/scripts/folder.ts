import { ScaffoldConfig } from '../types';
import { createDir, writeToFile } from '../utils'

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
    children.reverse().forEach(({ name, children }) => {
      const { path, isFile } = flattenScaffoldConfig(`${dir}/${name}`, children);

      if (isFile && typeof children === 'string') {
        // maintain all files in an array with path & data
        files.push({ path, data: children, });
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


export const writeFolderStructure = async (
  projectName: string,
  scaffoldConfig: ScaffoldConfig[],
) => {
  // flatten the nested scaffold into arrays of dir and files
  flattenScaffoldConfig(projectName, scaffoldConfig);

  // write all the directories and the sub-directories first
  await Promise.all(directories.map(({ path }) => createDir(path, true)));

  // write all the files afterwards
  await Promise.all(files.map(({ path, data }) => writeToFile(path, data)));
}