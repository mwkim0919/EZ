// @ts-ignore
import * as palette from 'google-palette';

export const getRandomColors = (num: number): string[] => {
  return palette('mpn65', num).map((hex: string) => '#' + hex);
}
