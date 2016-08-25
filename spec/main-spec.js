/* @flow */

import Path from 'path'
import npmPath from '../'

describe('npm-path', function() {
  const DIR = Path.join(__dirname, 'fixtures')
  const DEEP_DIR = Path.join(DIR, 'test')
  const BIN_DIR = Path.join(DIR, 'node_modules', '.bin')
  const DEEP_BIN_DIR = Path.join(DEEP_DIR, 'node_modules', '.bin')

  describe('::getPATH', function() {
    it('works', function() {
      expect(npmPath(DIR)).toBe(BIN_DIR)
    })
    it('works deep', function() {
      expect(npmPath(DEEP_DIR)).toBe(DEEP_BIN_DIR)
    })
  })

  describe('::getPATHAsync', function() {
    it('works', function() {
      waitsForPromise(function() {
        return npmPath.async(DIR).then(function(result) {
          expect(result).toBe(BIN_DIR)
        })
      })
    })
    it('works deep', function() {
      waitsForPromise(function() {
        return npmPath.async(DEEP_DIR).then(function(result) {
          expect(result).toBe(DEEP_BIN_DIR)
        })
      })
    })
  })
})
