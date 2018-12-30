/* @flow */

import Path from 'path'
import { find, findAsync } from './helpers'

function getPath(givenCurrentDirectory: ?string = null): string {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  return find(currentDirectory, Path.join('node_modules', '.bin')) || ''
}

async function getPathAsync(givenCurrentDirectory: ?string = null): Promise<string> {
  let currentDirectory = givenCurrentDirectory
  if (!currentDirectory) {
    currentDirectory = process.cwd()
  }
  return (await findAsync(currentDirectory, Path.join('node_modules', '.bin'))) || ''
}
function clearCache() {
  find.__sb_cache = {}
  findAsync.__sb_cache = {}
}

export default getPath
export { getPath, getPathAsync, clearCache }
