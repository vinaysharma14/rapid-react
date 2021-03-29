import glob from 'glob';
import minify from 'minify';
import { writeToFile } from 'utils';

glob("lib/**/*.js", async (error: Error | null, files: string[]) => {
  if(error === null) {
    const minifiedContents = await Promise.all(files.map((file) => minify(file)));
    await Promise.all(minifiedContents.map((content, i) => writeToFile(files[i], content)));
  }
});
