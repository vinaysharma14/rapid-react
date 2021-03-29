import { Extensions, ScaffoldConfig } from 'types';

const sortArr = (arr: string[]) => arr.sort(({ length: l1 }, { length: l2 }) => l1 - l2);

const toUniqueArray = (value?: string, sort?: boolean) => {
  if (value) {
    const arr = [...new Set(value.trim().split(/\s+/))];

    if (sort) {
      return sortArr(arr);
    }

    return arr;
  }

  return [];
};

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

const node = (name: ScaffoldConfig['name'], children: ScaffoldConfig['children']): ScaffoldConfig=> ({
  name,
  children,
});

export {
  node,
  sortArr,
  toKebabCase,
  toUniqueArray,
  getFileExtensions,
  capitalizeFirstLetter,
  unCapitalizeFirstLetter,
};
