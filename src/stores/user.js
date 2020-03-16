import create from "zustand";
import { immer, persist } from "state/middlewares";

import { reset } from "state/index";

// user store
// TODO: move each store in its own module
const userStore = create(
  persist(
    "user",
    immer(set => ({
      token: null,
      setToken: token =>
        set(state => {
          state.token = token;
        }),
      resetApp: () => {
        set(state => {
          state.token = null;
        });
        reset();
      }
    }))
  )
);

export const useUser = userStore[0];
export const userApi = userStore[1];
