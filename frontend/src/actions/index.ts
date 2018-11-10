import { REQUEST, SUCCESS, FAILURE } from '../constants';
import { RequestType } from 'src/types';

// Creates a request type object
export const createRequestTypes = (base: string): RequestType => {
  return [REQUEST, SUCCESS, FAILURE].reduce(
    (acc, type) => {
      acc[type] = `${base}_${type}`;
      return acc;
    },
    {} as RequestType
  );
};
