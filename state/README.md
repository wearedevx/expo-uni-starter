# State and Stores

Global application state is handled by [`zustand`](https://github.com/react-spring/zustand).
It is persisted using ReactNative's [`AsyncStorage`](https://reactnative.dev/docs/asyncstorage), which means
user data is loaded asynchronously as the application starts.

## Declaring store

Each store must be declared in `src/stores/`.  
It must export the `useStore` and `api`.  
See `src/stores/user.js` for an example.

## Persistence

To persist a store, it must use the `persist` middleware.

To load the persisted data on application load, import the `api` of your store in `state/stores/index.js`, and add it to the exported object.

**Important**  
Keys of that object are used to retrieve the data.
Therefore, if you used the `persist` middleware as `persist("user", config)`,
`state/stores/index.js` should export an object like:

```js
{
  //...
  "user": userApi
  //...
}
```

## Using stores

Example:

```js
import { Text } from "react-native";
import { useUser } from "src/stores/user";

export function Component() {
  const firstname = useUser(({ firstname }) => firstname);

  return <Text>firstname</Text>;
}
```
