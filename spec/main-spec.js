import test from 'ava'
import path from 'path'
import { getPath, getPathAsync } from '..'

const DIR = path.join(__dirname, 'fixtures')
const DEEP_DIR = path.join(DIR, 'test')
const BIN_DIR = path.join(DIR, 'node_modules', '.bin')
const DEEP_BIN_DIR = path.join(DEEP_DIR, 'node_modules', '.bin')

test('npm-path::getPath works', function(t) {
  t.is(getPath(DIR), BIN_DIR)
})
test('npm-path::getPath works deep', function(t) {
  t.is(getPath(DEEP_DIR), DEEP_BIN_DIR)
})
test('npm-path::getPathAsync works', async function(t) {
  t.is(await getPathAsync(DIR), BIN_DIR)
})
test('npm-path::getPathAsync works deep', async function(t) {
  t.is(await getPathAsync(DEEP_DIR), DEEP_BIN_DIR)
})
