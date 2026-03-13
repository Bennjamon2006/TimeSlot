export type Job = {
  name: string;
  execute: () => Promise<void>;
  interval: number;
};
