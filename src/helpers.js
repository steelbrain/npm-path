/* @flow */

import path from 'path'
import fs from 'fs'

function accessAsync(filePath: string): Promise<boolean> {
  return new Promise(function(resolve) {
    fs.access(filePath, fs.R_OK, function(err) {
      resolve(err === null)
    })
  })
}

function findItem(directory: string, name: string | Array<string>): ?string {
  const names = [].concat(name)
  const chunks = directory.split(path.sep)

  while (chunks.length) {
    let currentDir = chunks.join(path.sep)
    if (currentDir === '') {
      currentDir = path.resolve(directory, '/')
    }
    for (let i = 0, { length } = names; i < length; ++i) {
      const fileName = names[i]
      const filePath = path.join(currentDir, fileName)

      try {
        fs.accessSync(filePath, fs.R_OK)
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
  const chunks = directory.split(path.sep)

  while (chunks.length) {
    let currentDir = chunks.join(path.sep)
    if (currentDir === '') {
      currentDir = path.resolve(directory, '/')
    }
    for (let i = 0, { length } = names; i < length; ++i) {
      const fileName = names[i]
      const filePath = path.join(currentDir, fileName)
      // eslint-disable-next-line no-await-in-loop
      if (await accessAsync(filePath)) {
        return filePath
      }
    }
    chunks.pop()
  }

  return null
}

export const find = findItem
export const findAsync = findItemAsync
