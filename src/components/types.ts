export type WinState = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export const TASKBAR_H = 38;
export const MIN_W = 300;
export const MIN_H = 200;
