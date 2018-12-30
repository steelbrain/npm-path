/* @flow */

import path from 'path'
import { getPath, getPathAsync } from '..'

describe('npm-path', function() {
  const DIR = path.join(__dirname, 'fixtures')
  const DEEP_DIR = path.join(DIR, 'test')
  const BIN_DIR = path.join(DIR, 'node_modules', '.bin')
  const DEEP_BIN_DIR = path.join(DEEP_DIR, 'node_modules', '.bin')

  describe('::getPath', function() {
    it('works', function() {
      expect(getPath(DIR)).toBe(BIN_DIR)
    })
    it('works deep', function() {
      expect(getPath(DEEP_DIR)).toBe(DEEP_BIN_DIR)
    })
  })

  describe('::getPathAsync', function() {
    it('works', function() {
      waitsForPromise(function() {
        return getPathAsync(DIR).then(function(result) {
          expect(result).toBe(BIN_DIR)
        })
      })
    })
    it('works deep', function() {
      waitsForPromise(function() {
        return getPathAsync(DEEP_DIR).then(function(result) {
          expect(result).toBe(DEEP_BIN_DIR)
        })
      })
    })
  })
})
