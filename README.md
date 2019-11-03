# Lovelace custom-header

_Not much to see here yet._

## Development

1. Fork and clone the repository.
2. Open the [devcontainer][devcontainer] and run `npm start` when it's ready or run `npm start`.
3. The compiled `.js` file will be accessible on `http://127.0.0.1:5000/custom-header.js`.
    - It will also be located in the `dist` directory,
4. On a running Home Assistant installation add this to your Lovelace `resources:`

```yaml
  - url: 'http://127.0.0.1:5000/custom-header.js'
    type: module
```

_Change "127.0.0.1" to the IP of your development machine._

<!--Links -->
[devcontainer]: https://code.visualstudio.com/docs/remote/containers