import yargs from 'yargs/yargs';
import fs from 'fs/promises';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import { Strings, Commands } from './constants';
import { findDirectory, copyDirectory } from './utils';
import { safeExit } from './logger';
import { Config } from './types';

(async () => {
  const { argv } = yargs(hideBin(process.argv));

  const { _: commands, ...args } = await argv;

  if (commands.length > 1) {
    safeExit(Strings.InvalidArgs, true);
  }

  if (commands.length === 0) {
    safeExit(true);
  }

  const currentDir = process.cwd();

  const [template] = commands as string[];

  if (template === Commands.Init) {
    const initialDir = path.resolve(__dirname, '..', 'initial');
    const destinationDir = path.join(currentDir, '.plateboiler');

    await copyDirectory(initialDir, destinationDir);
    safeExit(Strings.Initialized);
  }

  const plateboilerDir = await findDirectory(currentDir, '.plateboiler');

  const configPath = path.join(path.join(plateboilerDir, 'config.json'));
  const config = await fs.readFile(configPath)
    .then((file) => JSON.parse(file.toString())) as Config;

  const templateConfig = config[template];

  if (!templateConfig) safeExit(Strings.NoTemplateConfig);

  const vars = Object.entries(args as Record<string, string>)
    .filter(([key]) => key !== '_' && key[0] !== '$' && templateConfig!.vars.includes(key))
    .reduce(
      (obj, [key, value]) => ({ ...obj, [key]: value }),
      {} as Record<string, string>,
    );

  const templateDir = path.join(plateboilerDir, template);
  const destinationDir = path.resolve(plateboilerDir, '..', templateConfig!.dir);

  await copyDirectory(templateDir, destinationDir, vars);

  safeExit(Strings.Success);
})();
