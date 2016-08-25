## 2.0.0

- Upgrade babel version to remove flow pragma from compiled files (fixes flow warnings in modules that depend on this)
- Bail out on the first `node_modules/.bin` directory found, instead of continuing till end to match Node.js/npm behavior

## 1.0.1

- Flow ignore specs dir to suppress warning in flow projects

## 1.0.0

- Initial version
