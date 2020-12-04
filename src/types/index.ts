type ScaffoldConfig = {
  name: string;
  children: string | ScaffoldConfig[];
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

export {
  Command,
  ScaffoldConfig,
  CommandCollection,
}