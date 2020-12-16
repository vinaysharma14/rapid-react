import { Extensions } from "../types";

const toUniqueArray = (value: string) => [...new Set(value.trim().split(/\s+/))];

// reference: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php
const toKebabCase = (string: string) => {
  const matchedStr = string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);

  return matchedStr ? matchedStr.map(val => val.toLowerCase()).join('-') : string;
};

function capitalizeFirstLetter(string: string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function unCapitalizeFirstLetter(string: string) {
  return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
}

const getFileExtensions = (ts: boolean, scss: boolean): Extensions => ({
  cmpExt: ts ? 'tsx' : 'js', // component file
  fileExt: ts ? 'ts' : 'js', // general file
  stylesExt: scss ? 'scss' : 'css', // stylesheet
});

export {
  toKebabCase,
  toUniqueArray,
  getFileExtensions,
  capitalizeFirstLetter,
  unCapitalizeFirstLetter,
};
