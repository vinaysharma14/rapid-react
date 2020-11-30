import { promises as fs } from 'fs';
const { mkdir, writeFile } = fs;

// TODO: function to delete file

const createDir = async (dirPath: string, nested: boolean) => {
  await mkdir(dirPath, { recursive: nested })
}

const writeToFile = async (fileName: string, content: string) => {
  await writeFile(fileName, content);
}

export {
  createDir,
  writeToFile,
}