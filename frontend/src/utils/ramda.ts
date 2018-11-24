import * as R from 'ramda';

export const keysToUpperCase = R.compose(
  R.map((x: string) => x.toUpperCase()),
  R.keys
);
