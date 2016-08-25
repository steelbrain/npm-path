/* @flow */

import Path from 'path'
import { find, findAsync } from './helpers'

function getPATH(givenCurrentDirectory: ?string = null): string {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  return find(currentDirectory, Path.join('node_modules', '.bin')) || ''
}

async function getPATHAsync(givenCurrentDirectory: ?string = null): Promise<string> {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  return await findAsync(currentDirectory, Path.join('node_modules', '.bin')) || ''
}
function clearCache() {
  find.__sb_cache = {}
  findAsync.__sb_cache = {}
}

export default getPATH
export { getPATH, getPATHAsync, clearCache }
