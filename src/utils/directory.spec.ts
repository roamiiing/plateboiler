import mockFs from 'mock-fs';
import fs from 'fs/promises';
import path from 'path';

import { copyDirectory, findDirectory } from './directory';

describe('fs manipulation', () => {
  beforeAll(() => {
    mockFs({
      a: {
        b: {
          c: {},
          d: {
            e: {},
            f: {
              __name__: '__name__',
            },
          },
        },
        target: {},
      },
    });
  });

  it('should find the nearest directory with the given name', async () => {
    const found = await findDirectory('a/b/d/f', 'target');
    expect(found).toEqual(path.resolve('a/target'));
  });

  it('should copy a directory with all its content', async () => {
    await copyDirectory('a', 'dest');
    const rootDir = await fs.readdir(path.resolve());
    const file = await fs.readFile(path.resolve('dest/b/d/f/__name__'));
    expect(rootDir).toEqual(['a', 'dest']);
    expect(file.toString()).toEqual('__name__');
  });

  it('should copy a directory with vars replacement', async () => {
    await copyDirectory('a', 'dest', {
      name: 'world',
    });
    const file = await fs.readFile(path.resolve('dest/b/d/f/world'));
    expect(file.toString()).toEqual('world');
  });

  afterAll(() => mockFs.restore());
});
