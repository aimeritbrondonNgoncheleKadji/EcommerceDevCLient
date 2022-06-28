import _ from 'lodash';

export function isArrayEqual(arrayOne, arrayTwo) {
  if (arrayOne?.length === 0 || arrayTwo?.length === 0) return false;

  return _(arrayOne).differenceWith(arrayTwo, _.isEqual).isEmpty();
}
