import { createDir, writeToFile } from '../utils'
import { generateScaffoldConfig } from './scaffold';

export const writeFolderStructure = async (
  projectName: string,
  // TODO: fix any type with ReturnType<typeof generateScaffoldConfig>
  scaffoldConfig: any,
) => {
  // array of directories in project
  const directories = Object.keys(scaffoldConfig);

  // array of promises to write files
  const dirPromises = directories.map(dir => createDir(`${projectName}/src/${dir}`, true));

  // array of promises to write files
  const filePromises: ReturnType<typeof writeToFile>[] = [];

  // populate file write promises array
  directories.forEach(dir => {
    scaffoldConfig[dir].forEach(({ name, data }: { name: string, data: string }) => {
      filePromises.push(writeToFile(`${projectName}/src/${dir}/${name}`, data));
    })
  })

  // create all the directories and then write files
  await Promise.all(dirPromises);
  await Promise.all(filePromises);
}