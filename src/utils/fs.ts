import { promises as fs } from 'fs';

const { mkdir, writeFile, unlink, readFile } = fs;

const deleteFile = async (fileName: string) => {
  try {
    await unlink(fileName);
  } catch ({ message }) {
    console.error(message);
  }
};

const createDir = async (dirPath: string, nested: boolean) => {
  try {
    await mkdir(dirPath, { recursive: nested });
  } catch ({ message }) {
    console.error(message);
  }
};

const writeToFile = async (fileName: string, content: string) => {
  try {
    await writeFile(fileName, content);
  } catch ({ message }) {
    console.error(message);
  }
};

const replaceFileContents = async (
  fileName: string,
  contents: { subStr: RegExp, newSubStr: string }[],
) => {
  try {
    const dataBuffer = await readFile(fileName);

    let content = dataBuffer.toString();
    contents.forEach(({ subStr, newSubStr }) => content = content.replace(subStr, newSubStr));

    await writeFile(fileName, content);
  } catch ({ message }) {
    console.log(message);
  }
};

export {
  createDir,
  deleteFile,
  writeToFile,
  replaceFileContents,
};
