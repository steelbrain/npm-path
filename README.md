NPM-Path
=========

NPM-Path is a helper node module that gives you `PATH` value including all the locally installed npm bins.

## Installation

```sh
npm install --save sb-npm-path
```

## API

```js
function getPath(rootDirectory?: string): string
function getPathAsync(rootDirectory?: string): Promise<string>
function clearCache(): void

export default getPath
export { getPath, getPathAsync, clearCache }
```

## Examples
```js
import { exec } from 'sb-exec'
import npmPath from 'npm-path'

export default async function run() {
  const PATH = await npmPath.async(__dirname)
  return await exec('mocha', { env: { PATH } })
}
```

## License

This project is licensed under the terms of MIT License, see the LICENSE file for more info
