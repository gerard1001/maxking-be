import { HttpException, HttpStatus } from '@nestjs/common';

export const checkStringDuplicatesInArray = (
  stringsArray: string[],
): boolean => {
  try {
    return stringsArray?.some((string1: string, index1: number) =>
      stringsArray
        .slice(index1 + 1)
        .some(
          (string2: string) => string1.toLowerCase() === string2.toLowerCase(),
        ),
    );
  } catch (error) {
    throw new HttpException(
      error.message || 'Server Error',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export const compareRoles = (allowedRoles: string[], userRole: string[]) => {
  return allowedRoles.some((elementA) => userRole.includes(elementA));
};

export const generateRdmPassword = (): string => {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numset = '0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length - 3; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  for (var i = 0, n = numset.length; i < length - 5; ++i) {
    retVal += numset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
