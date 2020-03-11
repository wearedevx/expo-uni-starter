import produce from "immer";
import { AsyncStorage } from "react-native";

// Turn the set method into an immer proxy
export const immer = config => (set, get, api) =>
  config(fn => set(produce(fn)), get, api);

// persistance middleware
export const persist = (key, config) => (set, get, api) =>
  config(
    args => {
      console.log(" applying", args);
      set(args);
      const updated = get();
      console.log(" new state", updated);

      AsyncStorage.setItem(key, JSON.stringify(updated));
    },
    get,
    api
  );
