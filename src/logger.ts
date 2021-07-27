import { Strings } from './constants';

export const { log } = console;

function help() {
  log(Strings.Help);
}

export function safeExit(reason: string, showHelp?: boolean): void;

export function safeExit(showHelp?: boolean): void;

export function safeExit(arg1?: string | boolean, arg2?: boolean) {
  const showHelp = typeof arg1 === 'boolean' ? arg1 : arg2;
  const reason = typeof arg1 === 'string' ? arg1 : undefined;

  if (reason) {
    log(reason);
  }

  if (showHelp) {
    log('\n');
    help();
  }

  process.exit(0);
}
