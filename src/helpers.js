/* @flow */

import Path from 'path'
import FS from 'fs'
import memoize from 'sb-memoize'
import promisify from 'sb-promisify'

const access = promisify(FS.access)

function findItem(directory: string, name: string | Array<string>): ?string {
  const names = [].concat(name)
  const chunks = directory.split(Path.sep)

  while (chunks.length) {
    let currentDir = chunks.join(Path.sep)
    if (currentDir === '') {
      currentDir = Path.resolve(directory, '/')
    }
    for (let i = 0, length = names.length; i < length; ++i) {
      const fileName = names[i]
      const filePath = Path.join(currentDir, fileName)

      try {
        FS.accessSync(filePath, FS.R_OK)
        return filePath
      } catch (_) {
        // Do nothing
      }
    }
    chunks.pop()
  }

  return null
}

async function findItemAsync(directory: string, name: string | Array<string>): Promise<?string> {
  const names = [].concat(name)
  const chunks = directory.split(Path.sep)

  while (chunks.length) {
    let currentDir = chunks.join(Path.sep)
    if (currentDir === '') {
      currentDir = Path.resolve(directory, '/')
    }
    for (let i = 0, length = names.length; i < length; ++i) {
      const fileName = names[i]
      const filePath = Path.join(currentDir, fileName)
      try {
        await access(filePath, FS.R_OK)
        return filePath
      } catch (_) {
        // Do nothing
      }
    }
    chunks.pop()
  }

  return null
}

export const find = memoize(findItem)
export const findAsync = memoize(findItemAsync, { async: true })
