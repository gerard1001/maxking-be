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
