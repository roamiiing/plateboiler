import fs from 'fs/promises';
import path from 'path';
import { replaceAll } from './vars';

export async function copyDirectory(src: string, dest: string, vars?: Record<string, string>) {
  const replacedDest = vars ? replaceAll(dest, vars) : dest;

  await fs.mkdir(replacedDest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const srcPath = path.join(src, entry.name);
    const replacedName = vars ? replaceAll(entry.name, vars) : entry.name;
    const destPath = path.join(dest, replacedName);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, vars);
    } else if (vars) {
      const content = await fs.readFile(srcPath);
      const replacedContent = replaceAll(content.toString(), vars);
      await fs.writeFile(destPath, replacedContent);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }));
}

export async function findDirectory(currentPath: string, name: string): Promise<string> {
  const entries = await fs.readdir(currentPath, { withFileTypes: true });
  const found = entries.find((entry) => entry.name === name && entry.isDirectory());

  if (!found) return findDirectory(path.resolve(currentPath, '..'), name);

  return path.join(currentPath, found.name);
}
