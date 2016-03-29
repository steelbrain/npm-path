'use strict'

/* @flow */

import Path from 'path'
import { find, findAsync } from './helpers'

const SEPARATOR = process.platform === 'win32' ? ';' : ':'

function getPATH(currentDirectory: ?string = null) {
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  const entries = find(currentDirectory, [Path.join('node_modules', '.bin')])
  return entries.join(SEPARATOR)
}

async function getPATHAsync(currentDirectory: ?string = null) {
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  const entries = await findAsync(currentDirectory, [Path.join('node_modules', '.bin')])
  return entries.join(SEPARATOR)
}

module.exports = getPATH
module.exports.async = getPATHAsync
