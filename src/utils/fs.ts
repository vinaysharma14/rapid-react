import { promises as fs } from 'fs';
const { mkdir, writeFile, unlink } = fs;

const deleteFile = async (fileName: string) => {
  try {
    await unlink(fileName)
  } catch (error) {
    console.error(error.message);
  }
}

const createDir = async (dirPath: string, nested: boolean) => {
  try {
    await mkdir(dirPath, { recursive: nested })
  } catch (error) {
    console.error(error.message);
  }
}

const writeToFile = async (fileName: string, content: string) => {
  try {
    await writeFile(fileName, content);
  } catch (error) {
    console.error(error.message);
  }
}

export {
  createDir,
  deleteFile,
  writeToFile,
}