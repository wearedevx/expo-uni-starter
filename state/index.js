import create from "zustand";

import { AsyncStorage } from "react-native";

import { immer } from "./middlewares";
import storeApis from "src/stores";

// load state from local/async storage
async function loadState(key) {
  const storedRaw = await AsyncStorage.getItem(key);

  let loadedState = {};
  if (storedRaw) {
    try {
      loadedState = JSON.parse(storedRaw);
    } catch (e) {
      e.message = `Failed to parse persited state ${key}`;
      console.error(e);
    }
  }

  return loadedState;
}

// app loading state
// represents whether data from loca/async storage have been loaded or not
const [_appLoadingState, dataStateStoreApi] = create(
  immer(set => ({
    loading: false,
    loaded: false,
    setLoading: input => set(state => (state.loading = input)),
    setLoaded: input => set(state => (state.loaded = input))
  }))
);

// Start loading store from local/async storage
// To be used in a useEFfect() hook
export async function initialize() {
  dataStateStoreApi.setState({
    loading: true,
    loaded: false
  });

  const promises = Object.keys(storeApis).map(async key => {
    let loadedData = await loadState(key);

    storeApis[key].setState(loadedData);
  });

  await Promise.all(promises);

  dataStateStoreApi.setState({
    loading: false,
    loaded: true
  });
}

export async function reset() {
  dataStateStoreApi.setState({
    loading: true
  });

  await AsyncStorage.multiRemove(Object.keys(storeApis));

  dataStateStoreApi.setState({
    loading: false
  });
}

export const useAppLoadingState = _appLoadingState;
