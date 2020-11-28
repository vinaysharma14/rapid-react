const removeDuplicatesFromArr = (array: any[]) => [...new Set(array)];

const stringToArray = (string: string) => string.trim().split(/\s+/);

export { removeDuplicatesFromArr, stringToArray };