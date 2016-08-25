/* @flow */

import Path from 'path'
import FS from 'fs'
import memoize from 'sb-memoize'
import promisify from 'sb-promisify'

const access = promisify(FS.access)

function find(directory: string, name: string | Array<string>): Array<string> {
  const names = [].concat(name)
  const chunks = directory.split(Path.sep)
  const matched = []

  while (chunks.length) {
    let currentDir = chunks.join(Path.sep)
    if (currentDir === '') {
      currentDir = Path.resolve(directory, '/')
    }
    for (const fileName of names) {
      const filePath = Path.join(currentDir, fileName)

      try {
        FS.accessSync(filePath, FS.R_OK)
        matched.push(filePath)
        break
      } catch (_) {
        // Do nothing
      }
    }
    chunks.pop()
  }

  return matched
}

async function findAsync(directory: string, name: string | Array<string>): Promise<Array<string>> {
  const names = [].concat(name)
  const chunks = directory.split(Path.sep)
  const matched = []

  while (chunks.length) {
    let currentDir = chunks.join(Path.sep)
    if (currentDir === '') {
      currentDir = Path.resolve(directory, '/')
    }
    for (const fileName of names) {
      const filePath = Path.join(currentDir, fileName)
      try {
        await access(filePath, FS.R_OK)
        matched.push(filePath)
        break
      } catch (_) {
        // Do nothing
      }
    }
    chunks.pop()
  }

  return matched
}

module.exports = {
  find: memoize(find),
  findAsync: memoize(findAsync, { async: true }),
}
