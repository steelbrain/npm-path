/* @flow */

import Path from 'path'
import { find, findAsync } from './helpers'

const SEPARATOR = process.platform === 'win32' ? ';' : ':'

function getPATH(givenCurrentDirectory: ?string = null): string {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  const entries = find(currentDirectory, [Path.join('node_modules', '.bin')])
  return entries.join(SEPARATOR)
}

async function getPATHAsync(givenCurrentDirectory: ?string = null): Promise<string> {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  const entries = await findAsync(currentDirectory, [Path.join('node_modules', '.bin')])
  return entries.join(SEPARATOR)
}

module.exports = getPATH
module.exports.async = getPATHAsync
module.exports.clearCache = function() {
  find.__sb_cache = {}
  findAsync.__sb_cache = {}
}
