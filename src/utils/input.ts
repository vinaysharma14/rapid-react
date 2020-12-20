import { createInterface } from 'readline';

export const input = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    const interfaceInstance = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    interfaceInstance.question(`${query} `, (answer: string) => {
      resolve(answer);
      interfaceInstance.close();
    });
  });
};
