export type ScaffoldConfig = {
  name: string;
  children: string | ScaffoldConfig[];
};