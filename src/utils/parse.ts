import {parse as acornParse} from 'acorn';

export const parse = (code: string) => {
  const result = acornParse(code, {ecmaVersion: 2020});
  console.log(result);
  return result;
};