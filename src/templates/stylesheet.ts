import { toKebabCase } from '../utils';

export const stylesheetTemplate = (name: string) => `.${toKebabCase(name)}-container {
  /* styles go here */
}`;
