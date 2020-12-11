type ScaffoldConfig = {
  name: string;
  children?: string | ScaffoldConfig[];
};

type Command = {
  cmd: string,
  msg: string,
  err: string,
  args: string[],
  success: string,
}

type CommandCollection = {
  [key: string]: Command
}

type Extensions = {
  cmpExt: 'tsx' | 'js',
  fileExt: 'ts' | 'js',
  stylesExt: 'scss' | 'css',
}

export {
  Command,
  Extensions,
  ScaffoldConfig,
  CommandCollection,
};
