import {
  camelCase,
  capitalize,
  decapitalize,
  kebabCase,
  lowerCase,
  snakeCase,
  swapCase,
  titleCase,
  upperCase,
} from 'voca';
import { Strings } from '../constants';
import { safeExit } from '../logger';

const modToFn: Record<string, (str: string) => string> = {
  capitalize,
  decapitalize,
  camel: camelCase,
  kebab: kebabCase,
  lower: lowerCase,
  snake: snakeCase,
  swap: swapCase,
  title: titleCase,
  upper: upperCase,
};

export function replaceAll(str: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((newStr, [key, value]) => newStr.replace(
    new RegExp(`__${key}\\.?([a-zA-Z.]+)?__`, 'g'),
    (_, modsStr: string) => {
      if (!modsStr) return value;
      const mods = modsStr.split('.');
      return mods.reduce((modified, modifier) => {
        if (!Object.prototype.hasOwnProperty.call(modToFn, modifier)) {
          safeExit(`${Strings.UnknownModificator}: ${modifier}`);
        }
        return modToFn[modifier](modified);
      }, value);
    },
  ), str);
}
